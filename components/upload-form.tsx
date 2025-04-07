"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { FeedbackProcessing } from "./feedback-processing"

interface UploadFormProps {
  onSubmit: (data: { link?: string; file?: File }) => void
  initialData?: {
    link?: string
    file?: File
  }
}

export function UploadForm({ onSubmit, initialData }: UploadFormProps) {
  const [link, setLink] = useState(initialData?.link || "")
  const [file, setFile] = useState<File | null>(initialData?.file || null)
  const [isDragging, setIsDragging] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

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
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (link) {
      // Add https:// if no protocol is specified
      const formattedLink = link.startsWith('http://') || link.startsWith('https://')
        ? link
        : `https://${link}`
      
      onSubmit({ link: formattedLink })
    } else if (file) {
      onSubmit({ file })
    }
  }

  return (
    <>
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-4">Let's upgrade your first story!</h1>
        <p className="text-muted-foreground text-lg mb-8">
          Whether it's a portfolio, case study, or presentation of your work, we can provide tailored feedback to elevate your storytelling and design.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="workLink" className="text-base font-medium">Link</Label>
            <Input
              id="workLink"
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="Link to your work"
              className="mt-2"
            />
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-background text-muted-foreground">OR CONTINUE WITH</span>
            </div>
          </div>

          <div
            className={`border-2 border-dashed rounded-xl p-8 transition-colors ${
              isDragging ? "border-foreground bg-accent" : "border-border"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <input
                type="file"
                id="fileInput"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.ppt,.pptx,.key"
              />
              <div className="mb-4">
                <Image
                  src="/upload-icon.svg"
                  alt="Upload"
                  width={48}
                  height={48}
                />
              </div>
              {file ? (
                <div className="text-sm text-muted-foreground w-full">
                  <div className="flex items-center justify-between bg-accent/50 p-4 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-background rounded">
                        <Image
                          src="/document-icon.svg"
                          alt="Document"
                          width={20}
                          height={20}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={handleRemoveFile}
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 gap-2"
                    >
                      <X size={16} />
                      Remove
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground mb-4">Choose a file or drag & drop it here</p>
                  <label htmlFor="fileInput">
                    <Button type="button" variant="outline" className="cursor-pointer">
                      Browse Files
                    </Button>
                  </label>
                </>
              )}
            </div>
          </div>

          <Button 
            type="submit"
            className={`w-full h-12 text-base ${
              link || file 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-muted text-muted-foreground cursor-not-allowed"
            }`}
            disabled={!link && !file}
          >
            Submit for Review
          </Button>
        </form>
      </div>

      <FeedbackProcessing 
        isOpen={isProcessing} 
        onComplete={() => setIsProcessing(false)} 
      />
    </>
  )
} 