"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FeedbackList } from "@/components/feedback-list"
import { FeedbackContent } from "@/components/feedback-content"
import { findRelevantReferences, type BookReference } from "../utils/reference-matcher"
import { generatePatternUrl } from "../utils/image-generator"
import { Reference } from "@/components/feedback-entry"

export interface FeedbackItem {
  id: string
  title: string
  date: string
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

export default function DashboardPage() {
  const router = useRouter()
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>(() => {
    const initialFeedback: FeedbackItem = {
      id: Date.now().toString(),
      title: "New Feedback",
      date: new Date().toISOString(),
      status: 'upload',
      references: {
        videos: [],
        podcasts: [],
        articles: [],
        books: []
      }
    }
    return [initialFeedback]
  })
  const [currentFeedback, setCurrentFeedback] = useState<FeedbackItem | null>(null)
  const userEmail = "john@example.com"

  const createNewFeedback = () => {
    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      title: "New Feedback",
      date: new Date().toISOString(),
      status: 'upload',
      references: {
        videos: [],
        podcasts: [],
        articles: [],
        books: []
      }
    }
    
    setFeedbacks(prev => [newFeedback, ...prev])
    setCurrentFeedback(newFeedback)
  }

  // Initialize current feedback with the first item
  useEffect(() => {
    setCurrentFeedback(feedbacks[0])
  }, []) // Empty dependency array - runs only once on mount

  const handleFileUpload = async (data: { threadId: string; runId: string }) => {
    if (!currentFeedback) return
    
    const updatedFeedback: FeedbackItem = {
      ...currentFeedback,
      status: 'processing',
      threadId: data.threadId,
      runId: data.runId
    }

    setFeedbacks(prev => {
      const newFeedbacks = prev.map(f => 
        f.id === currentFeedback.id ? updatedFeedback : f
      )
      return newFeedbacks
    })
    setCurrentFeedback(updatedFeedback)
  }

  const handleAnalysisComplete = (output: string) => {
    if (!currentFeedback) return

    try {
      const feedbackData = JSON.parse(output.trim());
      
      const relevantRefs = findRelevantReferences(feedbackData.areas, feedbackData.summary);
      
      const updatedFeedback: FeedbackItem = {
        ...currentFeedback,
        status: 'ready',
        title:  feedbackData.title || "Your Portfolio Analysis",
        summary: feedbackData.summary,
        areas: feedbackData.areas,
        references: {
          ...feedbackData.references,
          books: relevantRefs.books,
          articles: relevantRefs.articles,
          podcasts: relevantRefs.podcasts,
          videos: relevantRefs.videos
        },
        imageUrl: generatePatternUrl(Date.now())
      }

      setFeedbacks(prev => {
        const newFeedbacks = prev.map(feedback => 
          feedback.id === currentFeedback.id ? updatedFeedback : feedback
        )
        return newFeedbacks
      })

      setCurrentFeedback(updatedFeedback)
    } catch (error) {
      console.error('Error parsing feedback:', error);
      console.error('Invalid JSON:', output);
      
      const updatedFeedback: FeedbackItem = {
        ...currentFeedback,
        status: 'upload',
        title: "New Feedback"
      }

      setFeedbacks(prev => {
        const newFeedbacks = prev.map(feedback => 
          feedback.id === currentFeedback.id ? updatedFeedback : feedback
        )
        return newFeedbacks
      })

      setCurrentFeedback(updatedFeedback)
    }
  }

  const handleReveal = () => {
    if (!currentFeedback) return

    const updatedFeedback: FeedbackItem = {
      ...currentFeedback,
      status: 'viewed'
    }

    setFeedbacks(prev => {
      const newFeedbacks = prev.map(feedback => 
        feedback.id === currentFeedback.id ? updatedFeedback : feedback
      )
      return newFeedbacks
    })
    setCurrentFeedback(updatedFeedback)
  }

  const handleFeedbackSelect = (feedback: FeedbackItem) => {
    setCurrentFeedback(feedback)
  }

  const handleDeleteFeedback = (feedbackId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    setFeedbacks(prev => {
      const newFeedbacks = prev.filter(f => f.id !== feedbackId)
      return newFeedbacks
    })
    
    if (currentFeedback?.id === feedbackId) {
      const updatedFeedbacks = feedbacks.filter(f => f.id !== feedbackId)
      if (updatedFeedbacks.length > 0) {
        setCurrentFeedback(updatedFeedbacks[0])
      } else {
        createNewFeedback()
      }
    }
  }

  return (
    <DashboardLayout
      sidebarContent={
        <FeedbackList
          items={feedbacks}
          selectedId={currentFeedback?.id}
          onSelect={handleFeedbackSelect}
          onDelete={handleDeleteFeedback}
        />
      }
      userEmail={userEmail}
      onNewFeedback={createNewFeedback}
      onLogout={() => router.push("/")}
    >
      {currentFeedback && (
        <FeedbackContent
          feedback={currentFeedback}
          onUpload={handleFileUpload}
          onComplete={handleAnalysisComplete}
          onReveal={handleReveal}
        />
      )}
    </DashboardLayout>
  )
}

