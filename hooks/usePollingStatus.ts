"use client"

import { useState, useEffect } from "react"

type Status = "queued" | "in_progress" | "completed" | "failed" | "cancelled" | "expired" | "loading"

interface PollingResponse {
  status: Status
  output?: string
}

export function usePollingStatus(threadId: string, runId: string) {
  const [status, setStatus] = useState<Status>("loading")
  const [output, setOutput] = useState<string>("")

  useEffect(() => {
    
    if (!threadId || !runId) {
      console.warn("Missing threadId or runId")
      return
    }

    let isActive = true

    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/check-status?threadId=${threadId}&runId=${runId}`)
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const data: PollingResponse = await response.json()

        if (!isActive) return

        setStatus(data.status)
        if (data.output) {
          setOutput(data.output)
        }

        if (!["completed", "failed", "cancelled", "expired"].includes(data.status)) {
          setTimeout(pollStatus, 2000)
        }
      } catch (error) {
        console.error("Error polling status:", error)
        if (isActive) {
          setStatus("failed")
        }
      }
    }

    pollStatus()

    return () => {
      isActive = false
      setStatus("loading")
      setOutput("")
    }
  }, [threadId, runId])

  return { status, output }
}