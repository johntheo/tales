import { Loader2 } from "lucide-react"
import { useState, useEffect } from "react"

interface LoadingScreenProps {
  title?: string
  description?: string
}

const loadingMessages = [
  {
    title: "Analyzing your content and generating insights...",
    description: "Our AI is carefully reviewing your work to provide detailed feedback and suggestions for improvement. This usually takes about a minute."
  },
  {
    title: "Crafting personalized recommendations...",
    description: "Just like a master chef perfecting a recipe, we're carefully preparing your feedback."
  },
  {
    title: "Connecting the dots in your story...",
    description: "We're mapping out the narrative threads to help you weave an even better tale."
  },
  {
    title: "Polishing your literary gem...",
    description: "Every great story deserves careful attention - we're making sure yours shines."
  },
  {
    title: "Unraveling the magic of your words...",
    description: "We're exploring the depths of your narrative to help you reach new heights."
  }
]

export function LoadingScreen({ 
  title: customTitle,
  description: customDescription
}: LoadingScreenProps) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [showCustomMessage, setShowCustomMessage] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      if (showCustomMessage && (customTitle || customDescription)) {
        setShowCustomMessage(false)
      } else {
        setCurrentMessageIndex((prevIndex) => 
          prevIndex === loadingMessages.length - 1 ? 0 : prevIndex + 1
        )
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [showCustomMessage, customTitle, customDescription])

  const currentMessage = loadingMessages[currentMessageIndex]
  
  const displayTitle = showCustomMessage && customTitle ? customTitle : currentMessage.title
  const displayDescription = showCustomMessage && customDescription ? customDescription : currentMessage.description

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-4 text-center max-w-2xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{displayTitle}</h2>
          <p className="text-muted-foreground">{displayDescription}</p>
        </div>
      </div>
    </div>
  )
} 