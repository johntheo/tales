import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface Metric {
  id: string
  title: string
  icon: string
  feedback: string
}

interface Reference {
  id: string
  title: string
  description: string
  imageUrl: string
  contentUrl: string
  type: 'Videos' | 'Podcasts' | 'Decks' | 'Articles' | 'Books'
}

interface ReferenceSection {
  type: 'Videos' | 'Podcasts' | 'Decks' | 'Articles' | 'Books'
  items: Reference[]
}

interface FeedbackEntryProps {
  fileName: string
  description: string
  metrics: Metric[]
  references: Reference[]
  isLoaded?: boolean
  delay?: number
}

export function FeedbackEntry({ 
  fileName, 
  description, 
  metrics, 
  references,
  isLoaded = true, 
  delay = 0 
}: FeedbackEntryProps) {
  return (
    <div className="space-y-8 max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div>
        <h1 className="text-2xl font-semibold mb-2">Your latest feedback is here!</h1>
        <p className="text-gray-600">We've reviewed your submission. Here's an overview of your presentation's performance and key areas for improvement.</p>
      </div>

      {/* File Preview Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex gap-6">
          <div className="w-48 h-48 bg-gray-200 rounded-lg overflow-hidden relative flex-shrink-0">
            <Image
              src="/placeholder.svg"
              alt={fileName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-grow">
            <h2 className="text-xl font-semibold mb-2">{fileName}</h2>
            <p className="text-gray-600 mb-6">{description}</p>
            
            <div className="flex gap-3">
              <Button variant="outline">Download your file</Button>
              <Button variant="default" className="bg-black hover:bg-gray-800">
                Talk to a professional
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Overall</h2>
        <p className="text-gray-600 mb-6">Good views to grow your expertise.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8" dangerouslySetInnerHTML={{ __html: metric.icon }} />
                <h3 className="font-medium">{metric.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{metric.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* References Section */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Here some references to inspire you!</h2>
        <p className="text-gray-600 mb-6">Top picks for you. Updated daily.</p>

        <Tabs defaultValue={references?.[0]?.type?.toLowerCase() || 'videos'}>
          <TabsList>
            {['Videos', 'Podcasts', 'Decks', 'Articles', 'Books'].map((type) => (
              <TabsTrigger key={type} value={type.toLowerCase()}>
                {type}
              </TabsTrigger>
            ))}
          </TabsList>

          {['Videos', 'Podcasts', 'Decks', 'Articles', 'Books'].map((type) => {
            const typeReferences = references.filter(ref => ref.type === type);
            return (
              <TabsContent key={type} value={type.toLowerCase()}>
                {typeReferences.length > 0 && (
                  <Carousel className="w-full" opts={{ loop: false }}>
                    <CarouselContent>
                      {typeReferences.map((item, index) => (
                        <CarouselItem key={item.id} className="md:basis-1/3 lg:basis-1/3">
                          <Card className="p-4">
                            <div className="aspect-video relative mb-4 rounded-lg overflow-hidden">
                              <Image
                                src={item.imageUrl}
                                alt={item.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <h4 className="font-semibold mb-2 line-clamp-1">{item.title}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                          </Card>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {typeReferences.length > 3 && (
                      <>
                        <CarouselPrevious />
                        <CarouselNext />
                      </>
                    )}
                  </Carousel>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </div>
  )
}

