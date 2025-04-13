'use client'

import { useState, useEffect } from 'react'

type Status = "queued" | "in_progress" | "completed" | "failed" | "cancelled" | "expired" | "loading"

interface PollingResponse {
  status: Status
  output?: string
}

export function useAnalysisProgress(threadId?: string, runId?: string) {
  const [status, setStatus] = useState<Status>("loading")
  const [progress, setProgress] = useState(0)
  const [output, setOutput] = useState<string>("")

  useEffect(() => {
    if (!threadId || !runId) return

    let progressInterval: NodeJS.Timeout
    let isPollingActive = true

    const startProgressSimulation = () => {
      setProgress(0)
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 90) return prev
          const increment = Math.random() * 15 + 5 // Random increment between 5 and 20
          return Math.min(90, prev + increment)
        })
      }, 2000)
    }

    const pollStatus = async () => {
      try {
        const response = await fetch(`/api/status?thread_id=${threadId}&run_id=${runId}`)
        const data: PollingResponse = await response.json()

        if (!isPollingActive) return

        setStatus(data.status)

        if (data.status === "completed" && data.output) {
          setProgress(100)
          setOutput(data.output)
          clearInterval(progressInterval)
        } else if (["failed", "cancelled", "expired"].includes(data.status)) {
          clearInterval(progressInterval)
        } else {
          setTimeout(pollStatus, 2000)
        }
      } catch (error) {
        console.error("Error polling status:", error)
        setStatus("failed")
        clearInterval(progressInterval)
      }
    }

    startProgressSimulation()
    pollStatus()

    return () => {
      isPollingActive = false
      clearInterval(progressInterval)
      setStatus("loading")
      setProgress(0)
      setOutput("")
    }
  }, [threadId, runId])

  return { status, progress, output }
} 