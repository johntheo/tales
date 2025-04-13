import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

async function retryOperation<T>(operation: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying operation, ${retries} attempts remaining...`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return retryOperation(operation, retries - 1);
    }
    throw error;
  }
}

export async function POST(req: NextRequest) {
  console.log('Received request:', req);
  const contentType = req.headers.get('content-type') || '';

  try {
    if (contentType.includes('multipart/form-data')) {
      console.log('Handling PDF upload'); 
      return handlePdfUpload(req);
    } else if (contentType.includes('application/json')) {
      console.log('Handling link submission');
      return handleLinkSubmission(req);
    } else {
      console.log('Unsupported Content-Type');
      return NextResponse.json({ error: 'Unsupported Content-Type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'An unexpected error occurred',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const threadId = searchParams.get('thread_id');
  const runId = searchParams.get('run_id');

  if (!threadId || !runId) {
    return NextResponse.json({ error: 'Missing thread_id or run_id' }, { status: 400 });
  }

  const runRes = await fetch(
    `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
        'OpenAI-Beta': 'assistants=v2'
      },
    }
  );

  const runData = await runRes.json();

  if (runData.status !== 'completed') {
    return NextResponse.json({ status: runData.status });
  }

  // Buscar mensagens da thread
  const messagesRes = await fetch(
    `https://api.openai.com/v1/threads/${threadId}/messages`,
    {
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
        'OpenAI-Beta': 'assistants=v2'
      },
    }
  );

  const messagesData = await messagesRes.json();
  const message = messagesData.data?.[0]?.content?.[0];

  if (!message || message.type !== 'text') {
    return NextResponse.json({ error: 'No valid message found' }, { status: 500 });
  }

  return NextResponse.json({
    status: 'completed',
    output: message.text.value,
  });
}

// 🟡 1. Análise de PDF enviado via form
async function handlePdfUpload(req: NextRequest) {  
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    return NextResponse.json({ error: 'File size exceeds 10MB limit.' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    // Upload file to OpenAI
    console.log('Uploading file to OpenAI');
    const uploadedFile = await retryOperation(async () => {
      // Create a File object that implements the required interface
      const fileObject = new File([buffer], file.name, {
        type: file.type,
        lastModified: file.lastModified
      });
      
      return await openai.files.create({
        file: fileObject,
        purpose: 'assistants'
      });
    });

    if (!uploadedFile?.id) {
      throw new Error('Failed to upload file to OpenAI.');
    }

    // Create thread and run assistant
    console.log('Creating thread and running assistant');
    return createThreadAndRun({
      content: 'The portfolio is in the uploaded PDF file. Please analyze it in detail.',
      file_ids: [uploadedFile.id],
    });
  } catch (error) {
    console.error('Error in PDF upload:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to process PDF file',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

// 🟢 2. Análise de link (via JSON)
async function handleLinkSubmission(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: 'Missing URL.' }, { status: 400 });
  }

  try {
    // Create thread and send message with the link
    return createThreadAndRun({
      content: `Please analyze the portfolio available at the following link:\n\n${url}`,
    });
  } catch (error) {
    console.error('Error in link submission:', error);
    return NextResponse.json({ 
      error: error instanceof Error ? error.message : 'Failed to process URL',
      details: error instanceof Error ? error.stack : undefined
    }, { status: 500 });
  }
}

// 🧠 Função comum que cria thread, mensagem e executa o run
async function createThreadAndRun({
  content,
  file_ids,
}: {
  content: string;
  file_ids?: string[];
}) {
  try {
    // Create thread
    console.log('Creating thread');
    const thread = await retryOperation(() => 
      openai.beta.threads.create()
    );

    // Create message
    console.log('Creating message');
    const message = await retryOperation(() => 
      openai.beta.threads.messages.create(thread.id, {
        role: 'user',
        content,
        attachments: file_ids ? file_ids.map(id => ({ 
          file_id: id,
          tools: [{ type: "file_search" }]
        })) : undefined
      })
    );

    // Execute assistant
    console.log('Executing assistant');
    const run = await retryOperation(() => 
      openai.beta.threads.runs.create(thread.id, {
        assistant_id: process.env.OPENAI_ASSISTANT_ID!,
      })
    );

    console.log('Run response:', run);

    return NextResponse.json({
      thread_id: thread.id,
      run_id: run.id,
      message_id: message.id,
      ...(file_ids ? { file_ids } : {}),
    });
  } catch (error) {
    console.error('Error in thread creation:', error);
    throw error;
  }
}