"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

// Array of possible detailed feedback paragraphs
const feedbackParagraphs = [
  "Your portfolio demonstrates strong visual design elements and a good understanding of user experience principles. The layout is intuitive and the color scheme is cohesive throughout. However, there are opportunities to improve the narrative flow and content organization. Consider restructuring some sections to create a more compelling story about your work process and outcomes.",

  "The technical implementation of your portfolio is solid, but adding more details about the challenges you faced and how you overcame them would strengthen your case studies. This would showcase your problem-solving abilities and provide context for your design decisions.",

  "Your typography choices are generally good, but there are some inconsistencies in font sizes and weights that could be standardized for a more polished look. Pay attention to line spacing and paragraph length to improve readability, especially in text-heavy sections.",

  "The visual hierarchy in some sections could be improved to guide the viewer's attention more effectively. Consider using size, color, and positioning to emphasize the most important elements and create a clear path for the viewer to follow.",

  "Your portfolio effectively showcases your technical skills, but could benefit from more emphasis on the outcomes and impact of your work. Include metrics or testimonials where possible to demonstrate the value you delivered.",

  "The navigation and overall user experience of your portfolio is intuitive, but consider adding more interactive elements to engage viewers and demonstrate your technical capabilities. This could include subtle animations, hover states, or other interactive features.",
]

export default function DetailedFeedbackPage() {
  const [feedback, setFeedback] = useState("")

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0)

    // Generate random detailed feedback
    const generateRandomFeedback = () => {
      // Shuffle the paragraphs
      const shuffled = [...feedbackParagraphs].sort(() => 0.5 - Math.random())

      // Select 3-4 paragraphs
      const numParagraphs = Math.floor(Math.random() * 2) + 3
      const selectedParagraphs = shuffled.slice(0, numParagraphs)

      // Join with line breaks
      return selectedParagraphs.join("\n\n")
    }

    setFeedback(generateRandomFeedback())
  }, [])

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#e8e8e8]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="mb-4">
            <Link href="/app/results" className="text-blue-600 hover:underline text-sm">
              ← Back to Results
            </Link>
          </div>

          <div className="bg-[#ffffff] rounded-xl shadow-lg p-6">
            <h1 className="text-2xl font-bold mb-4 text-[#191919]">Detailed Feedback</h1>

            <div className="prose max-w-none">
              <p className="whitespace-pre-line text-sm text-[#191919]">{feedback}</p>
            </div>

            <div className="mt-6">
              <Link href="/app/upload">
                <button className="bg-[#191919] text-[#ffffff] px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-in-out hover:bg-gray-800">
                  Submit Another Portfolio
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

