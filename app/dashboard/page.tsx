"use client"

import { useState } from "react"
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

export default function DashboardPage() {
  const [isUploading, setIsUploading] = useState(false)
  const [hasFeedback, setHasFeedback] = useState(false)
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const router = useRouter()

  const handleFileUpload = async (file: File) => {
    setIsUploading(true)
    // Simulating file upload - will be replaced with actual upload later
    setTimeout(() => {
      setIsUploading(false)
    }, 2000)
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
          {hasFeedback ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Your latest feedback is here!</h2>
              <p className="text-gray-600 mb-6">
                We've reviewed your submission. Here's an overview of your presentation's performance and key areas for improvement.
              </p>

              {/* File Preview and Actions */}
              <div className="flex items-start gap-6 mb-8">
                <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Image
                    src="/placeholder.svg"
                    alt="Document preview"
                    width={100}
                    height={100}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-medium mb-1">das</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Filmmaking Trend Report 25 offers insights on current trends and highlights crucial information for filmmakers.
                  </p>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Download your file</Button>
                    <Button variant="default" size="sm" className="bg-black text-white hover:bg-gray-800">
                      Talk to a professional
                    </Button>
                  </div>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Visual Consistency */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor">
                      <path d="M2 12h4m16 0h-4M12 2v4m0 16v-4" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <h4 className="font-medium">Visual Consistency</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-black w-4/5" />
                    </div>
                    <span className="text-sm font-medium">4/5</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Great use of color palette, but some slides have inconsistent typography. Try using a single font family to maintain consistency.
                  </p>
                </div>

                {/* Content Clarity */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor">
                      <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <h4 className="font-medium">Content Clarity</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-black w-3/5" />
                    </div>
                    <span className="text-sm font-medium">3/5</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your key points are strong, but consider reducing text in some slides for better readability. Using bullet points could help organize information.
                  </p>
                </div>

                {/* Storytelling */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor">
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <h4 className="font-medium">Storytelling</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-black w-4/5" />
                    </div>
                    <span className="text-sm font-medium">4/5</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    The narrative is compelling, but the flow between sections could be smoother. A clear transition slide between topics would help guide the viewer.
                  </p>
                </div>

                {/* Data Visualization */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor">
                      <path d="M16 8v8m-8-6v6M4 4v16h16" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    <h4 className="font-medium">Data Visualization</h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-black w-3/5" />
                    </div>
                    <span className="text-sm font-medium">3/5</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your charts and graphs are informative, but the labels could be clearer. Try increasing contrast and using more intuitive color coding.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Empty State
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="max-w-md mx-auto">
                <h2 className="text-xl font-semibold mb-4">Welcome to Tales!</h2>
                <p className="text-gray-600 mb-8">
                  Upload your first presentation to get detailed feedback from our experts. We'll help you create compelling narratives that captivate your audience.
                </p>
                <Button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="bg-black text-white hover:bg-gray-800"
                >
                  Upload Presentation
                </Button>
              </div>
            </div>
          )}
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

