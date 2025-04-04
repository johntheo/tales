"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { FeedbackEntry } from "@/components/feedback-entry"

// Sample feedback data
const pastFeedbacks = [
  {
    id: 1,
    title: "The Commercial Filmmaking Trend Report '25",
    description:
      "Filmmaking Trend Report '25 offers insights into current trends and highlights crucial information for filmmakers.",
    image: "/placeholder.svg?height=200&width=300",
    timeAgo: "30 minutes ago",
    categories: [
      {
        title: "Visual Consistency",
        description:
          "Great use of color palette, but some slides have inconsistent typography. Try using a single font family to maintain coherence.",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        title: "Content Clarity",
        description:
          "Your key points are strong, but consider reducing text in some slides for better readability. Using bullet points could help streamline information.",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        title: "Storytelling",
        description:
          "The narrative is compelling, but the flow between sections could be smoother. A clear transition slide between topics would help guide the audience better.",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        title: "Data Visualization",
        description:
          "Your charts and graphs are informative, but the labels could be clearer. Try increasing contrast and using more intuitive visuals.",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
  {
    id: 2,
    title: "Combo's Employee Handbook",
    description:
      "With this handbook, you'll discover what to expect on your first day, throughout the first month, and over the course of your first year at Combo.",
    image: "/placeholder.svg?height=200&width=300",
    timeAgo: "A week ago",
    categories: [
      {
        title: "Engagement",
        description:
          "The handbook is informative, but adding interactive elements like quizzes or reflection questions could make it more engaging for new employees.",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        title: "Tone & Language",
        description:
          "The tone is friendly and approachable, but some sections feel overly formal. Try aligning the language with the company's culture for a more cohesive voice.",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        title: "Structure & Flow",
        description:
          "The content is well-organized, but the onboarding steps could be more visually distinct. Consider using numbered steps or icons to make the process easier to follow.",
        image: "/placeholder.svg?height=100&width=100",
      },
      {
        title: "Accessibility",
        description:
          "The font size and contrast are generally good, but some smaller text could be hard to read. A slight increase in font size would improve accessibility for all users.",
        image: "/placeholder.svg?height=100&width=100",
      },
    ],
  },
]

export default function PastFeedbacksPage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Trigger animations after component mounts
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)
  }, [])

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header feedbackPage={true} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-73px)]">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div
              className={`mb-8 transition-opacity duration-500 transform ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0.1s" }}
            >
              <h1 className="text-2xl font-bold mb-1">Your past feedbacks are here!</h1>
              <p className="text-[#71717a]">
                We've reviewed your submission. Here's an overview of your presentation's performance and key areas for
                improvement.
              </p>
            </div>

            {/* Feedback Entries */}
            <div className="space-y-12">
              {pastFeedbacks.map((feedback, index) => (
                <FeedbackEntry key={feedback.id} feedback={feedback} isLoaded={isLoaded} delay={0.2 + index * 0.1} />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

