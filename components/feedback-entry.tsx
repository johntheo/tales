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
    <div className="w-full max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left column - Areas */}
        <div className="flex-1">
          <Card>
            <CardHeader>
              <CardTitle>{fileName}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(metrics).map(([key, value]) => (
                <Card
                  key={key}
                  className={`cursor-pointer transition-colors hover:bg-accent/50 ${
                    selectedArea === key ? 'bg-accent' : ''
                  }`}
                  onClick={() => setSelectedArea(key as keyof Areas)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">{areaNames[key as keyof Areas]}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">{value.score}</span>
                        <span className="text-sm text-muted-foreground">/10</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {value.feedback}
                    </p>
                    <ChevronRight
                      className={`w-5 h-5 mt-2 transition-transform ${
                        selectedArea === key ? 'rotate-90' : ''
                      }`}
                    />
                    {selectedArea === key && (
                      <div className="mt-4 text-sm">
                        {value.feedback}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right column - References */}
        <div className="flex-1">
          <Card className="sticky top-4">
            <CardContent className="p-6">
              <Tabs defaultValue="videos">
                <TabsList className="w-full">
                  <TabsTrigger value="videos">Videos</TabsTrigger>
                  <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                  <TabsTrigger value="articles">Articles</TabsTrigger>
                  <TabsTrigger value="decks">Decks</TabsTrigger>
                  <TabsTrigger value="books">Books</TabsTrigger>
                </TabsList>
                <ScrollArea className="h-[500px] mt-4">
                  {Object.entries(references).map(([type, items]) => (
                    <TabsContent key={type} value={type} className="mt-0">
                      <div className="space-y-4">
                        {items.map((ref: Reference, index: number) => (
                          <Card key={index}>
                            <CardContent className="p-4">
                              <div className="flex gap-4">
                                <div className="relative w-24 h-24 flex-shrink-0">
                                  <Image
                                    src={ref.image}
                                    alt={ref.title}
                                    fill
                                    className="object-cover rounded-lg"
                                  />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4 className="font-semibold mb-1 truncate">{ref.title}</h4>
                                  <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                                    {ref.summary}
                                  </p>
                                  <Button
                                    variant="link"
                                    className="h-auto p-0 text-primary"
                                    asChild
                                  >
                                    <a
                                      href={ref.link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 hover:underline"
                                    >
                                      Learn more
                                      <ExternalLink className="w-3 h-3" />
                                    </a>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>
                  ))}
                </ScrollArea>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

