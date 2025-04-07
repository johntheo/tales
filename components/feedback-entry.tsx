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
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

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
  type: string
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
  feedbackImage?: string
}

export function FeedbackEntry({ 
  fileName, 
  description, 
  metrics, 
  references,
  isLoaded = true, 
  delay = 0,
  feedbackImage
}: FeedbackEntryProps) {
  const [activeTab, setActiveTab] = useState<string>(references[0]?.type || 'Videos')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const [downloadModalOpen, setDownloadModalOpen] = useState(false)
  const [talkToProfessionalModalOpen, setTalkToProfessionalModalOpen] = useState(false)
  
  // Random image URLs for feedback thumbnails
  const randomImages = [
    "https://picsum.photos/400/300?random=1",
    "https://picsum.photos/400/300?random=2",
    "https://picsum.photos/400/300?random=3",
    "https://picsum.photos/400/300?random=4",
    "https://picsum.photos/400/300?random=5"
  ]
  
  // Get a random image URL or use the provided one
  const imageUrl = feedbackImage || randomImages[Math.floor(Math.random() * randomImages.length)]

  // Group references by type
  const groupedReferences = references.reduce((acc, ref) => {
    if (!acc[ref.type]) {
      acc[ref.type] = []
    }
    acc[ref.type].push(ref)
    return acc
  }, {} as Record<string, Reference[]>)

  // Get current references based on active tab
  const currentReferences = groupedReferences[activeTab] || []

  const updateScrollButtons = () => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 5) // 5px threshold
    }
  }

  useEffect(() => {
    updateScrollButtons()
  }, [currentReferences, activeTab])

  const handleScroll = () => {
    updateScrollButtons()
  }

  const handlePrevious = () => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth
      containerRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth
      containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const handleDownloadClick = () => {
    setDownloadModalOpen(true)
  }

  const handleTalkToProfessionalClick = () => {
    setTalkToProfessionalModalOpen(true)
  }

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header Section */}
      <div>
        <h1 className="text-xl md:text-2xl font-semibold mb-2">Your latest feedback is here!</h1>
        <p className="text-gray-600">We've reviewed your submission. Here's an overview of your presentation's performance and key areas for improvement.</p>
      </div>

      {/* File Preview Section */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row gap-4 md:gap-6">
          <div className="w-full md:w-48 h-48 bg-gray-200 rounded-lg overflow-hidden relative flex-shrink-0">
            <Image
              src={imageUrl}
              alt={fileName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-grow">
            <h2 className="text-lg md:text-xl font-semibold mb-2">{fileName}</h2>
            <p className="text-gray-600 mb-4 md:mb-6">{description}</p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                variant="outline" 
                className="w-full sm:w-auto"
                onClick={handleDownloadClick}
              >
                Download your file
              </Button>
              <Button 
                variant="default" 
                className="w-full sm:w-auto bg-black hover:bg-gray-800"
                onClick={handleTalkToProfessionalClick}
              >
                Talk to a professional
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overall Section */}
      <div>
        <h2 className="text-lg md:text-xl font-semibold mb-4">Overall</h2>
        <p className="text-gray-600 mb-6">Good views to grow your expertise.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 md:gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="p-4 md:p-6 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-6 md:w-8 h-6 md:h-8" dangerouslySetInnerHTML={{ __html: metric.icon }} />
                <h3 className="font-medium">{metric.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{metric.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* References Section */}
      <div className="space-y-6">
        <h2 className="text-xl md:text-2xl font-semibold">References</h2>
        
        {/* Tabs using shadcn implementation */}
        <div className="w-full">
          <Tabs defaultValue={references[0]?.type || 'Videos'} value={activeTab} onValueChange={setActiveTab}>
            <div className="overflow-auto md:overflow-visible">
              <TabsList className="inline-flex md:flex w-auto md:w-full h-10">
                {Object.keys(groupedReferences).map((type) => (
                  <TabsTrigger 
                    key={type} 
                    value={type}
                    className="flex-1"
                  >
                    {type}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {Object.keys(groupedReferences).map((type) => (
              <TabsContent key={type} value={type}>
                <div className="relative">
                  <div 
                    ref={containerRef}
                    onScroll={handleScroll}
                    className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory -mx-4 px-4 md:grid md:grid-cols-3 md:gap-6 md:overflow-x-visible md:pb-0 md:mx-0 md:px-0"
                  >
                    {groupedReferences[type]?.map((reference) => (
                      <a
                        key={reference.id}
                        href={reference.contentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-none w-[280px] sm:w-[320px] md:w-full group relative bg-card rounded-lg overflow-hidden border border-border transition-all duration-200 hover:shadow-lg hover:border-border/80 hover:-translate-y-0.5"
                      >
                        <div className="relative w-full aspect-[2/1] md:aspect-[4/3]">
                          <Image
                            src={reference.imageUrl}
                            alt={reference.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1 line-clamp-1 group-hover:text-primary transition-colors">{reference.title}</h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {reference.description}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                  {/* Navigation Arrows (only on desktop) */}
                  {currentReferences.length > 3 && (
                    <>
                      <button
                        onClick={handlePrevious}
                        className={`absolute -left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background border border-border shadow-lg transition-opacity hidden md:flex ${
                          canScrollLeft ? "opacity-100" : "opacity-0"
                        }`}
                        disabled={!canScrollLeft}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        onClick={handleNext}
                        className={`absolute -right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background border border-border shadow-lg transition-opacity hidden md:flex ${
                          canScrollRight ? "opacity-100" : "opacity-0"
                        }`}
                        disabled={!canScrollRight}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>

      {/* Download Modal */}
      <Dialog open={downloadModalOpen} onOpenChange={setDownloadModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>This feature will be available soon! Thank you for your interest.</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setDownloadModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Talk to Professional Modal */}
      <Dialog open={talkToProfessionalModalOpen} onOpenChange={setTalkToProfessionalModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Talk to a Professional</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p>We will contact you by email with more details. Thank you for your interest!</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setTalkToProfessionalModalOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

