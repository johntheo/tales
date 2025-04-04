"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { VideoCard } from "@/components/video-card"
import { PodcastCard } from "@/components/podcast-card"
import { DeckCard } from "@/components/deck-card"
import { ArticleCard } from "@/components/article-card"
import { BookCard } from "@/components/book-card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

export default function DashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasFeedback, setHasFeedback] = useState(false)
  const [isPeeling, setIsPeeling] = useState(false)
  const [dragPosition, setDragPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [cardWidth, setCardWidth] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [feedbackImage, setFeedbackImage] = useState("")
  const [isPeeled, setIsPeeled] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Check if user has feedback
  useEffect(() => {
    // Simulate loading data from session storage or API
    const storedPortfolioData = sessionStorage.getItem("portfolioData")
    const storedPortfolioImage = sessionStorage.getItem("portfolioImage")
    const feedbackPeeled = sessionStorage.getItem("feedbackPeeled") === "true"

    if (storedPortfolioData) {
      setFeedbackImage(
        storedPortfolioImage ||
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-BODWPsrnGqynDDYQo7WAnZjkWgbxty.png",
      )
      setHasFeedback(true)
      setIsPeeled(feedbackPeeled)
    }

    // Get card width for drag limit calculation
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth)
    }

    // Handle window resize
    const handleResize = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth)
      }
    }

    window.addEventListener("resize", handleResize)

    // Trigger fade-in effect
    setTimeout(() => {
      setIsVisible(true)
      setIsLoaded(true)
    }, 100)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Add reveal animation to child elements
  useEffect(() => {
    if (!isLoaded) return

    const revealElements = document.querySelectorAll(".reveal-item")
    revealElements.forEach((el, index) => {
      setTimeout(
        () => {
          el.classList.add("revealed")
        },
        100 + index * 80,
      ) // Staggered delay for each element
    })
  }, [isLoaded])

  // Peel functionality
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true)
    // Prevent default behavior for touch events
    if (e.type === "touchstart") {
      e.preventDefault()
    }
  }

  // Update the peel effect to match the video exactly
  const handleDragMove = (clientX: number) => {
    if (!isDragging || !cardRef.current) return

    // Get card position
    const cardRect = cardRef.current.getBoundingClientRect()

    // Calculate drag position relative to card
    const newPosition = Math.max(0, Math.min(clientX - cardRect.left - 25, cardWidth - 50))
    setDragPosition(newPosition)

    // If dragged to the end, trigger peel effect and navigate to dashboard page
    if (newPosition >= cardWidth - 60) {
      setIsPeeling(true)
      setIsVisible(false)

      // Set the feedback as peeled in session storage
      sessionStorage.setItem("feedbackPeeled", "true")

      // Dispatch a storage event to notify other components
      window.dispatchEvent(new Event("storage"))

      setTimeout(() => {
        setIsPeeled(true)
        setHasFeedback(false) // Remove the peel card
      }, 500)
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault()
      handleDragMove(e.clientX)
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) {
      handleDragMove(e.touches[0].clientX)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)
    // If not dragged to the end, reset position
    if (dragPosition < cardWidth - 60) {
      setDragPosition(0)
    }
  }

  if (hasFeedback && !isPeeled) {
    return (
      <div className="min-h-screen bg-[#fafafa]">
        <Header dashboardPage={true} />
        <div className="flex">
          <Sidebar />
          <main
            className="flex-1 p-8 flex flex-col items-center justify-center"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            onMouseUp={handleDragEnd}
            onTouchEnd={handleDragEnd}
            onMouseLeave={handleDragEnd}
          >
            <div className="max-w-3xl w-full text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Time to unlock your first feedback</h1>
              <p className="text-[#71717a]">Peel your feedback letter below and start creating your masterpiece</p>
            </div>

            <div
              className={`transition-all duration-500 ease-in-out ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              } ${isPeeling ? "opacity-0 scale-110" : ""}`}
            >
              {/* Card with plastic wrap effect */}
              <div
                ref={cardRef}
                className="relative rounded-2xl overflow-hidden shadow-lg"
                style={{
                  width: "450px",
                  height: "260px",
                }}
              >
                {/* Background image */}
                <div className="absolute inset-0 bg-[#a8a4c5] p-0 m-0 overflow-hidden">
                  <Image
                    src={feedbackImage || "/placeholder.svg"}
                    alt="Presentation slide"
                    fill
                    sizes="450px"
                    className="object-cover"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectPosition: "center",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    }}
                    priority
                  />
                </div>

                {/* Plastic wrap overlay with scratch lines */}
                <div className="plastic-wrap">
                  {isDragging && dragPosition > 0 && (
                    <div
                      className="absolute inset-y-0 left-0 bg-white/10"
                      style={{
                        width: `${dragPosition + 12}px`,
                        transition: "width 0.1s ease-out",
                      }}
                    />
                  )}
                </div>

                {/* Peel instruction strip */}
                <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 bg-white py-3 text-center text-[#09090b] font-medium flex items-center peel-strip">
                  {/* Update the drag handle to make it more visible and match the video */}
                  <div
                    className="absolute left-0 w-12 h-12 bg-[#dc2626] flex items-center justify-center text-white drag-handle rounded-none cursor-grab active:cursor-grabbing"
                    style={{
                      left: `${dragPosition}px`,
                      transition: isDragging ? "none" : "left 0.3s ease-out",
                    }}
                    onMouseDown={handleDragStart}
                    onTouchStart={handleDragStart}
                  >
                    <ArrowRight size={20} />
                  </div>
                  <span className="w-full text-center">Peel to unlock your feedback</span>
                </div>
              </div>
            </div>
          </main>
        </div>

        <style jsx global>{`
          @keyframes shimmer {
            0% {
              background-position: -400px 0;
            }
            100% {
              background-position: 400px 0;
            }
          }

          .plastic-wrap {
            position: absolute;
            inset: 0;
            pointer-events: none;
            background-image: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.4) 10%, transparent 20%),
              linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.4) 30%, transparent 40%),
              linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.4) 50%, transparent 60%),
              linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.4) 70%, transparent 80%);
            background-size: 400px 400px;
            animation: shimmer 10s linear infinite;
            z-index: 10;
            overflow: hidden;
          }

          .drag-handle {
            cursor: grab;
            transition: transform 0.2s ease;
            z-index: 30;
            user-select: none;
            touch-action: none;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          }

          .drag-handle:active {
            cursor: grabbing;
            transform: scale(1.05);
          }

          .peel-strip {
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
            z-index: 20;
          }
        `}</style>
      </div>
    )
  }

  // Regular dashboard content after peeling
  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header dashboardPage={true} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-73px)] relative">
          <div className="max-w-6xl mx-auto">
            <div
              className={`mb-8 transition-opacity duration-500 transform ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0.1s" }}
            >
              <h1 className="text-2xl font-bold mb-1">Here some references to inspire you!</h1>
              <p className="text-[#71717a]">Top picks for you. Updated daily.</p>
            </div>

            <Tabs
              defaultValue="all"
              value={activeTab}
              onValueChange={setActiveTab}
              className={`mb-8 transition-opacity duration-500 transform ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0.2s" }}
            >
              <TabsList className="bg-white border border-[#e4e4e7] p-1 rounded-md">
                <TabsTrigger
                  value="all"
                  className="rounded-md data-[state=active]:bg-[#f4f4f5] data-[state=active]:shadow-none"
                >
                  All
                </TabsTrigger>
                <TabsTrigger
                  value="videos"
                  className="rounded-md data-[state=active]:bg-[#f4f4f5] data-[state=active]:shadow-none"
                >
                  Videos
                </TabsTrigger>
                <TabsTrigger
                  value="podcasts"
                  className="rounded-md data-[state=active]:bg-[#f4f4f5] data-[state=active]:shadow-none"
                >
                  Podcasts
                </TabsTrigger>
                <TabsTrigger
                  value="decks"
                  className="rounded-md data-[state=active]:bg-[#f4f4f5] data-[state=active]:shadow-none"
                >
                  Decks
                </TabsTrigger>
                <TabsTrigger
                  value="articles"
                  className="rounded-md data-[state=active]:bg-[#f4f4f5] data-[state=active]:shadow-none"
                >
                  Articles
                </TabsTrigger>
                <TabsTrigger
                  value="books"
                  className="rounded-md data-[state=active]:bg-[#f4f4f5] data-[state=active]:shadow-none"
                >
                  Books
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-6">
                {/* Videos Section */}
                <div
                  className={`transition-all duration-500 transform ${
                    isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                  }`}
                  style={{ transitionDelay: "0.3s" }}
                >
                  <h2 className="text-xl font-semibold mb-2">Videos</h2>
                  <p className="text-[#71717a] mb-6">Good ways to grow your expertise.</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      "The Art of Persuasive Storytelling",
                      "The Art of Storytelling and View Retention",
                      "Expertise in storytelling",
                    ].map((title, idx) => (
                      <VideoCard
                        key={title}
                        image="/placeholder.svg?height=200&width=400"
                        title={title}
                        description="Communications expert Kelly D. Parker shows how you can craft a compelling narrative to connect, persuade and drive meaningful action."
                        delay={0.4 + idx * 0.1}
                        className="reveal-item"
                      />
                    ))}
                  </div>
                </div>

                {/* Podcasts Section */}
                <div
                  className={`mt-12 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: "0.7s" }}
                >
                  <h2 className="text-xl font-semibold mb-2">Podcasts</h2>
                  <p className="text-[#71717a] mb-6">Your personal playlists.</p>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                    <PodcastCard
                      image="/placeholder.svg?height=150&width=150"
                      title="Thinking Components"
                      author="Lena Logic"
                      delay={0.8}
                      className="reveal-item"
                    />
                    <PodcastCard
                      image="/placeholder.svg?height=150&width=150"
                      title="Functional Fury"
                      author="Beth Binary"
                      delay={0.85}
                      className="reveal-item"
                    />
                    <PodcastCard
                      image="/placeholder.svg?height=150&width=150"
                      title="React Rendezvous"
                      author="Ethan Byte"
                      delay={0.9}
                      className="reveal-item"
                    />
                    <PodcastCard
                      image="/placeholder.svg?height=150&width=150"
                      title="Stateful Symphony"
                      author="Beth Binary"
                      delay={0.95}
                      className="reveal-item"
                    />
                    <PodcastCard
                      image="/placeholder.svg?height=150&width=150"
                      title="Async Awakenings"
                      author="Nina Netcode"
                      delay={1.0}
                      className="reveal-item"
                    />
                    <PodcastCard
                      image="/placeholder.svg?height=150&width=150"
                      title="The Art of Reusability"
                      author="Lena Logic"
                      delay={1.05}
                      className="reveal-item"
                    />
                  </div>
                </div>

                {/* Decks Section */}
                <div
                  className={`mt-12 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: "1.1s" }}
                >
                  <h2 className="text-xl font-semibold mb-2">Decks</h2>
                  <p className="text-[#71717a] mb-6">Awesome references to level up your presentations.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DeckCard
                      image="/placeholder.svg?height=200&width=400"
                      title="Nike's Impact Report"
                      description="NIKE, Inc.'s FY22 Impact Report represents the ambition of the entire company to move the world forward through sport."
                      delay={1.2}
                      className="reveal-item"
                    />
                    <DeckCard
                      image="/placeholder.svg?height=200&width=400"
                      title="Zapion Design Studio's Agency Deck"
                      description="Zapion Design Studio's agency deck showcases the creative initiative led by the design enthusiasts at Code and Hue."
                      delay={1.3}
                      className="reveal-item"
                    />
                  </div>
                </div>

                {/* Articles Section */}
                <div
                  className={`mt-12 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: "1.4s" }}
                >
                  <h2 className="text-xl font-semibold mb-2">Articles</h2>
                  <p className="text-[#71717a] mb-6">Amazing stories curated for you.</p>

                  <div className="space-y-6">
                    <ArticleCard
                      image="/placeholder.svg?height=100&width=100"
                      title="Let's create the work of tomorrow. Together."
                      description="A collaborative approach to design and development that brings together diverse perspectives."
                      delay={1.5}
                      className="reveal-item"
                    />
                    <ArticleCard
                      image="/placeholder.svg?height=100&width=100"
                      title="Office politics: the skill they never taught us"
                      description="As designers, we're often told to focus on the pixels, the layout, the user experience, and the user research—but what about the dynamics we face in the office?"
                      delay={1.6}
                      className="reveal-item"
                    />
                    <ArticleCard
                      image="/placeholder.svg?height=100&width=100"
                      title="Everything I know about UX I learned from my parents"
                      description="Communications expert Kelly D. Parker shows how you can craft a compelling narrative to connect, persuade, and drive meaningful action."
                      delay={1.7}
                      className="reveal-item"
                    />
                  </div>
                </div>

                {/* Books Section */}
                <div
                  className={`mt-12 transition-opacity duration-500 ${isLoaded ? "opacity-100" : "opacity-0"}`}
                  style={{ transitionDelay: "1.8s" }}
                >
                  <h2 className="text-xl font-semibold mb-2">Books</h2>
                  <p className="text-[#71717a] mb-6">Reading these can upgrade your game!</p>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                    <BookCard
                      image="/placeholder.svg?height=200&width=150"
                      title="Hooked"
                      author="Nir Eyal"
                      delay={1.9}
                      className="reveal-item"
                    />
                    <BookCard
                      image="/placeholder.svg?height=200&width=150"
                      title="Laws of UX"
                      author="Jon Yablonski"
                      delay={1.95}
                      className="reveal-item"
                    />
                    <BookCard
                      image="/placeholder.svg?height=200&width=150"
                      title="Beyond UX Design"
                      author="Jeremy Miller"
                      delay={2.0}
                      className="reveal-item"
                    />
                    <BookCard
                      image="/placeholder.svg?height=200&width=150"
                      title="The Design of Everyday Things"
                      author="Don Norman"
                      delay={2.05}
                      className="reveal-item"
                    />
                    <BookCard
                      image="/placeholder.svg?height=200&width=150"
                      title="Well Designed: How to Use Empathy"
                      author="Jon Kolko"
                      delay={2.1}
                      className="reveal-item"
                    />
                    <BookCard
                      image="/placeholder.svg?height=200&width=150"
                      title="The Graphic Design Bible"
                      author="Theo Inglis"
                      delay={2.15}
                      className="reveal-item"
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Individual tab contents for each category */}
              <TabsContent value="videos" className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Videos</h2>
                <p className="text-[#71717a] mb-6">Good ways to grow your expertise.</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    "The Art of Persuasive Storytelling",
                    "The Art of Storytelling and View Retention",
                    "Expertise in storytelling",
                  ].map((title, idx) => (
                    <VideoCard
                      key={title}
                      image="/placeholder.svg?height=200&width=400"
                      title={title}
                      description="Communications expert Kelly D. Parker shows how you can craft a compelling narrative to connect, persuade and drive meaningful action."
                      delay={0.3 + idx * 0.1}
                      className="reveal-item"
                    />
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="podcasts" className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Podcasts</h2>
                <p className="text-[#71717a] mb-6">Your personal playlists.</p>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                  <PodcastCard
                    image="/placeholder.svg?height=150&width=150"
                    title="Thinking Components"
                    author="Lena Logic"
                    delay={0.3}
                    className="reveal-item"
                  />
                  <PodcastCard
                    image="/placeholder.svg?height=150&width=150"
                    title="Functional Fury"
                    author="Beth Binary"
                    delay={0.35}
                    className="reveal-item"
                  />
                  <PodcastCard
                    image="/placeholder.svg?height=150&width=150"
                    title="React Rendezvous"
                    author="Ethan Byte"
                    delay={0.4}
                    className="reveal-item"
                  />
                  <PodcastCard
                    image="/placeholder.svg?height=150&width=150"
                    title="Stateful Symphony"
                    author="Beth Binary"
                    delay={0.45}
                    className="reveal-item"
                  />
                  <PodcastCard
                    image="/placeholder.svg?height=150&width=150"
                    title="Async Awakenings"
                    author="Nina Netcode"
                    delay={0.5}
                    className="reveal-item"
                  />
                  <PodcastCard
                    image="/placeholder.svg?height=150&width=150"
                    title="The Art of Reusability"
                    author="Lena Logic"
                    delay={0.55}
                    className="reveal-item"
                  />
                </div>
              </TabsContent>

              <TabsContent value="decks" className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Decks</h2>
                <p className="text-[#71717a] mb-6">Awesome references to level up your presentations.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DeckCard
                    image="/placeholder.svg?height=200&width=400"
                    title="Nike's Impact Report"
                    description="NIKE, Inc.'s FY22 Impact Report represents the ambition of the entire company to move the world forward through sport."
                    delay={0.3}
                    className="reveal-item"
                  />
                  <DeckCard
                    image="/placeholder.svg?height=200&width=400"
                    title="Zapion Design Studio's Agency Deck"
                    description="Zapion Design Studio's agency deck showcases the creative initiative led by the design enthusiasts at Code and Hue."
                    delay={0.4}
                    className="reveal-item"
                  />
                </div>
              </TabsContent>

              <TabsContent value="articles" className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Articles</h2>
                <p className="text-[#71717a] mb-6">Amazing stories curated for you.</p>

                <div className="space-y-6">
                  <ArticleCard
                    image="/placeholder.svg?height=100&width=100"
                    title="Let's create the work of tomorrow. Together."
                    description="A collaborative approach to design and development that brings together diverse perspectives."
                    delay={0.3}
                    className="reveal-item"
                  />
                  <ArticleCard
                    image="/placeholder.svg?height=100&width=100"
                    title="Office politics: the skill they never taught us"
                    description="As designers, we're often told to focus on the pixels, the layout, the user experience, and the user research—but what about the dynamics we face in the office?"
                    delay={0.4}
                    className="reveal-item"
                  />
                  <ArticleCard
                    image="/placeholder.svg?height=100&width=100"
                    title="Everything I know about UX I learned from my parents"
                    description="Communications expert Kelly D. Parker shows how you can craft a compelling narrative to connect, persuade, and drive meaningful action."
                    delay={0.5}
                    className="reveal-item"
                  />
                </div>
              </TabsContent>

              <TabsContent value="books" className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Books</h2>
                <p className="text-[#71717a] mb-6">Reading these can upgrade your game!</p>

                <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                  <BookCard
                    image="/placeholder.svg?height=200&width=150"
                    title="Hooked"
                    author="Nir Eyal"
                    delay={0.3}
                    className="reveal-item"
                  />
                  <BookCard
                    image="/placeholder.svg?height=200&width=150"
                    title="Laws of UX"
                    author="Jon Yablonski"
                    delay={0.35}
                    className="reveal-item"
                  />
                  <BookCard
                    image="/placeholder.svg?height=200&width=150"
                    title="Beyond UX Design"
                    author="Jeremy Miller"
                    delay={0.4}
                    className="reveal-item"
                  />
                  <BookCard
                    image="/placeholder.svg?height=200&width=150"
                    title="The Design of Everyday Things"
                    author="Don Norman"
                    delay={0.45}
                    className="reveal-item"
                  />
                  <BookCard
                    image="/placeholder.svg?height=200&width=150"
                    title="Well Designed: How to Use Empathy"
                    author="Jon Kolko"
                    delay={0.5}
                    className="reveal-item"
                  />
                  <BookCard
                    image="/placeholder.svg?height=200&width=150"
                    title="The Graphic Design Bible"
                    author="Theo Inglis"
                    delay={0.55}
                    className="reveal-item"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  )
}

