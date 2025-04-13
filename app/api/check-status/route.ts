import { NextResponse } from "next/server"
import OpenAI from "openai"
import type { ThreadMessage } from "openai/resources/beta/threads/messages"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const threadId = searchParams.get("threadId")
    const runId = searchParams.get("runId")

    if (!threadId || !runId) {
      return NextResponse.json(
        { error: "Missing threadId or runId" },
        { status: 400 }
      )
    }

    console.log("Checking status for:", { threadId, runId })
    const run = await openai.beta.threads.runs.retrieve(threadId, runId)
    console.log("OpenAI run status:", run.status)

    let output = ""
    if (run.status === "completed") {
      const messages = await openai.beta.threads.messages.list(threadId)
      // Get the last assistant message
      const lastMessage = messages.data
        .filter((msg: ThreadMessage) => msg.role === "assistant")
        .sort((a: ThreadMessage, b: ThreadMessage) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0]
      
      if (lastMessage?.content[0]?.type === "text") {
        output = lastMessage.content[0].text.value
      }
    }

    return NextResponse.json({
      status: run.status,
      output
    })
  } catch (error) {
    console.error("Error checking status:", error)
    return NextResponse.json(
      { error: "Failed to check status" },
      { status: 500 }
    )
  }
} 