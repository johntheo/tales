import Image from "next/image"
import { Button } from "@/components/ui/button"
import { FeedbackCategory } from "@/components/feedback-category"

interface Metric {
  title: string
  score: number
  feedback: string
}

interface FeedbackEntryProps {
  title: string
  description: string
  metrics: Metric[]
  isLoaded: boolean
  delay: number
}

export function FeedbackEntry({ title, description, metrics, isLoaded, delay }: FeedbackEntryProps) {
  return (
    <div
      className={`transition-opacity duration-500 transform ${
        isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex gap-6">
          {/* Preview Image */}
          <div className="w-32 h-32 bg-gray-200 rounded-lg overflow-hidden relative flex-shrink-0">
            <Image
              src="/placeholder.svg"
              alt={title}
              fill
              className="object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-sm text-gray-600 mt-1">{description}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Download your file
                </Button>
                <Button variant="default" size="sm" className="bg-black text-white hover:bg-gray-800">
                  Talk to a professional
                </Button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {metrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6">
                      {metric.title === "Visual Consistency" && (
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor">
                          <path d="M2 12h4m16 0h-4M12 2v4m0 16v-4" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                      {metric.title === "Content Clarity" && (
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor">
                          <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                      {metric.title === "Storytelling" && (
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor">
                          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                      {metric.title === "Data Visualization" && (
                        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor">
                          <path d="M16 8v8m-8-6v6M4 4v16h16" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                    </div>
                    <h4 className="font-medium">{metric.title}</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-black"
                        style={{ width: `${(metric.score / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{metric.score}/5</span>
                  </div>
                  <p className="text-sm text-gray-600">{metric.feedback}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

