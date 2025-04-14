"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ExternalLink, ChevronRight, Layout, Code2, Lightbulb, Users, BookText } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'

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

  const areaConfig: Record<keyof Areas, { name: string; icon: React.ReactNode; color: string }> = {
    clarity: { 
      name: "Clarity & Structure", 
      icon: <Layout className="h-4 w-4" />,
      color: "#FF6B6B" // Coral Red
    },
    technical_skills: { 
      name: "Technical Skills", 
      icon: <Code2 className="h-4 w-4" />,
      color: "#4ECDC4" // Mint
    },
    innovation: { 
      name: "Innovation", 
      icon: <Lightbulb className="h-4 w-4" />,
      color: "#45B7D1" // Sky Blue
    },
    user_focus: { 
      name: "User Focus", 
      icon: <Users className="h-4 w-4" />,
      color: "#96CEB4" // Sage Green
    },
    storytelling: { 
      name: "Storytelling", 
      icon: <BookText className="h-4 w-4" />,
      color: "#D4A5A5" // Dusty Rose
    }
  }

  // Transform metrics data for the radar chart
  const radarData = Object.entries(metrics).map(([key, value]) => ({
    subject: key,
    score: value.score,
    fullMark: 10
  }))

  const CustomAxisTick = ({ x, y, payload }: any) => {
    const area = areaConfig[payload.value as keyof Areas]
    return (
      <g transform={`translate(${x},${y})`}>
        <foreignObject x="-12" y="-12" width="24" height="24">
          <div className="h-6 w-6 rounded-full flex items-center justify-center" style={{ backgroundColor: area.color }}>
            {area.icon}
          </div>
        </foreignObject>
      </g>
    )
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
          <div className="flex flex-col md:flex-row">
            {feedbackImage && (
              <div className="relative w-full md:w-1/4 aspect-[16/9] md:aspect-square">
                <Image
                  src={feedbackImage}
                  alt={fileName}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-4 space-y-4 md:w-3/4">
              <div>
                <h2 className="text-xl font-semibold mb-1">{fileName}</h2>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <Button variant="outline" className="w-full md:w-1/2 justify-center">
                  Download your file
                </Button>
                <Button className="w-full md:w-1/2 justify-center">
                  Talk to a professional
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overall Analysis */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Areas Analysis</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Radar Chart */}
          <Card className="w-full lg:w-1/4 p-4">
            <div className="text-center mb-2">
              <h3 className="text-sm font-medium">Score Overview</h3>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                <PolarGrid gridType="circle" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={<CustomAxisTick />}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 10]}
                  tick={{ fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={false}
                />
                {Object.entries(areaConfig).map(([key, config]) => (
                  <Radar
                    key={key}
                    name={config.name}
                    dataKey="score"
                    stroke={config.color}
                    fill={config.color}
                    fillOpacity={0.3}
                  />
                ))}
              </RadarChart>
            </ResponsiveContainer>
            <div className="mt-6 grid grid-cols-2 gap-3 text-xs">
              {Object.entries(areaConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2" title={config.name}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: config.color }}>
                    {config.icon}
                  </div>
                  <span className="text-muted-foreground truncate">{config.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Accordion Feedback */}
          <div className="lg:w-3/4">
            <Accordion type="single" defaultValue="clarity" className="w-full">
              {Object.entries(metrics).map(([key, value]) => (
                <AccordionItem key={key} value={key}>
                  <AccordionTrigger className="hover:no-underline [&>svg]:hidden group">
                    <div className="flex items-center gap-3">
                      <div 
                        className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-white"
                        style={{ backgroundColor: areaConfig[key as keyof Areas].color }}
                      >
                        {areaConfig[key as keyof Areas].icon}
                      </div>
                      <span className="font-medium text-sm">{areaConfig[key as keyof Areas].name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground pl-11">{value.feedback}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1200px] mx-auto">
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
                      <h3 className="font-medium text-sm mb-1 line-clamp-1">{ref.title}</h3>
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

