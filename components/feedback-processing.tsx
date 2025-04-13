"use client"

import { useEffect } from "react"
import { Loader2 } from "lucide-react"
import { usePollingStatus } from "@/hooks/usePollingStatus"
import { Alert, AlertDescription } from '@/components/ui/alert'

interface FeedbackProcessingProps {
  threadId: string
  runId: string
  onComplete: (output: string) => void
}

export function FeedbackProcessing({ threadId, runId, onComplete }: FeedbackProcessingProps) {
  console.log("FeedbackProcessing rendered with:", { threadId, runId })

  if (!threadId || !runId) {
    console.error("Missing required props:", { threadId, runId })
    return (
      <Alert variant="destructive">
        <AlertDescription>
          Missing required information to process feedback.
        </AlertDescription>
      </Alert>
    )
  }

  const { status, output } = usePollingStatus(threadId, runId)
  console.log("Current polling state:", { status, output })

  useEffect(() => {
    console.log("Status effect triggered:", { status, output })
    
    if (status === "failed" || status === "cancelled" || status === "expired") {
      onComplete("An error occurred while processing your feedback. Please try again.")
    } else if (status === "completed" && output) {
      onComplete(output)
    }
  }, [status, output, onComplete])

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] p-4">
      {status === "loading" || status === "queued" || status === "in_progress" ? (
        <>
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="mt-4 text-sm text-muted-foreground">
            Processing your feedback... ({status})
          </p>
        </>
      ) : (
        <Alert>
          <AlertDescription>
            Status: {status}
          </AlertDescription>
        </Alert>
      )}
    </div>
  )
} 