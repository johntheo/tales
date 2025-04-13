"use client"

import { useState, useEffect } from "react"
import { UploadForm } from "@/components/upload-form"
import { FeedbackEntry } from "@/components/feedback-entry"
import { FeedbackProcessing } from "@/components/feedback-processing"
import PeelCard from "@/components/peel-component"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

interface FeedbackData {
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
  references?: {
    videos: Array<{
      title: string
      summary: string
      image: string
      link: string
    }>
    podcasts: Array<{
      title: string
      summary: string
      image: string
      link: string
    }>
    articles: Array<{
      title: string
      summary: string
      image: string
      link: string
    }>
    decks: Array<{
      title: string
      summary: string
      image: string
      link: string
    }>
    books: Array<{
      title: string
      summary: string
      image: string
      link: string
    }>
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

  if (feedback.status === 'upload') {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardContent className="p-6">
            <UploadForm 
              onSubmit={onUpload}
              initialData={feedback.formData}
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (feedback.status === 'processing' && feedback.threadId && feedback.runId) {
    return (
      <div className="h-full flex items-center justify-center">
        <Card className="w-full max-w-2xl mx-4">
          <CardContent className="p-6">
            <FeedbackProcessing
              threadId={feedback.threadId}
              runId={feedback.runId}
              onComplete={onComplete}
            />
          </CardContent>
        </Card>
      </div>
    )
  }

  if (feedback.status === 'ready') {
    return (
      <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
        <PeelCard
          onReveal={onReveal}
          gradient="linear-gradient(135deg, #6B63B5 0%, #5D56A6 100%)"
          name="Your Feedback"
          role="is ready"
          width={isMobile ? 320 : 640}
          height={isMobile ? 180 : 360}
        />
      </div>
    )
  }

  return (
    <div className="p-4 md:p-6">
      <FeedbackEntry
        fileName={feedback.title}
        description="Here's what our AI found in your content"
        metrics={feedback.areas || {
          clarity: { score: 0, feedback: '' },
          technical_skills: { score: 0, feedback: '' },
          innovation: { score: 0, feedback: '' },
          user_focus: { score: 0, feedback: '' },
          storytelling: { score: 0, feedback: '' }
        }}
        references={feedback.references || {
          videos: [],
          podcasts: [],
          articles: [],
          decks: [],
          books: []
        }}
        feedbackImage={feedback.imageUrl}
        isLoaded={true}
      />
    </div>
  )
} 