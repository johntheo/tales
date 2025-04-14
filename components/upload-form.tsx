"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Upload, FileText, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { LoadingScreen } from "@/components/loading-screen"
import { toast } from "sonner"

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
  const [forceNewProcessing, setForceNewProcessing] = useState(false)
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
      if (droppedFile.type === 'application/pdf') {
        if (droppedFile.size <= 10 * 1024 * 1024) { // 10MB limit
          setFile(droppedFile)
          setLink("")
          setError(null)
        } else {
          const errorMsg = "File size exceeds 10MB limit"
          setError(errorMsg)
          toast.error(errorMsg)
        }
      } else {
        const errorMsg = "Please upload a PDF file"
        setError(errorMsg)
        toast.error(errorMsg)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type === 'application/pdf') {
        if (selectedFile.size <= 10 * 1024 * 1024) { // 10MB limit
          setFile(selectedFile)
          setLink("")
          setError(null)
        } else {
          const errorMsg = "File size exceeds 10MB limit"
          setError(errorMsg)
          toast.error(errorMsg)
        }
      } else {
        const errorMsg = "Please upload a PDF file"
        setError(errorMsg)
        toast.error(errorMsg)
      }
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
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
          body: JSON.stringify({ 
            url: formattedLink,
            forceNewProcessing 
          }),
        });
      } else if (file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('forceNewProcessing', forceNewProcessing.toString());
        
        response = await fetch('/api/generate-feedback', {
          method: 'POST',
          body: formData,
        });
      }

      if (!response?.ok) {
        const errorData = await response?.json();
        const errorMsg = errorData?.error || 'Failed to submit for analysis'
        setError(errorMsg);
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }

      const data = await response.json();
      onSubmit({
        threadId: data.thread_id,
        runId: data.run_id
      });
    } catch (error) {
      console.error('Error submitting for analysis:', error);
      const errorMsg = error instanceof Error ? error.message : 'An unexpected error occurred'
      setError(errorMsg);
      toast.error(errorMsg);
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
                "mt-2 flex flex-col justify-center rounded-lg border border-dashed px-6 py-8",
                isDragging ? "border-primary bg-primary/5" : "border-gray-200",
                file ? "border-solid border-primary/50 bg-primary/5" : "",
                "relative"
              )}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!file ? (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex flex-col items-center text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md font-semibold text-primary hover:text-primary/80"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileSelect}
                        ref={fileInputRef}
                        accept=".pdf"
                        disabled={!!link || isProcessing}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">PDF up to 10MB</p>
                </div>
              ) : (
                <div className="flex items-center justify-between p-4 bg-background rounded-md">
                  <div className="flex items-center space-x-4">
                    <div className="p-2 bg-primary/10 rounded-md">
                      <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="hover:bg-destructive/10 hover:text-destructive"
                    onClick={handleRemoveFile}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="force-new-processing"
            checked={forceNewProcessing}
            onChange={(e) => setForceNewProcessing(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label
            htmlFor="force-new-processing"
            className="text-sm text-gray-600"
          >
            Force new processing (ignore cache)
          </label>
        </div>

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