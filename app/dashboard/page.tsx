"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UploadModal } from "@/components/upload-modal"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { UploadForm } from "@/components/upload-form"
import { X } from "lucide-react"

export default function DashboardPage() {
  const [feedbacks, setFeedbacks] = useState<any[]>([])
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [showNewFeedback, setShowNewFeedback] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Check if we're coming from the upload flow
    const params = new URLSearchParams(window.location.search)
    if (params.get("showFeedback") === "true") {
      setShowNewFeedback(true)
      // Clean up the URL
      window.history.replaceState({}, "", "/dashboard")
    }
  }, [])

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    try {
      // Simulate file upload and processing
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Add the new feedback to the list
      const newFeedback = {
        id: Date.now(),
        title: file.name,
        date: new Date().toISOString(),
        status: "completed",
        metrics: [
          { title: "Story Structure", score: 85, feedback: "Well-organized narrative flow" },
          { title: "Visual Design", score: 92, feedback: "Excellent use of visual hierarchy" },
          { title: "Content Clarity", score: 88, feedback: "Clear and concise messaging" }
        ]
      }
      
      setFeedbacks(prev => [newFeedback, ...prev])
      setShowNewFeedback(true)
    } finally {
      setIsUploading(false)
      setIsUploadModalOpen(false)
    }
  }

  const handleLogout = () => {
    // Add your logout logic here (clear tokens, cookies, etc)
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="h-16 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5Btales%5D-logo-cr5dVmAyZBoyYbXBQ1bLbyRXtpQGBW.svg"
              alt="tales"
              width={80}
              height={28}
            />
          </Link>
          <div className="flex items-center gap-4">
            <Button 
              variant="default" 
              size="sm" 
              className="bg-black text-white hover:bg-gray-800"
              onClick={() => setIsUploadModalOpen(true)}
            >
              New Feedback
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center hover:bg-gray-300">
                  <svg
                    className="h-5 w-5 text-gray-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Sidebar */}
      <div className="flex h-[calc(100vh-64px)]">
        <aside className="w-64 bg-white border-r border-gray-200 p-4">
          <nav>
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-sm font-medium">
                Recent Feedback
              </Button>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <main>
              {showNewFeedback && feedbacks.length > 0 ? (
                <div className="bg-white rounded-lg p-6 mb-8 animate-in fade-in slide-in-from-bottom-4">
                  <div className="max-w-3xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl font-bold">Latest Feedback</h2>
                      <Button
                        variant="ghost"
                        onClick={() => setShowNewFeedback(false)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-6">
                      {feedbacks[0].metrics.map((metric: any, index: number) => (
                        <div key={index} className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-medium">{metric.title}</h3>
                            <span className="text-sm text-gray-500">{metric.score}/100</span>
                          </div>
                          <div className="relative h-2 bg-gray-200 rounded-full mb-2">
                            <div
                              className="absolute left-0 top-0 h-full bg-black rounded-full transition-all duration-1000"
                              style={{ width: `${metric.score}%` }}
                            />
                          </div>
                          <p className="text-sm text-gray-600">{metric.feedback}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <UploadForm
                  onSubmit={async (data) => {
                    if (data.file) {
                      await handleFileUpload(data.file)
                    }
                  }}
                />
              )}
            </main>
          </div>
        </main>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={handleFileUpload}
        isUploading={isUploading}
      />
    </div>
  )
}

