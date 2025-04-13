"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingScreen } from "@/components/loading-screen"
import { Upload } from "lucide-react"

interface UploadFormProps {
  onSubmit: (data: { threadId: string; runId: string }) => void
  initialData?: {
    link?: string
    file?: File
  }
}

export function UploadForm({ onSubmit, initialData }: UploadFormProps) {
  const [link, setLink] = useState(initialData?.link || "")
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      setLink("")
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setLink("")
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    // Reset the input value so the same file can be selected again
    const fileInput = document.getElementById("fileInput") as HTMLInputElement
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsProcessing(true)
    setError(null)
    
    try {
      let response;
      if (link) {
        const formattedLink = link.startsWith('http://') || link.startsWith('https://')
          ? link
          : `https://${link}`
        
        response = await fetch('/api/generate-feedback', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url: formattedLink }),
        });
      } else if (file) {
        const formData = new FormData();
        formData.append('file', file);
        
        response = await fetch('/api/generate-feedback', {
          method: 'POST',
          body: formData,
        });
      }

      if (!response?.ok) {
        const errorData = await response?.json();
        throw new Error(errorData?.error || 'Failed to submit for analysis');
      }

      const data = await response.json();
      onSubmit({
        threadId: data.thread_id,
        runId: data.run_id
      });
    } catch (error) {
      console.error('Error submitting for analysis:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsProcessing(false);
    }
  }

  if (isProcessing) {
    return (
      <div className="h-full flex items-center justify-center">
        <LoadingScreen 
          title="Preparing your content..."
          description="We're getting your content ready for analysis. This will just take a moment."
        />
      </div>
    )
  }

  return (
    <div className="w-full">
      <h1 className="text-4xl font-bold mb-4">Let's upgrade your first story!</h1>
      <p className="text-muted-foreground text-lg mb-8">
        Whether it's a portfolio, case study, or presentation of your work, we can provide tailored feedback to elevate your storytelling and design.
      </p>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="portfolio-link">Portfolio Link</Label>
            <Input
              id="portfolio-link"
              type="text"
              placeholder="Enter your portfolio URL"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              disabled={!!file || isProcessing}
            />
          </div>
          
          <div>
            <Label>Or Upload File</Label>
            <div
              className={cn(
                "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10",
                isDragging && "border-primary",
                !!file && "border-solid border-primary/50 bg-primary/5"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileSelect}
                      ref={fileInputRef}
                      disabled={!!link || isProcessing}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">PDF up to 10MB</p>
                {file && (
                  <div className="mt-4 text-sm text-primary">
                    Selected: {file.name}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button
          type="submit"
          className="w-full"
          disabled={(!link && !file) || isProcessing}
        >
          {isProcessing ? "Processing..." : "Submit for Review"}
        </Button>
      </form>
    </div>
  )
} 