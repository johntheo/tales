"use client"

import { Dialog, DialogContent } from "@/components/ui/dialog"
import { UploadForm } from "@/components/upload-form"

interface UploadModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (file: File) => void
  isUploading: boolean
}

export function UploadModal({
  isOpen,
  onClose,
  onUpload,
  isUploading
}: UploadModalProps) {
  const handleSubmit = (data: { link?: string; file?: File }) => {
    if (data.file) {
      onUpload(data.file)
    }
    // TODO: Handle link upload when backend is ready
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <UploadForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
} 