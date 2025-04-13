import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const contentType = req.headers.get('content-type') || '';

  if (contentType.includes('multipart/form-data')) {
    return handlePdfUpload(req);
  } else if (contentType.includes('application/json')) {
    return handleLinkSubmission(req);
  } else {
    return NextResponse.json({ error: 'Unsupported Content-Type' }, { status: 400 });
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

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Faz upload para OpenAI
  const uploadRes = await fetch('https://api.openai.com/v1/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
    },
    body: (() => {
      const f = new FormData();
      f.append('file', new Blob([buffer]), file.name);
      f.append('purpose', 'assistants');
      return f;
    })(),
  });

  const uploadedFile = await uploadRes.json();
  if (!uploadedFile?.id) {
    return NextResponse.json({ error: 'Failed to upload file to OpenAI.' }, { status: 500 });
  }

  // Cria thread e envia para o Assistant
  return createThreadAndRun({
    content: 'The portfolio is in the uploaded PDF file. Please analyze it in detail.',
    file_ids: [uploadedFile.id],
  });
}

// 🟢 2. Análise de link (via JSON)
async function handleLinkSubmission(req: NextRequest) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: 'Missing URL.' }, { status: 400 });
  }

  // Cria thread e envia mensagem com o link
  return createThreadAndRun({
    content: `Please analyze the portfolio available at the following link:\n\n${url}`,
  });
}

// 🧠 Função comum que cria thread, mensagem e executa o run
async function createThreadAndRun({
  content,
  file_ids,
}: {
  content: string;
  file_ids?: string[];
}) {
  // Cria a thread
  const threadRes = await fetch('https://api.openai.com/v1/threads', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({}),
  });

  const thread = await threadRes.json();

  // Cria a mensagem
  const messageRes = await fetch(
    `https://api.openai.com/v1/threads/${thread.id}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        role: 'user',
        content,
        file_ids,
      }),
    }
  );

  const message = await messageRes.json();

  // Executa o assistant
  const runRes = await fetch(
    `https://api.openai.com/v1/threads/${thread.id}/runs`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        assistant_id: process.env.OPENAI_ASSISTANT_ID!,
      }),
    }
  );

  const run = await runRes.json();

  return NextResponse.json({
    thread_id: thread.id,
    run_id: run.id,
    message_id: message.id,
    ...(file_ids ? { file_ids } : {}),
  });
}