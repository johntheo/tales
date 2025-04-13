"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  const getStatusInfo = (status: FeedbackItem['status']) => {
    switch (status) {
      case 'upload':
        return { label: 'New', variant: 'default' as const, className: 'bg-blue-500/15 text-blue-700 hover:bg-blue-500/25' }
      case 'processing':
        return { label: 'Processing', variant: 'secondary' as const, className: 'bg-yellow-500/15 text-yellow-700 hover:bg-yellow-500/25' }
      case 'ready':
        return { label: 'Ready', variant: 'default' as const, className: 'bg-green-500/15 text-green-700 hover:bg-green-500/25' }
      case 'viewed':
        return { label: 'Viewed', variant: 'outline' as const, className: 'bg-gray-500/10 text-gray-600 hover:bg-gray-500/20' }
    }
  }

  return (
    <ScrollArea className="h-full">
      <div className="px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Feedback</h2>
          <Badge variant="secondary" className="bg-gray-100 text-gray-600 font-normal">
            {items.length} items
          </Badge>
        </div>
        <div className="space-y-3">
          {items.map(feedback => {
            const statusInfo = getStatusInfo(feedback.status)
            const isUploadItem = feedback.status === 'upload'
            const showDelete = !(isUploadItem && items.length === 1)
            
            return (
              <Card
                key={feedback.id}
                className={`group relative transition-all duration-200 border hover:border-gray-300 hover:shadow-sm ${
                  selectedId === feedback.id ? 'bg-gray-50 border-gray-300' : 'bg-white'
                }`}
              >
                <div className="flex items-center w-full">
                  <Button
                    variant="ghost"
                    className="flex-1 justify-start text-sm h-auto py-4 px-4 hover:bg-transparent"
                    onClick={() => onSelect(feedback)}
                  >
                    <div className="flex flex-col items-start w-full min-w-0 gap-2">
                      <div className="flex items-center gap-3 w-full">
                        <span className="font-medium text-gray-900 truncate flex-1">
                          {isUploadItem ? 'New Feedback...' : feedback.title}
                        </span>
                        <Badge 
                          variant={statusInfo.variant}
                          className={`${statusInfo.className} text-xs font-medium px-2.5 py-0.5 rounded-full transition-colors`}
                        >
                          {statusInfo.label}
                        </Badge>
                      </div>
                      <span className="text-gray-500 text-xs">
                        {formatDistanceToNow(feedback.date, { addSuffix: true })}
                      </span>
                    </div>
                  </Button>
                  {showDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 mr-3 opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-red-50"
                      onClick={(e) => onDelete(feedback.id, e)}
                    >
                      <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-600 transition-colors" />
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      </div>
    </ScrollArea>
  )
} 