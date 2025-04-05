"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import PeelCard from "@/components/peel-component"

interface FeedbackProcessingProps {
  isOpen: boolean
  onComplete: () => void
}

export function FeedbackProcessing({ isOpen, onComplete }: FeedbackProcessingProps) {
  const [stage, setStage] = useState<"loading" | "ready">("loading")
  const router = useRouter()

  useEffect(() => {
    // Reset stage when modal closes
    if (!isOpen) {
      setStage("loading")
      return
    }

    // Simulate processing time when modal opens
    const timer = setTimeout(() => {
      setStage("ready")
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [isOpen])

  const handleReveal = () => {
    onComplete()
    router.push("/dashboard")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 select-none">
      <div className="w-full max-w-lg">
        {stage === "loading" && (
          <div className="bg-white rounded-3xl p-12 text-center select-none">
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
                <Loader2 className="w-24 h-24 animate-spin text-black" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Analyzing your presentation</h2>
                <p className="text-gray-500">
                  Our AI is carefully reviewing your work to provide detailed feedback
                </p>
              </div>
            </div>
          </div>
        )}

        {stage === "ready" && (
          <PeelCard
            onReveal={handleReveal}
            gradient="linear-gradient(135deg, #6B63B5 0%, #5D56A6 100%)"
            name="Your Feedback"
            role="is ready"
            width={640}
            height={360}
          />
        )}
      </div>
    </div>
  )
} 