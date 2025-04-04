import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => void
  isUploading: boolean
}

export function UploadModal({ isOpen, onClose, onUpload, isUploading }: UploadModalProps) {
  const [link, setLink] = useState("")
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  if (!isOpen) return null

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile)
    }
    // Handle link submission here
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-white z-50 animate-in fade-in duration-200">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Let's upgrade your first story!</h1>
          <p className="text-gray-600 mb-8">
            Whether it's a portfolio, case study, or presentation of your work, 
            we can provide tailored feedback to elevate your storytelling and design.
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="space-y-6">
            <div>
              <label htmlFor="link" className="block text-sm font-medium text-gray-700 mb-2">
                Link
              </label>
              <Input
                id="link"
                type="text"
                placeholder="Link to your work"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full"
              />
            </div>

            <div className="text-center">
              <div className="text-sm text-gray-500 mb-4">OR CONTINUE WITH</div>
            </div>

            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                id="file-upload"
                className="hidden"
                onChange={handleFileSelect}
                accept=".pdf,.ppt,.pptx,.key"
              />
              <div className="flex flex-col items-center">
                <svg
                  className="w-8 h-8 text-gray-400 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
                <p className="text-sm text-gray-600 mb-2">
                  Choose a file or drag & drop it here
                </p>
                <label
                  htmlFor="file-upload"
                  className="bg-white text-black border border-gray-300 rounded-md px-4 py-2 text-sm font-medium cursor-pointer hover:bg-gray-50"
                >
                  Browse Files
                </label>
                {selectedFile && (
                  <p className="mt-2 text-sm text-gray-600">
                    Selected: {selectedFile.name}
                  </p>
                )}
              </div>
            </div>

            <Button
              onClick={handleSubmit}
              disabled={isUploading || (!selectedFile && !link)}
              className="w-full bg-gray-600 hover:bg-gray-700 text-white"
            >
              {isUploading ? "Uploading..." : "Submit for Review"}
            </Button>
          </div>
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-500"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  )
} 