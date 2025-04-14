import { Loader2 } from "lucide-react"

interface LoadingScreenProps {
  title?: string
  description?: string
}

export function LoadingScreen({ 
  title = "Analyzing your content and generating insights...",
  description = "Our AI is carefully reviewing your work to provide detailed feedback and suggestions for improvement. This usually takes about a minute."
}: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <div className="flex flex-col items-center gap-4 text-center max-w-2xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  )
} 