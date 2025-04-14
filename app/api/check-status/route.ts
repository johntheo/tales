import { NextResponse } from "next/server"
import OpenAI from "openai"
import { ProcessingCache } from "@/lib/cache"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const MAX_RETRIES = 3
const RETRY_DELAY = 1000 // 1 second

async function retryOperation<T>(operation: () => Promise<T>, retries = MAX_RETRIES): Promise<T> {
  try {
    return await operation()
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying operation, ${retries} attempts remaining...`)
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return retryOperation(operation, retries - 1)
    }
    throw error
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const threadId = searchParams.get("threadId")
    const runId = searchParams.get("runId")
    const identifier = searchParams.get("identifier")

    if (!threadId || !runId) {
      return NextResponse.json(
        { error: "Missing threadId or runId" },
        { status: 400 }
      )
    }

    console.log("Checking status for:", { threadId, runId, identifier })
    
    // If we have an identifier, check the cache first
    if (identifier) {
      console.log('Checking cache for identifier:', identifier)
      const cached = ProcessingCache.get(identifier)
      console.log('Cache check result:', cached)
      
      if (cached?.output) {
        console.log("Using cached output for:", identifier)
        return NextResponse.json({
          status: "completed",
          output: cached.output
        })
      }
    }
    
    const run = await retryOperation(() => 
      openai.beta.threads.runs.retrieve(threadId, runId)
    )
    
    console.log("OpenAI run status:", run.status)

    let output = ""
    if (run.status === "completed") {
      const messages = await retryOperation(() => 
        openai.beta.threads.messages.list(threadId)
      )
      
      // Get the last assistant message
      const lastMessage = messages.data
        .filter((msg) => msg.role === "assistant")
        .sort((a, b) => 
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )[0]
      
      if (lastMessage?.content[0]?.type === "text") {
        output = lastMessage.content[0].text.value.trim()
        
        // Validate if the output is valid JSON
        try {
          JSON.parse(output)
        } catch (error) {
          console.error("Invalid JSON in assistant response:", error)
          return NextResponse.json(
            { error: "Invalid response format from assistant" },
            { status: 500 }
          )
        }

        // If we have an identifier and the run is completed, update the cache
        if (identifier) {
          console.log('Storing completed result in cache for:', identifier)
          ProcessingCache.set(identifier, {
            threadId,
            runId,
            output
          })
        }
      }
    }

    return NextResponse.json({
      status: run.status,
      output
    })
  } catch (error) {
    console.error("Error checking status:", error)
    return NextResponse.json(
      { error: "Failed to check status", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    )
  }
} 