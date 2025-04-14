"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, ChevronRight } from "lucide-react"

interface Areas {
  clarity: {
    score: number
    feedback: string
  }
  technical_skills: {
    score: number
    feedback: string
  }
  innovation: {
    score: number
    feedback: string
  }
  user_focus: {
    score: number
    feedback: string
  }
  storytelling: {
    score: number
    feedback: string
  }
}

interface Reference {
  title: string
  summary: string
  image: string
  link: string
}

interface References {
  videos: Reference[]
  podcasts: Reference[]
  articles: Reference[]
  decks: Reference[]
  books: Reference[]
}

interface FeedbackEntryProps {
  fileName: string
  description: string
  metrics: Areas
  references: References
  feedbackImage?: string
  isLoaded: boolean
}

export function FeedbackEntry({
  fileName,
  description,
  metrics,
  references,
  feedbackImage,
  isLoaded
}: FeedbackEntryProps) {
  const [selectedArea, setSelectedArea] = useState<keyof Areas>("clarity")

  const areaNames: Record<keyof Areas, string> = {
    clarity: "Clarity & Structure",
    technical_skills: "Technical Skills",
    innovation: "Innovation",
    user_focus: "User Focus",
    storytelling: "Storytelling"
  }

  if (!isLoaded) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold tracking-tight">Your latest feedback is here!</h1>
        <p className="text-base text-muted-foreground">
          We've reviewed your submission. Here's an overview of your presentation's performance and key areas for improvement.
        </p>
      </div>

      {/* File Preview */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          {feedbackImage && (
            <div className="relative w-full aspect-[16/9]">
              <Image
                src={feedbackImage}
                alt={fileName}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="p-4 space-y-4">
            <div>
              <h2 className="text-xl font-semibold mb-1">{fileName}</h2>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <Button variant="outline" className="w-full justify-center">
                Download your file
              </Button>
              <Button className="w-full justify-center">
                Talk to a professional
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Analysis */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Overall Analysis</h2>
          <p className="text-sm text-muted-foreground mt-1">Good views to grow your expertise.</p>
        </div>

        <div className="space-y-2">
          {Object.entries(metrics).map(([key, value]) => (
            <Card key={key} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <ChevronRight className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-medium text-sm mb-1">{areaNames[key as keyof Areas]}</h3>
                    <p className="text-sm text-muted-foreground">{value.feedback}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* References */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">References</h2>
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="w-full h-10 grid grid-cols-5 bg-muted rounded-lg p-1">
            <TabsTrigger 
              value="videos" 
              className="text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
            >
              Videos
            </TabsTrigger>
            <TabsTrigger 
              value="podcasts"
              className="text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
            >
              Podcasts
            </TabsTrigger>
            <TabsTrigger 
              value="decks"
              className="text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
            >
              Decks
            </TabsTrigger>
            <TabsTrigger 
              value="articles"
              className="text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
            >
              Articles
            </TabsTrigger>
            <TabsTrigger 
              value="books"
              className="text-sm data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
            >
              Books
            </TabsTrigger>
          </TabsList>

          {Object.entries(references).map(([type, items]) => (
            <TabsContent key={type} value={type} className="mt-4">
              <div className="grid grid-cols-1 gap-4">
                {items.map((ref: Reference, index: number) => (
                  <Card key={index} className="overflow-hidden">
                    <div className="relative aspect-video w-full bg-muted">
                      <Image
                        src={ref.image}
                        alt={ref.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-medium text-sm mb-1">{ref.title}</h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {ref.summary}
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto text-primary"
                        asChild
                      >
                        <a
                          href={ref.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium hover:underline"
                        >
                          Learn more
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

