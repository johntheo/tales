"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Upload } from "lucide-react"
import Image from "next/image"

export default function UploadPage() {
  const router = useRouter()
  const [portfolioLink, setPortfolioLink] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [randomImage, setRandomImage] = useState<string | null>(null)
  const [imageLoaded, setImageLoaded] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0)
  }, [])

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

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Scroll to top of the page
    window.scrollTo(0, 0)

    try {
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
        }
        reader.readAsDataURL(file)
      } else {
        // Use a placeholder image if no file is provided
        sessionStorage.setItem("portfolioImage", "https://picsum.photos/300/200?random=8")
      }

      // Redirect to the loading page instead of directly to results
      router.push("/app/loading")
    } catch (error) {
      console.error("Error submitting portfolio:", error)
      setIsSubmitting(false)
    }
  }

  const loadRandomImage = useCallback(() => {
    if (!randomImage) {
      const randomId = Math.floor(Math.random() * 1000)
      setRandomImage(`https://picsum.photos/seed/${randomId}/300/300`)
    }
  }, [randomImage])

  useEffect(() => {
    if (portfolioLink || file) {
      loadRandomImage()
    } else {
      setRandomImage(null)
      setImageLoaded(false)
    }
  }, [portfolioLink, file, loadRandomImage])

  const isSubmitDisabled = (!portfolioLink && !file) || isSubmitting

  return (
    <main className="min-h-screen bg-[#e8e8e8] flex items-center justify-center py-8">
      <div className="container mx-auto px-4 flex justify-center">
        <div className="max-w-4xl w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h1 className="text-2xl font-bold mb-4 text-[#191919]">Submit Your Portfolio for Review</h1>
              <p className="mb-6 text-sm text-[#191919]">
                Provide a link to your online portfolio or upload your portfolio document. Our experts will review it
                and provide detailed feedback to help you showcase your skills effectively and attract potential
                employers or clients.
              </p>

              {/* Portfolio Link Input */}
              <input
                type="text"
                placeholder="Portfolio Link"
                className="w-full p-3 rounded-full bg-[#ffffff] mb-3 text-[#191919]"
                value={portfolioLink}
                onChange={(e) => setPortfolioLink(e.target.value)}
              />

              <div className="text-center my-3 text-[#a5a3a3]">or</div>

              {/* File Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors mb-6
                  ${isDragging ? "border-[#191919] bg-[#ffffff]" : "border-[#a5a3a3]"}`}
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
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                />
                <Upload className="mx-auto mb-3 text-[#a5a3a3]" size={24} />
                <p className="text-[#a5a3a3] mb-3 text-sm">
                  {file ? file.name : "Choose a file or drag & drop it here"}
                </p>
                <button className="bg-[#ffffff] hover:bg-[#e8e8e8] text-[#191919] px-4 py-2 rounded-full transition-colors text-sm">
                  Browse Files
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center">
              {/* Random Image or Animated Gradient */}
              <div ref={imageRef} className="w-64 h-64 rounded-lg overflow-hidden mb-6 shadow-lg relative">
                <div
                  className="w-full h-full absolute"
                  style={{
                    background: "linear-gradient(45deg, #ff69b4, #6a5acd, #00bfff, #9370db)",
                    backgroundSize: "400% 400%",
                    animation: "gradient 15s ease infinite",
                  }}
                />
                {(portfolioLink || file) && randomImage && (
                  <Image
                    src={randomImage || "/placeholder.svg"}
                    alt="Random preview image"
                    width={256}
                    height={256}
                    className={`object-cover w-full h-full absolute top-0 left-0 transition-opacity duration-500 ease-in ${imageLoaded ? "opacity-100" : "opacity-0"}`}
                    onLoad={() => setImageLoaded(true)}
                  />
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  className="bg-[#191919] text-[#ffffff] w-64 px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ease-in-out hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isSubmitDisabled}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? "Processing..." : "Submit for Review"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

