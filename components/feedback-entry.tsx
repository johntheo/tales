import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FeedbackCategory } from "@/components/feedback-category"

interface FeedbackEntryProps {
  feedback: {
    id: number
    title: string
    description: string
    image: string
    timeAgo: string
    categories: {
      title: string
      description: string
      image: string
    }[]
  }
  isLoaded: boolean
  delay: number
}

export function FeedbackEntry({ feedback, isLoaded, delay }: FeedbackEntryProps) {
  return (
    <div
      className={`transition-opacity duration-500 transform ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      {/* File Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-1">Your file</h2>
        <p className="text-[#71717a] text-sm mb-4">{feedback.timeAgo}</p>

        <div className="flex bg-white rounded-lg overflow-hidden shadow-sm">
          {feedback.title.includes("Handbook") ? (
            <div className="w-full aspect-video relative bg-[#FFFFC2] flex items-center justify-center">
              <div className="text-center p-4">
                <div className="text-2xl font-serif mb-2">Handbook°</div>
                <div className="text-xs mt-4">Combo</div>
              </div>
            </div>
          ) : (
            <div className="w-full aspect-video relative">
              <Image src={feedback.image || "/placeholder.svg"} alt={feedback.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-end p-4">
                <div className="text-white">
                  <div className="text-4xl font-light leading-tight">
                    Trend<span className="text-sm align-top">2025</span>
                  </div>
                  <div className="text-xl font-light leading-tight">Report</div>
                </div>
              </div>
            </div>
          )}
          <div className="p-6 flex flex-col justify-between flex-1">
            <div>
              <h3 className="font-bold text-lg mb-2">{feedback.title}</h3>
              <p className="text-sm text-[#71717a] leading-relaxed">{feedback.description}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-fit rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            >
              Download your file
            </Button>
          </div>
        </div>
      </div>

      {/* Overall Section */}
      <div className="mb-10">
        <h2 className="text-xl font-bold mb-2">Overall</h2>
        <p className="text-[#71717a] mb-6">Good views to grow your expertise.</p>

        {/* Feedback Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {feedback.categories.map((category, index) => (
            <FeedbackCategory
              key={`${feedback.id}-${category.title}`}
              title={category.title}
              description={category.description}
              image={category.image}
              delay={delay + 0.1 + index * 0.05}
              className="reveal-item"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

