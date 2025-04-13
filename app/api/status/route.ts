import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const threadId = searchParams.get('thread_id')
  const runId = searchParams.get('run_id')

  console.log('Status request received:', { threadId, runId })

  if (!threadId || !runId) {
    console.log('Missing required parameters')
    return NextResponse.json(
      { error: 'Missing thread_id or run_id' },
      { status: 400 }
    )
  }

  try {
    // Verificar o status do run
    console.log('Fetching run status from OpenAI')
    const runResponse = await fetch(
      `https://api.openai.com/v1/threads/${threadId}/runs/${runId}`,
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY!}`,
          'OpenAI-Beta': 'assistants=v2',
          'Content-Type': 'application/json',
        },
      }
    )

    if (!runResponse.ok) {
      console.error('Failed to fetch run status:', await runResponse.text())
      return NextResponse.json({ 
        status: 'failed',
        error: 'Failed to fetch run status from OpenAI API'
      }, { status: 500 })
    }

    const runData = await runResponse.json()
    console.log('Run status:', runData.status)

    // Handle specific error cases
    if (runData.status === 'failed') {
      const errorMessage = runData.last_error?.message || 'An error occurred during feedback generation'
      return NextResponse.json({
        status: 'failed',
        error: errorMessage
      })
    }

    if (runData.status === 'cancelled') {
      return NextResponse.json({
        status: 'cancelled',
        error: 'The feedback generation was cancelled'
      })
    }

    if (runData.status === 'expired') {
      return NextResponse.json({
        status: 'expired',
        error: 'The feedback generation request has expired'
      })
    }

    // Se o run estiver completo, buscar a mensagem
    if (runData.status === 'completed') {
      console.log('Run completed, fetching messages')
      const messagesResponse = await fetch(
        `https://api.openai.com/v1/threads/${threadId}/messages`,
        {
          headers: {
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY!}`,
            'OpenAI-Beta': 'assistants=v2',
            'Content-Type': 'application/json',
          },
        }
      )

      if (!messagesResponse.ok) {
        console.error('Failed to fetch messages:', await messagesResponse.text())
        return NextResponse.json({ 
          status: 'failed',
          error: 'Failed to fetch feedback message'
        }, { status: 500 })
      }

      const messagesData = await messagesResponse.json()
      const latestMessage = messagesData.data[0]

      if (!latestMessage?.content?.[0]?.text?.value) {
        return NextResponse.json({
          status: 'failed',
          error: 'Invalid feedback message format'
        }, { status: 500 })
      }

      console.log('Successfully fetched completed run data')
      return NextResponse.json({
        status: 'completed',
        output: latestMessage.content[0].text.value
      })
    }

    // Return current status for in-progress states
    return NextResponse.json({
      status: runData.status
    })

  } catch (error) {
    console.error('Error in status endpoint:', error)
    return NextResponse.json({ 
      status: 'failed',
      error: 'An unexpected error occurred while checking feedback status'
    }, { status: 500 })
  }
} 