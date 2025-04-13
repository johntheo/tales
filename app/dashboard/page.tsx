"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { FeedbackList } from "@/components/feedback-list"
import { FeedbackContent } from "@/components/feedback-content"

interface FeedbackItem {
  id: string
  title: string
  date: Date
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

export default function DashboardPage() {
  const router = useRouter()
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([])
  const [currentFeedback, setCurrentFeedback] = useState<FeedbackItem | null>(null)
  const userEmail = "john@example.com"

  const createNewFeedback = () => {
    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      title: "New Feedback",
      date: new Date(),
      status: 'upload'
    }
    
    setFeedbacks(prev => [newFeedback, ...prev])
    setCurrentFeedback(newFeedback)
  }

  const handleFileUpload = async (data: { threadId: string; runId: string }) => {
    if (!currentFeedback) return
    
    const updatedFeedback: FeedbackItem = {
      ...currentFeedback,
      status: 'processing',
      threadId: data.threadId,
      runId: data.runId
    }

    setFeedbacks(prev => prev.map(f => 
      f.id === currentFeedback.id ? updatedFeedback : f
    ))
    setCurrentFeedback(updatedFeedback)
  }

  const handleAnalysisComplete = (output: string) => {
    if (!currentFeedback) return

    try {
      const feedbackData = JSON.parse(output)
      
      const updatedFeedback: FeedbackItem = {
        ...currentFeedback,
        status: 'ready',
        title: "Your Portfolio Analysis",
        summary: feedbackData.summary,
        areas: feedbackData.areas,
        references: feedbackData.references,
        imageUrl: "https://picsum.photos/400/300?random=1"
      }

      setFeedbacks(prev => prev.map(feedback => 
        feedback.id === currentFeedback.id ? updatedFeedback : feedback
      ))

      setCurrentFeedback(updatedFeedback)
    } catch (error) {
      console.error('Error parsing feedback:', error)
    }
  }

  const handleReveal = () => {
    if (!currentFeedback) return

    const updatedFeedback: FeedbackItem = {
      ...currentFeedback,
      status: 'viewed'
    }

    setFeedbacks(prev => prev.map(feedback => 
      feedback.id === currentFeedback.id ? updatedFeedback : feedback
    ))
    setCurrentFeedback(updatedFeedback)
  }

  const handleFeedbackSelect = (feedback: FeedbackItem) => {
    setCurrentFeedback(feedback)
  }

  const handleDeleteFeedback = (feedbackId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    
    const updatedFeedbacks = feedbacks.filter(f => f.id !== feedbackId)
    const isCurrentFeedback = currentFeedback?.id === feedbackId

    setFeedbacks(updatedFeedbacks)
    
    if (isCurrentFeedback) {
      if (updatedFeedbacks.length > 0) {
        setCurrentFeedback(updatedFeedbacks[0])
      } else {
        createNewFeedback()
      }
    }
  }

  // Initialize with a pending feedback if there are no feedbacks
  useEffect(() => {
    if (feedbacks.length === 0) {
      createNewFeedback()
    }
  }, []) // Empty dependency array - runs only once on mount

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

