import { NextRequest, NextResponse } from 'next/server';
import OpenAI from "openai";
import * as cheerio from 'cheerio';
import { ProcessingCache } from '@/lib/cache';
import { createHash } from 'crypto';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second
const MAX_PAGES = 5;

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

// 🧠 Função comum que faz crawle de um link
async function crawlPortfolio(startUrl: string): Promise<string> {
  const visited = new Set<string>();
  const queue = [startUrl];
  const contents: string[] = [];

  const base = new URL(startUrl);
  const origin = base.origin;

  while (queue.length > 0 && contents.length < MAX_PAGES) {
    const currentUrl = queue.shift();
    if (!currentUrl || visited.has(currentUrl)) continue;

    visited.add(currentUrl);

    try {
      const res = await fetch(currentUrl);
      const html = await res.text();
      const $ = cheerio.load(html);

      const text = $('body').text().replace(/\s+/g, ' ').trim().slice(0, 6000);

      contents.push(`PAGE: ${currentUrl}\n${text}`);

      $('a[href]').each((_, el) => {
        const href = $(el).attr('href');
        if (!href) return;

        const fullUrl = href.startsWith('http')
          ? href
          : href.startsWith('/')
            ? `${origin}${href}`
            : null;

        if (fullUrl && fullUrl.startsWith(origin) && !visited.has(fullUrl)) {
          queue.push(fullUrl);
        }
      });
    } catch (err) {
      console.warn(`Erro ao acessar ${currentUrl}`, err);
    }
  }

  return contents.join('\n\n---\n\n');
}

interface ThreadAndRunResult {
  thread_id: string
  run_id: string
  message_id: string
  file_ids?: string[]
}

// 🟡 1. Análise de PDF enviado via form
async function handlePdfUpload(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file') as File;
  const forceNewProcessing = formData.get('forceNewProcessing') === 'true';

  if (!file) {
    return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
  }

  // Validate file type
  if (file.type !== 'application/pdf') {
    return NextResponse.json({ error: 'Invalid file type. Please upload a PDF file.' }, { status: 400 });
  }

  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    return NextResponse.json({ error: 'File size exceeds 10MB limit.' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  try {
    console.log('Processing PDF upload for file:', file.name);
    
    // Create a hash of the file content for cache key
    const fileHash = createHash('sha256').update(buffer).digest('hex');
    const fileIdentifier = `file:${fileHash}`;
    console.log('Generated file identifier:', fileIdentifier);

    // Check cache first, unless forceNewProcessing is true
    if (!forceNewProcessing) {
      const cached = ProcessingCache.get(fileIdentifier);
      console.log('Cache check result:', cached);
      
      if (cached) {
        console.log('Using cached result for file:', file.name);
        return NextResponse.json({
          thread_id: cached.threadId,
          run_id: cached.runId,
          cached: true
        });
      }
    }

    console.log('No cache found or forceNewProcessing is true, processing file:', file.name);
    
    // Upload file to OpenAI
    console.log('Uploading file to OpenAI');
    const uploadedFile = await retryOperation(async () => {
      const fileObject = new File([buffer], file.name, {
        type: 'application/pdf',
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
    const result = await createThreadAndRun({
      content: 'The portfolio is in the uploaded PDF file. Please analyze it in detail.',
      file_ids: [uploadedFile.id],
    });

    console.log('Storing result in cache for file:', file.name);
    // Store in cache
    ProcessingCache.set(fileIdentifier, {
      threadId: result.thread_id,
      runId: result.run_id
    });

    return NextResponse.json(result);
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
  const { url, forceNewProcessing } = await req.json();

  if (!url) {
    return NextResponse.json({ error: 'Missing URL.' }, { status: 400 });
  }

  try {
    console.log('Processing link submission for URL:', url);
    
    // Check cache first, unless forceNewProcessing is true
    if (!forceNewProcessing) {
      const cached = ProcessingCache.get(url);
      console.log('Cache check result:', cached);
      
      if (cached) {
        console.log('Using cached result for URL:', url);
        return NextResponse.json({
          thread_id: cached.threadId,
          run_id: cached.runId,
          cached: true
        });
      }
    }

    console.log('No cache found or forceNewProcessing is true, processing URL:', url);
    
    // If not in cache, process normally
    const text = await crawlPortfolio(url);
    
    const result = await createThreadAndRun({
      content: `Please analyze the portfolio content:\n\n${text}`,
    });

    console.log('Storing result in cache for URL:', url);
    // Store in cache
    ProcessingCache.set(url, {
      threadId: result.thread_id,
      runId: result.run_id
    });

    return NextResponse.json(result);
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
}): Promise<ThreadAndRunResult> {
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

    return {
      thread_id: thread.id,
      run_id: run.id,
      message_id: message.id,
      ...(file_ids ? { file_ids } : {})
    };
  } catch (error) {
    console.error('Error in thread creation:', error);
    throw error;
  }
}