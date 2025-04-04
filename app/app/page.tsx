"use client"

import type React from "react"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

export default function AppPage() {
  const router = useRouter()
  const [selectedOption, setSelectedOption] = useState("portfolio")
  const [portfolioLink, setPortfolioLink] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [trustModalOpen, setTrustModalOpen] = useState(false)
  const featuresRef = useRef<HTMLDivElement>(null)

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleSubmit = () => {
    setIsSubmitting(true)

    // Store the portfolio data in session storage
    const portfolioData = portfolioLink || (file ? file.name : "Sample portfolio")
    sessionStorage.setItem("portfolioData", portfolioData)

    // If there's a file, create a URL for it and store it
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target && e.target.result) {
          sessionStorage.setItem("portfolioImage", e.target.result.toString())
        }
        // Navigate directly to dashboard
        router.push("/dashboard")
      }
      reader.readAsDataURL(file)
    } else {
      // Use a placeholder image if no file is provided
      sessionStorage.setItem(
        "portfolioImage",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BODWPsrnGqynDDYQo7WAnZjkWgbxty.png",
      )
      // Navigate directly to dashboard
      router.push("/dashboard")
    }
  }

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  return (
    <>
      <header className="container mx-auto px-4 py-4 flex justify-between items-center relative z-50">
        <Link href="/" className="logo">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5Btales%5D-logo-cr5dVmAyZBoyYbXBQ1bLbyRXtpQGBW.svg"
            alt="tales"
            width={80}
            height={28}
          />
        </Link>

        <nav className="flex items-center gap-6">
          <Button variant="ghost" onClick={scrollToFeatures} className="text-sm font-medium">
            Solution
          </Button>
          <Link href="/signup">
            <Button variant="default" className="text-sm font-medium bg-black text-white hover:bg-gray-800">
              Get Started Free
            </Button>
          </Link>
        </nav>
      </header>

      <main className="min-h-screen flex flex-col">
        {/* Main Content */}
        <div className="flex-grow flex flex-col items-center justify-center px-4 py-8">
          <h1 className="text-3xl font-bold mb-8 text-center">Let's upgrade your first story!</h1>

          <Card className="w-full max-w-md p-6 rounded-xl shadow-sm">
            <div className="space-y-4">
              <p className="text-gray-600 text-sm">
                Choose the type of review you need. Whether it's a portfolio, case study, or presentation deck, we can
                provide tailored feedback to elevate your storytelling and design. Select an option to get started.
              </p>

              {/* Option Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => handleOptionSelect("portfolio")}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors",
                    selectedOption === "portfolio" && "border-black border-2",
                  )}
                >
                  <div className="w-6 h-6 mb-2 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 4V4C8.22876 4 6.34315 4 5.17157 5.17157C4 6.34315 4 8.22876 4 12V12C4 15.7712 4 17.6569 5.17157 18.8284C6.34315 20 8.22876 20 12 20V20C15.7712 20 17.6569 20 18.8284 18.8284C20 17.6569 20 15.7712 20 12V12C20 8.22876 20 6.34315 18.8284 5.17157C17.6569 4 15.7712 4 12 4Z"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <path
                        d="M14 8.5C14 9.88071 13.1046 11 12 11C10.8954 11 10 9.88071 10 8.5C10 7.11929 10.8954 6 12 6C13.1046 6 14 7.11929 14 8.5Z"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <path
                        d="M16.5 17.5C16.5 15.2909 14.4853 13.5 12 13.5C9.51472 13.5 7.5 15.2909 7.5 17.5"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="font-medium text-sm">Portfolio</span>
                </button>

                <button
                  onClick={() => handleOptionSelect("case")}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors",
                    selectedOption === "case" && "border-black border-2",
                  )}
                >
                  <div className="w-6 h-6 mb-2 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <rect x="3" y="6" width="18" height="12" rx="2" stroke="black" strokeWidth="2" />
                      <path
                        d="M7 6V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V6"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <path d="M8 12L16 12" stroke="black" strokeWidth="2" strokeLinecap="round" />
                      <path d="M8 15L12 15" stroke="black" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm">Case Review</span>
                </button>

                <button
                  onClick={() => handleOptionSelect("pitch")}
                  className={cn(
                    "flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors",
                    selectedOption === "pitch" && "border-black border-2",
                  )}
                >
                  <div className="w-6 h-6 mb-2 flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 2 12C2 17.5228 6.47715 22 12 22Z"
                        stroke="black"
                        strokeWidth="2"
                      />
                      <path d="M12 15V17" stroke="black" strokeWidth="2" strokeLinecap="round" />
                      <path d="M12 7L12 13" stroke="black" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <span className="font-medium text-sm">Pitch</span>
                </button>
              </div>

              {/* Link Input */}
              <div className="space-y-1">
                <label htmlFor="link" className="block text-sm font-medium">
                  Link
                </label>
                <Input
                  id="link"
                  type="url"
                  placeholder={`${selectedOption === "portfolio" ? "Portfolio" : selectedOption === "case" ? "Case Study" : "Pitch Deck"} Link`}
                  value={portfolioLink}
                  onChange={(e) => setPortfolioLink(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Divider */}
              <div className="relative flex items-center py-1">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="flex-shrink mx-3 text-gray-400 text-xs">OR CONTINUE WITH</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>

              {/* File Upload Area */}
              <div
                className={cn(
                  "border border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors",
                  isDragging ? "border-black bg-gray-50" : "border-gray-300",
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={handleBrowseClick}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png"
                />
                <div className="flex flex-col items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 17V3" stroke="black" strokeWidth="2" strokeLinecap="round" />
                    <path
                      d="M7 8L12 3L17 8"
                      stroke="black"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path d="M20 21H4" stroke="black" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <p className="text-gray-500 text-xs">{file ? file.name : "Choose a file or drag & drop it here"}</p>
                  <Button variant="outline" size="sm" className="rounded-md h-8 text-xs">
                    Browse Files
                  </Button>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                className="w-full bg-black hover:bg-black/90 text-white h-10 rounded-md text-sm"
                onClick={handleSubmit}
                disabled={(!portfolioLink && !file) || isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Submit for Review"}
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </>
  )
}

