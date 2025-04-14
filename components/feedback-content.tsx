"use client"

import { useState, useEffect } from "react"
import { UploadForm } from "@/components/upload-form"
import { FeedbackEntry } from "@/components/feedback-entry"
import { LoadingScreen } from "@/components/loading-screen"
import PeelCard from "@/components/peel-component"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { usePollingStatus } from "@/hooks/usePollingStatus"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Reference } from "@/components/feedback-entry"
import { trackEvent } from "@/lib/posthog"

export interface FeedbackData {
  id: string
  title: string
  status: 'upload' | 'processing' | 'ready' | 'viewed'
  formData?: {
    link?: string
    file?: File
  }
  summary?: string
  areas?: {
    clarity: {
      score: number
      feedback: string
    }
    technical_skills: {
      score: number
      feedback: string
    }
    innovation: {
      score: number
      feedback: string
    }
    user_focus: {
      score: number
      feedback: string
    }
    storytelling: {
      score: number
      feedback: string
    }
  }
  references: {
    videos: Reference[]
    podcasts: Reference[]
    articles: Reference[]
    books: Reference[]
  }
  imageUrl?: string
  threadId?: string
  runId?: string
}

interface FeedbackContentProps {
  feedback: FeedbackData
  onUpload: (data: { threadId: string; runId: string }) => void
  onComplete: (output: string) => void
  onReveal: () => void
}

export function FeedbackContent({
  feedback,
  onUpload,
  onComplete,
  onReveal
}: FeedbackContentProps) {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const { status, output } = usePollingStatus(
    feedback.status === 'processing' && feedback.threadId ? feedback.threadId : '',
    feedback.status === 'processing' && feedback.runId ? feedback.runId : '',
    feedback.formData?.link || feedback.formData?.file?.name
  )

  useEffect(() => {
    if (!feedback.threadId || !feedback.runId) return;
    
    if (feedback.status === 'processing' && (status === "failed" || status === "cancelled" || status === "expired")) {
      trackEvent('error_occurred', {
        error_type: 'processing_error',
        error_message: `Processing failed with status: ${status}`,
        page: 'feedback_content'
      })
      onComplete("An error occurred while processing your feedback. Please try again.")
    } else if (feedback.status === 'processing' && status === "completed" && output) {
      trackEvent('feature_used', {
        feature_name: 'feedback_processing',
        action: 'completed_successfully'
      })
      onComplete(output)
    }
  }, [status, output, onComplete, feedback.status, feedback.threadId, feedback.runId])

  // Track when feedback is ready to be viewed
  useEffect(() => {
    if (feedback.status === 'ready') {
      trackEvent('feature_used', {
        feature_name: 'feedback_status',
        action: 'ready_to_view'
      })
    }
  }, [feedback.status])

  const getStatusMessage = (status: string) => {
    switch (status) {
      case "loading":
        return "Initializing analysis..."
      case "queued":
        return "Preparing to analyze your content..."
      case "in_progress":
        return "Analyzing your content and generating insights..."
      default:
        return `Status: ${status}`
    }
  }

  return (
    <div className="min-h-screen">
      {feedback.status === 'upload' && (
        <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-4">
          <div className="w-full max-w-2xl">
            <UploadForm 
              onSubmit={onUpload}
              initialData={feedback.formData}
            />
          </div>
        </div>
      )}

      {feedback.status === 'processing' && (
        <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-4">
          <div className="w-full max-w-2xl">
            {(status === "failed" || status === "cancelled" || status === "expired") ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  An error occurred while processing your feedback. Please try again.
                </AlertDescription>
              </Alert>
            ) : (
              <LoadingScreen 
                title={getStatusMessage(status)}
                description="Our AI is carefully reviewing your work to provide detailed feedback and suggestions for improvement. This usually takes about a minute."
              />
            )}
          </div>
        </div>
      )}

      {feedback.status === 'ready' && (
        <div className="min-h-[calc(100vh-4rem)] grid place-items-center px-4">
          <PeelCard
            onReveal={onReveal}
            gradient="linear-gradient(135deg, #6B63B5 0%, #5D56A6 100%)"
            name="Your Feedback"
            role="is ready"
            width={isMobile ? 280 : 640}
            height={isMobile ? 160 : 360}
          />
        </div>
      )}

      {feedback.status === 'viewed' && (
        <main className="min-h-[calc(100vh-4rem)]">
          <div className="container mx-auto py-8 md:py-12">
            <FeedbackEntry
              fileName={feedback.title}
              description={feedback.summary || "Here's what our AI found in your content"}
              metrics={feedback.areas || {
                clarity: { score: 0, feedback: '' },
                technical_skills: { score: 0, feedback: '' },
                innovation: { score: 0, feedback: '' },
                user_focus: { score: 0, feedback: '' },
                storytelling: { score: 0, feedback: '' }
              }}
              references={feedback.references}
              feedbackImage={feedback.imageUrl}
              isLoaded={true}
            />
          </div>
        </main>
      )}
    </div>
  )
} 