"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Header } from "@/components/header"
import { Sidebar } from "@/components/sidebar"
import { VideoCard } from "@/components/video-card"
import { PodcastCard } from "@/components/podcast-card"
import { DeckCard } from "@/components/deck-card"
import { ArticleCard } from "@/components/article-card"
import { BookCard } from "@/components/book-card"
import { FeedbackCategory } from "@/components/feedback-category"

export default function RecentFeedbackPage() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState("videos")
  const [portfolioData, setPortfolioData] = useState<{
    title: string
    description: string
    image: string
  } | null>(null)

  useEffect(() => {
    // Simulate loading data from session storage or API
    const storedPortfolioData = sessionStorage.getItem("portfolioData")
    const storedPortfolioImage = sessionStorage.getItem("portfolioImage")

    // Set default data if nothing is in storage
    setPortfolioData({
      title: storedPortfolioData || "The Commercial Filmmaking Trend Report 25",
      description:
        "Filmmaking Trend Report. 25 offers insights on current trends and highlights crucial information for filmmakers.",
      image: storedPortfolioImage || "https://picsum.photos/300/200?random=8",
    })

    // Trigger animations after component mounts
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)
  }, [])

  // Feedback categories data
  const feedbackCategories = [
    {
      title: "Visual Consistency",
      description:
        "Great use of color palette, but some slides have inconsistent typography. Try using a single font family to maintain consistency.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Content Clarity",
      description:
        "Your key points are strong, but consider reducing text in some slides for better readability. Using bullet points could help organize information.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Storytelling",
      description:
        "The narrative is compelling, but the flow between sections could be smoother. A clear transition slide between topics would help guide the viewer.",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      title: "Data Visualization",
      description:
        "Your charts and graphs are informative, but the labels could be clearer. Try increasing contrast and using more intuitive color coding.",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <Header feedbackPage={true} />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8 overflow-y-auto max-h-[calc(100vh-73px)]">
          <div className="max-w-6xl mx-auto">
            {/* Page Header */}
            <div
              className={`mb-8 transition-opacity duration-500 transform ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0.1s" }}
            >
              <h1 className="text-2xl font-bold mb-1">Your latest feedback is here!</h1>
              <p className="text-[#71717a]">
                We've reviewed your submission. Here's an overview of your presentation's performance and key areas for
                improvement.
              </p>
            </div>

            {/* File Preview Section */}
            {portfolioData && (
              <div
                className={`mb-8 transition-opacity duration-500 transform ${
                  isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
                style={{ transitionDelay: "0.2s" }}
              >
                <h2 className="text-xl font-bold mb-4">Your file</h2>
                <div className="flex bg-white rounded-lg overflow-hidden shadow-sm">
                  <div className="w-[280px] relative">
                    <Image
                      src={portfolioData.image || "/placeholder.svg"}
                      alt={portfolioData.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex items-end p-4">
                      <div className="text-white">
                        <div className="text-4xl font-light leading-tight">
                          Trend<span className="text-sm align-top">2025</span>
                        </div>
                        <div className="text-xl font-light leading-tight">Report</div>
                      </div>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-bold text-lg mb-2">{portfolioData.title}</h3>
                      <p className="text-sm text-[#71717a] leading-relaxed">{portfolioData.description}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-fit rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                    >
                      Download your file
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Overall Feedback Section */}
            <div
              className={`mb-8 transition-opacity duration-500 transform ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0.3s" }}
            >
              <h2 className="text-xl font-bold mb-2">Overall</h2>
              <p className="text-[#71717a] mb-6">Good views to grow your expertise.</p>

              {/* Feedback Categories Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {feedbackCategories.map((category, index) => (
                  <FeedbackCategory
                    key={category.title}
                    title={category.title}
                    description={category.description}
                    image={category.image}
                    delay={0.4 + index * 0.1}
                    className="reveal-item"
                  />
                ))}
              </div>
            </div>

            {/* References Section */}
            <div
              className={`mt-12 transition-opacity duration-500 transform ${
                isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{ transitionDelay: "0.5s" }}
            >
              <h2 className="text-xl font-bold mb-2">Here some references to inspire you!</h2>
              <p className="text-[#71717a] mb-6">Top picks for you. Updated daily.</p>

              <Tabs defaultValue="videos" value={activeTab} onValueChange={setActiveTab} className="mb-8">
                <TabsList className="bg-white border border-[#e4e4e7] p-1 rounded-md">
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

                {/* Videos Tab Content */}
                <TabsContent value="videos" className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Videos</h3>
                  <p className="text-[#71717a] mb-6">Good views to grow your expertise.</p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <VideoCard
                      image="/placeholder.svg?height=200&width=400"
                      title="How to tell a persuasive story"
                      description="Communications expert Kelly D. Parker shows how you can craft a compelling narrative to connect, persuade and drive meaningful action."
                      delay={0.6}
                      className="reveal-item"
                    />
                    <VideoCard
                      image="/placeholder.svg?height=200&width=400"
                      title="The Art of Storytelling and View Retention"
                      description="Colin & Samir join Marques and Andrew to discuss storytelling in YouTube and how telling stories can help keep people interested in tech videos."
                      delay={0.7}
                      className="reveal-item"
                    />
                    <VideoCard
                      image="/placeholder.svg?height=200&width=400"
                      title="Expertise in storytelling"
                      description="Why is Storytelling so powerful? And how do we use it in our advantage? Presentations expert David Jr Phillips shares key neurological findings on storytelling."
                      delay={0.8}
                      className="reveal-item"
                    />
                  </div>
                </TabsContent>

                {/* Podcasts Tab Content */}
                <TabsContent value="podcasts" className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Podcasts</h3>
                  <p className="text-[#71717a] mb-6">Your personal playlists.</p>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                    <PodcastCard
                      image="/placeholder.svg?height=150&width=150"
                      title="Thinking Components"
                      author="Lena Logic"
                      delay={0.6}
                      className="reveal-item"
                    />
                    <PodcastCard
                      image="/placeholder.svg?height=150&width=150"
                      title="Functional Fury"
                      author="Beth Binary"
                      delay={0.65}
                      className="reveal-item"
                    />
                    <PodcastCard
                      image="/placeholder.svg?height=150&width=150"
                      title="React Rendezvous"
                      author="Ethan Byte"
                      delay={0.7}
                      className="reveal-item"
                    />
                    <PodcastCard
                      image="/placeholder.svg?height=150&width=150"
                      title="Stateful Symphony"
                      author="Beth Binary"
                      delay={0.75}
                      className="reveal-item"
                    />
                    <PodcastCard
                      image="/placeholder.svg?height=150&width=150"
                      title="Async Awakenings"
                      author="Nina Netcode"
                      delay={0.8}
                      className="reveal-item"
                    />
                    <PodcastCard
                      image="/placeholder.svg?height=150&width=150"
                      title="The Art of Reusability"
                      author="Lena Logic"
                      delay={0.85}
                      className="reveal-item"
                    />
                  </div>
                </TabsContent>

                {/* Decks Tab Content */}
                <TabsContent value="decks" className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Decks</h3>
                  <p className="text-[#71717a] mb-6">Awesome references to level up your presentations.</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <DeckCard
                      image="/placeholder.svg?height=200&width=400"
                      title="Nike's Impact Report"
                      description="NIKE, Inc.'s FY22 Impact Report represents the ambition of the entire company to move the world forward through sport."
                      delay={0.6}
                      className="reveal-item"
                    />
                    <DeckCard
                      image="/placeholder.svg?height=200&width=400"
                      title="Zapion Design Studio's Agency Deck"
                      description="Zapion Design Studio's agency deck showcases the creative initiative led by the design enthusiasts at Code and Hue."
                      delay={0.7}
                      className="reveal-item"
                    />
                  </div>
                </TabsContent>

                {/* Articles Tab Content */}
                <TabsContent value="articles" className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Articles</h3>
                  <p className="text-[#71717a] mb-6">Amazing stories curated for you.</p>

                  <div className="space-y-6">
                    <ArticleCard
                      image="/placeholder.svg?height=100&width=100"
                      title="Let's create the work of tomorrow. Together."
                      description="A collaborative approach to design and development that brings together diverse perspectives."
                      delay={0.6}
                      className="reveal-item"
                    />
                    <ArticleCard
                      image="/placeholder.svg?height=100&width=100"
                      title="Office politics: the skill they never taught us"
                      description="As designers, we're often told to focus on the pixels, the layout, the user experience, and the user research—but what about the dynamics we face in the office?"
                      delay={0.7}
                      className="reveal-item"
                    />
                    <ArticleCard
                      image="/placeholder.svg?height=100&width=100"
                      title="Everything I know about UX I learned from my parents"
                      description="Communications expert Kelly D. Parker shows how you can craft a compelling narrative to connect, persuade, and drive meaningful action."
                      delay={0.8}
                      className="reveal-item"
                    />
                  </div>
                </TabsContent>

                {/* Books Tab Content */}
                <TabsContent value="books" className="mt-6">
                  <h3 className="text-lg font-semibold mb-2">Books</h3>
                  <p className="text-[#71717a] mb-6">Reading these can upgrade your game!</p>

                  <div className="grid grid-cols-2 md:grid-cols-6 gap-6">
                    <BookCard
                      image="/placeholder.svg?height=200&width=150"
                      title="Hooked"
                      author="Nir Eyal"
                      delay={0.6}
                      className="reveal-item"
                    />
                    <BookCard
                      image="/placeholder.svg?height=200&width=150"
                      title="Laws of UX"
                      author="Jon Yablonski"
                      delay={0.65}
                      className="reveal-item"
                    />
                    <BookCard
                      image="/placeholder.svg?height=200&width=150"
                      title="Beyond UX Design"
                      author="Jeremy Miller"
                      delay={0.7}
                      className="reveal-item"
                    />
                    <BookCard
                      image="/placeholder.svg?height=200&width=150"
                      title="The Design of Everyday Things"
                      author="Don Norman"
                      delay={0.75}
                      className="reveal-item"
                    />
                    <BookCard
                      image="/placeholder.svg?height=200&width=150"
                      title="Well Designed: How to Use Empathy"
                      author="Jon Kolko"
                      delay={0.8}
                      className="reveal-item"
                    />
                    <BookCard
                      image="/placeholder.svg?height=200&width=150"
                      title="The Graphic Design Bible"
                      author="Theo Inglis"
                      delay={0.85}
                      className="reveal-item"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

