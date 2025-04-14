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
import { PDFDownloadLink } from '@react-pdf/renderer';
import { FeedbackPDF } from './feedback-pdf';
import { toast } from 'sonner';

export interface Areas {
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

export interface Reference {
  title: string
  summary: string
  image: string
  link: string
}

export interface References {
  videos: Reference[]
  podcasts: Reference[]
  articles: Reference[]
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
      icon: <Layout className="h-5 w-5" />,
      color: "#FF6B6B"
    },
    technical_skills: { 
      name: "Technical Skills", 
      icon: <Code2 className="h-5 w-5" />,
      color: "#4ECDC4"
    },
    innovation: { 
      name: "Innovation", 
      icon: <Lightbulb className="h-5 w-5" />,
      color: "#45B7D1"
    },
    user_focus: { 
      name: "User Focus", 
      icon: <Users className="h-5 w-5" />,
      color: "#96CEB4"
    },
    storytelling: { 
      name: "Storytelling", 
      icon: <BookText className="h-5 w-5" />,
      color: "#D4A5A5"
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
        <foreignObject x="-16" y="-16" width="32" height="32">
          <div 
            className="h-8 w-8 rounded-full flex items-center justify-center text-white shadow-sm transition-transform hover:scale-110" 
            style={{ 
              backgroundColor: area.color,
              boxShadow: `0 2px 8px ${area.color}40`
            }}
          >
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
          We've reviewed your submission. Here's an overall feedback and key areas for improvement.
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
            <div className="p-4 space-y-4 md:w-3/4 flex flex-col h-full">
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-1">{fileName}</h2>
                <p className="text-sm text-muted-foreground">{description}</p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <PDFDownloadLink
                  document={
                    <FeedbackPDF
                      fileName={fileName}
                      description={description}
                      metrics={metrics}
                      references={references}
                      feedbackImage={feedbackImage}
                    />
                  }
                  fileName={`${fileName}-feedback.pdf`}
                  className="w-full md:w-1/2"
                  onClick={() => {
                    toast.success('Generating PDF...', {
                      description: 'Your feedback report is being prepared.',
                      duration: 3000,
                    });
                  }}
                  onError={(event) => {
                    console.error('PDF generation error:', event);
                    toast.error('Failed to generate PDF', {
                      description: 'There was an error generating your feedback report. Please try again.',
                      duration: 5000,
                    });
                  }}
                >
                  {({ loading, error }) => (
                    <Button 
                      variant="outline" 
                      className="w-full justify-center" 
                      disabled={loading || !!error}
                    >
                      {loading ? 'Generating PDF...' : error ? 'Error generating PDF' : 'Download your file'}
                    </Button>
                  )}
                </PDFDownloadLink>
                <a 
                  href={`mailto:detales.app@gmail.com?subject=Mentoring Request - ${fileName}&body=Hi there,%0D%0A%0D%0AI've just received feedback on my presentation "${fileName}" and I'm interested in scheduling a mentoring session to discuss it further and get professional guidance.%0D%0A%0D%0ALooking forward to hearing from you!%0D%0A%0D%0ABest regards`}
                  className="w-full md:w-1/2"
                >
                  <Button className="w-full justify-center">
                    Talk to a professional
                  </Button>
                </a>
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
            <div className="relative w-full aspect-square max-w-[300px] mx-auto">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart 
                  cx="50%" 
                  cy="50%" 
                  outerRadius="70%" 
                  data={radarData}
                  style={{ fontSize: 12 }}
                >
                  <PolarGrid 
                    gridType="circle"
                    stroke="hsl(var(--border))"
                    strokeDasharray="4 4"
                    strokeOpacity={0.6}
                    radialLines={true}
                  />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={<CustomAxisTick />}
                    tickLine={false}
                    axisLine={{ stroke: 'hsl(var(--border))', strokeOpacity: 0.6 }}
                  />
                  <PolarRadiusAxis
                    angle={-150}
                    domain={[0, 10]}
                    tickCount={6}
                    tick={{ 
                      fill: 'hsl(var(--muted-foreground))',
                      fontSize: 11,
                      fontWeight: 500,
                      opacity: 0.8,
                      dy: -3
                    }}
                    axisLine={false}
                  />
                  {Object.entries(areaConfig).map(([key, config]) => (
                    <Radar
                      key={key}
                      name={config.name}
                      dataKey="score"
                      stroke={config.color}
                      strokeWidth={2}
                      fill={config.color}
                      fillOpacity={0.15}
                    />
                  ))}
                </RadarChart>
              </ResponsiveContainer>
            </div>
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
                <AccordionItem key={key} value={key} className="border-b last:border-b-0">
                  <AccordionTrigger className="hover:no-underline group py-4 transition-colors hover:bg-muted/50 data-[state=open]:bg-muted/50">
                    <div className="flex items-center gap-3 w-full">
                      <div 
                        className="h-8 w-8 rounded-full flex items-center justify-center shrink-0 text-white transition-transform group-hover:scale-105 group-data-[state=open]:scale-110 shadow-sm" 
                        style={{ backgroundColor: areaConfig[key as keyof Areas].color }}
                      >
                        {areaConfig[key as keyof Areas].icon}
                      </div>
                      <div className="flex flex-col items-start gap-1 flex-1">
                        <span className="font-medium text-sm group-data-[state=open]:text-primary">
                          {areaConfig[key as keyof Areas].name}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="h-1.5 rounded-full bg-muted-foreground/20 w-[100px]">
                            <div 
                              className="h-full rounded-full transition-all" 
                              style={{ 
                                width: `${value.score * 10}%`,
                                backgroundColor: areaConfig[key as keyof Areas].color 
                              }}
                            />
                          </div>
                          <span className="text-xs text-muted-foreground">{value.score}/10</span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="py-4 px-11">
                    <p className="text-sm text-muted-foreground">{value.feedback}</p>
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
          <TabsList className="w-full h-10 grid grid-cols-4 bg-muted rounded-lg p-1">
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

