import { Loader2 } from "lucide-react"
import { Card } from "@/components/ui/card"

interface LoadingScreenProps {
  title?: string
  description?: string
}

export function LoadingScreen({ 
  title = "Analyzing your content and generating insights...",
  description = "Our AI is carefully reviewing your work to provide detailed feedback and suggestions for improvement. This usually takes about a minute."
}: LoadingScreenProps) {
  return (
    <Card className="w-full max-w-2xl mx-auto p-8 flex flex-col items-center justify-center gap-6 bg-card/50 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 text-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  )
} 