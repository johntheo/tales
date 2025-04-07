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
    metrics: [
      {
        id: "1",
        title: "Visual Consistency",
        icon: "🎨",
        feedback: "Great use of color palette, but some slides have inconsistent typography. Try using a single font family to maintain coherence."
      },
      {
        id: "2",
        title: "Content Clarity",
        icon: "📝",
        feedback: "Your key points are strong, but consider reducing text in some slides for better readability. Using bullet points could help streamline information."
      },
      {
        id: "3",
        title: "Storytelling",
        icon: "📚",
        feedback: "The narrative is compelling, but the flow between sections could be smoother. A clear transition slide between topics would help guide the audience better."
      },
      {
        id: "4",
        title: "Data Visualization",
        icon: "📊",
        feedback: "Your charts and graphs are informative, but the labels could be clearer. Try increasing contrast and using more intuitive visuals."
      }
    ],
    references: [
      {
        id: "1",
        title: "How to Create a Visual Story",
        description: "Learn the fundamentals of visual storytelling in presentations.",
        imageUrl: "/placeholder.svg?height=100&width=100",
        contentUrl: "#",
        type: "Videos"
      },
      {
        id: "2",
        title: "Data Visualization Best Practices",
        description: "Master the art of presenting data in a compelling way.",
        imageUrl: "/placeholder.svg?height=100&width=100",
        contentUrl: "#",
        type: "Articles"
      }
    ]
  },
  {
    id: 2,
    title: "Combo's Employee Handbook",
    description:
      "With this handbook, you'll discover what to expect on your first day, throughout the first month, and over the course of your first year at Combo.",
    image: "/placeholder.svg?height=200&width=300",
    timeAgo: "A week ago",
    metrics: [
      {
        id: "1",
        title: "Engagement",
        icon: "🎯",
        feedback: "The handbook is informative, but adding interactive elements like quizzes or reflection questions could make it more engaging for new employees."
      },
      {
        id: "2",
        title: "Tone & Language",
        icon: "💬",
        feedback: "The tone is friendly and approachable, but some sections feel overly formal. Try aligning the language with the company's culture for a more cohesive voice."
      },
      {
        id: "3",
        title: "Structure & Flow",
        icon: "🔄",
        feedback: "The content is well-organized, but the onboarding steps could be more visually distinct. Consider using numbered steps or icons to make the process easier to follow."
      },
      {
        id: "4",
        title: "Accessibility",
        icon: "👥",
        feedback: "The font size and contrast are generally good, but some smaller text could be hard to read. A slight increase in font size would improve accessibility for all users."
      }
    ],
    references: [
      {
        id: "1",
        title: "Creating an Engaging Onboarding Experience",
        description: "Tips for making your onboarding process more engaging and effective.",
        imageUrl: "/placeholder.svg?height=100&width=100",
        contentUrl: "#",
        type: "Articles"
      },
      {
        id: "2",
        title: "The Art of Corporate Communication",
        description: "Master the art of effective corporate communication.",
        imageUrl: "/placeholder.svg?height=100&width=100",
        contentUrl: "#",
        type: "Books"
      }
    ]
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
                <FeedbackEntry 
                  key={feedback.id} 
                  fileName={feedback.title}
                  description={feedback.description}
                  metrics={feedback.metrics}
                  references={feedback.references}
                  isLoaded={isLoaded} 
                  delay={0.2 + index * 0.1}
                  feedbackImage={feedback.image}
                />
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

