"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { formatDistanceToNow } from "date-fns"
import { Trash2 } from "lucide-react"

interface FeedbackItem {
  id: string
  title: string
  date: Date
  status: 'upload' | 'processing' | 'ready' | 'viewed'
}

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
                className="w-full justify-start text-sm h-auto py-3 px-4"
                onClick={() => onSelect(feedback)}
              >
                <div className="flex flex-col items-start w-full min-w-0">
                  <span className="font-medium truncate w-[85%]">
                    {isUploadItem ? 'New Feedback...' : feedback.title}
                  </span>
                  <span className="text-[10px] text-muted-foreground mt-0.5">
                    {formatDistanceToNow(feedback.date, { addSuffix: true })}
                  </span>
                </div>
              </Button>
              {showDelete && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => onDelete(feedback.id, e)}
                >
                  <Trash2 className="h-3 w-3 text-muted-foreground hover:text-destructive transition-colors" />
                </Button>
              )}
            </div>
          )
        })}
      </div>
    </ScrollArea>
  )
} 