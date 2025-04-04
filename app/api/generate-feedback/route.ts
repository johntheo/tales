import { NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(request: Request) {
  try {
    const { portfolioData } = await request.json()

    if (!portfolioData) {
      return NextResponse.json({ error: "Portfolio data is required" }, { status: 400 })
    }

    console.log("Generating feedback for:", portfolioData)

    // Generate feedback using ChatGPT via AI SDK
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `You are a professional design and portfolio reviewer. Give detailed, constructive feedback on the following portfolio: ${portfolioData}. 
      
      Focus on:
      1. Visual design and aesthetics
      2. User experience and navigation
      3. Content organization and storytelling
      4. Technical implementation
      5. Areas of improvement
      
      Provide specific suggestions for improvement and highlight strengths.`,
      temperature: 0.7,
      maxTokens: 1000,
    })

    console.log("Feedback generated successfully")

    return NextResponse.json({ feedback: text })
  } catch (error) {
    console.error("Error generating feedback:", error)
    return NextResponse.json({ error: error.message || "Failed to generate feedback" }, { status: 500 })
  }
}

