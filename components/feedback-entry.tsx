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
}

export function FeedbackEntry({ 
  fileName, 
  description, 
  metrics, 
  references,
  isLoaded = true, 
  delay = 0 
}: FeedbackEntryProps) {
  const [activeTab, setActiveTab] = useState<string>(references[0]?.type || 'Videos')
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

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
              src="/placeholder.svg"
              alt={fileName}
              fill
              className="object-cover"
            />
          </div>

          <div className="flex-grow">
            <h2 className="text-lg md:text-xl font-semibold mb-2">{fileName}</h2>
            <p className="text-gray-600 mb-4 md:mb-6">{description}</p>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline" className="w-full sm:w-auto">Download your file</Button>
              <Button variant="default" className="w-full sm:w-auto bg-black hover:bg-gray-800">
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
        
        {/* Tabs Container with Horizontal Scroll */}
        <div className="w-full overflow-x-auto pb-2 -mb-2">
          <div className="flex min-w-fit bg-muted rounded-lg p-1">
            {Object.keys(groupedReferences).map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-4 py-2 rounded-md text-sm font-medium whitespace-nowrap transition-colors ${
                  activeTab === type
                    ? "bg-background shadow-sm"
                    : "hover:bg-background/50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* References Grid with Horizontal Scroll on Mobile */}
        <div className="relative">
          <div 
            ref={containerRef}
            onScroll={handleScroll}
            className="flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory -mx-4 px-4 md:pl-0 md:grid md:grid-cols-3 md:overflow-x-visible md:pb-0 md:mx-0 md:px-0"
          >
            {currentReferences.map((reference, index) => (
              <a
                key={reference.id}
                href={reference.contentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-none w-[280px] sm:w-[320px] md:w-full group relative bg-card rounded-lg overflow-hidden border border-border transition-transform hover:scale-[1.02] snap-start"
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
                  <h3 className="font-medium mb-1 line-clamp-1">{reference.title}</h3>
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
      </div>
    </div>
  )
}

