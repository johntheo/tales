"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Trash2 } from "lucide-react"
import { FeedbackItem } from "@/app/dashboard/page"
import { trackEvent } from "@/lib/posthog"

interface FeedbackListProps {
  items: FeedbackItem[]
  selectedId?: string
  onSelect: (feedback: FeedbackItem) => void
  onDelete: (id: string, e: React.MouseEvent) => void
}

export function FeedbackList({
  items,
  selectedId,
  onSelect,
  onDelete
}: FeedbackListProps) {
  const getStatusStyle = (status: FeedbackItem['status']) => {
    switch (status) {
      case 'upload':
        return 'border-l-4 border-l-blue-500'
      case 'processing':
        return 'border-l-4 border-l-yellow-500'
      case 'ready':
        return 'border-l-4 border-l-green-500'
      case 'viewed':
        return 'border-l-4 border-l-gray-300'
    }
  }

  const handleSelect = (feedback: FeedbackItem) => {
    trackEvent('feature_used', {
      feature_name: 'feedback_list',
      action: 'selected_feedback',
      feedback_id: feedback.id,
      feedback_status: feedback.status,
      cta_type: 'button'
    })
    onSelect(feedback)
  }

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    trackEvent('feature_used', {
      feature_name: 'feedback_list',
      action: 'deleted_feedback',
      feedback_id: id,
      cta_type: 'button'
    })
    onDelete(id, e)
  }

  return (
    <ScrollArea className="h-full">
      <div className="space-y-0.5">
        {items.map(feedback => {
          const isUploadItem = feedback.status === 'upload'
          const showDelete = !(isUploadItem && items.length === 1)
          
          return (
            <div
              key={feedback.id}
              className={`group relative transition-all duration-200 ${
                selectedId === feedback.id ? 'bg-accent' : 'hover:bg-accent/50'
              } ${getStatusStyle(feedback.status)}`}
            >
              <Button
                variant="ghost"
                className="w-full text-left text-sm h-auto py-3 px-4 relative"
                onClick={() => handleSelect(feedback)}
              >
                <div className="flex items-center w-full max-w-[250px] pr-1">
                  <div className="flex-1 min-w-0 pr-2">
                    <span className="font-medium block truncate">
                      {isUploadItem ? 'Ready for upload...' : feedback.title}
                    </span>
                  </div>
                  {showDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => handleDelete(feedback.id, e)}
                      aria-label={`Delete feedback "${feedback.title}"`}
                    >
                      <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive transition-colors" />
                    </Button>
                  )}
                </div>
              </Button>
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
} 