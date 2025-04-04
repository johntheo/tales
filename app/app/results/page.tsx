"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

// Array of possible improvement areas
const improvementAreas = [
  {
    title: "Content Clarity",
    description:
      "Some parts of your presentation could benefit from clearer and more concise text. Focus on simplifying complex ideas and using more straightforward language.",
  },
  {
    title: "Visual Consistency",
    description:
      "Use uniform fonts, colors, and layouts to enhance readability and professional appearance. Maintain a consistent style throughout your presentation.",
  },
  {
    title: "Narrative Flow",
    description:
      "Improve the flow between sections to create a more cohesive story. Consider using transitional elements to guide the viewer through your content.",
  },
  {
    title: "Visual Hierarchy",
    description:
      "Establish a clearer visual hierarchy to guide the viewer's attention to the most important elements first. Use size, color, and positioning effectively.",
  },
  {
    title: "Data Visualization",
    description:
      "Enhance your data visualizations to make complex information more accessible. Consider using charts, graphs, or infographics where appropriate.",
  },
  {
    title: "Typography",
    description:
      "Improve your typography choices to enhance readability and visual appeal. Consider font pairings, sizes, and spacing for optimal legibility.",
  },
]

// Sample content for different tabs
const tabContent = {
  Videos: [
    {
      title: "The Art of Persuasive Storytelling | Kelly D. Parker | TED",
      description:
        "Communications expert Kelly D. Parker shows how you can craft a compelling narrative to connect, persuade and drive meaningful action.",
      duration: "12:37",
    },
    {
      title: "The Art of Storytelling and View Retention",
      description:
        "Colin & Samir join Marques and Andrew to discuss storytelling in YouTube and how telling stories can help keep people interested in tech videos.",
      duration: "18:15",
    },
  ],
  Articles: [
    {
      title: "The Power of Visual Storytelling in UX Design",
      description: "Explore how visual elements can enhance user experience and convey complex ideas effectively.",
      readTime: "5 min read",
    },
    {
      title: "Crafting Compelling Case Studies: A Step-by-Step Guide",
      description:
        "Learn how to structure and write case studies that showcase your problem-solving skills and project outcomes.",
      readTime: "8 min read",
    },
  ],
  Decks: [
    {
      title: "Effective Presentation Design Principles",
      description: "A comprehensive guide to creating visually appealing and impactful presentation decks.",
      slides: "32 slides",
    },
    {
      title: "Data Visualization Best Practices",
      description: "Learn how to present complex data in clear, engaging, and meaningful ways.",
      slides: "45 slides",
    },
  ],
  Podcasts: [
    {
      title: "Design Matters with Debbie Millman",
      description:
        "Conversations with designers, writers, artists, and other creative professionals about their work and processes.",
      duration: "45:00",
    },
    {
      title: "The Futur with Chris Do",
      description: "Insights on design, business, and personal growth for creative professionals.",
      duration: "60:00",
    },
  ],
  Books: [
    {
      title: "Don't Make Me Think, Revisited: A Common Sense Approach to Web Usability",
      author: "Steve Krug",
      description: "A guide to creating intuitive navigation and information design for better user experiences.",
    },
    {
      title: "The Design of Everyday Things",
      author: "Don Norman",
      description: "A powerful primer on how design serves as the communication between object and user.",
    },
  ],
}

// Sample images from the home page
const sampleImages = [
  "https://picsum.photos/300/200?random=1",
  "https://picsum.photos/300/200?random=2",
  "https://picsum.photos/300/200?random=3",
  "https://picsum.photos/300/200?random=4",
  "https://picsum.photos/300/200?random=5",
  "https://picsum.photos/300/200?random=6",
  "https://picsum.photos/300/200?random=7",
]

export default function ResultsPage() {
  const [feedback, setFeedback] = useState({
    score: 0,
    overview: "",
    improvementAreas: [],
    detailedFeedback: "",
  })
  const [activeTab, setActiveTab] = useState("Videos")
  const [portfolioUrl, setPortfolioUrl] = useState("")
  const [portfolioImage, setPortfolioImage] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)

  const mainRef = useRef<HTMLElement>(null)

  useEffect(() => {
    // Scroll to top of the page
    window.scrollTo(0, 0)

    // Generate random feedback
    const generateRandomFeedback = () => {
      const score = (Math.random() * 1.4 + 3.5).toFixed(1)
      const shuffled = [...improvementAreas].sort(() => 0.5 - Math.random())
      const selectedAreas = shuffled.slice(0, 2)

      return {
        score: Number.parseFloat(score),
        overview:
          "We've reviewed your submission. Here's an overview of your presentation's performance and key areas for improvement.",
        improvementAreas: selectedAreas,
        detailedFeedback:
          "Your portfolio demonstrates strong visual design elements and a good understanding of user experience principles. The layout is intuitive and the color scheme is cohesive throughout. However, there are opportunities to improve the narrative flow and content organization. Consider restructuring some sections to create a more compelling story about your work process and outcomes. The technical implementation is solid, but adding more details about the challenges you faced and how you overcame them would strengthen your case studies.",
      }
    }

    setFeedback(generateRandomFeedback())

    // Retrieve the portfolio data from sessionStorage
    const storedPortfolioData = sessionStorage.getItem("portfolioData")
    setPortfolioUrl(storedPortfolioData || "Your Portfolio")

    // Set the portfolio image
    const storedPortfolioImage = sessionStorage.getItem("portfolioImage")
    setPortfolioImage(storedPortfolioImage || "/placeholder.svg")

    // Trigger the reveal effect after a short delay
    setTimeout(() => {
      setIsLoaded(true)
    }, 100)

    // Add intersection observer for reveal effect
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    if (mainRef.current) {
      const revealElements = mainRef.current.querySelectorAll(".reveal")
      revealElements.forEach((el) => observer.observe(el))
    }

    return () => {
      if (mainRef.current) {
        const revealElements = mainRef.current.querySelectorAll(".reveal")
        revealElements.forEach((el) => observer.unobserve(el))
      }
    }
  }, [])

  const getRandomImage = () => {
    return sampleImages[Math.floor(Math.random() * sampleImages.length)]
  }

  const getYouTubeSearchUrl = (title: string) => {
    const encodedTitle = encodeURIComponent(title)
    return `https://www.youtube.com/results?search_query=${encodedTitle}`
  }

  return (
    <main ref={mainRef} className={`min-h-screen bg-[#e8e8e8] pt-8 ${isLoaded ? "loaded" : ""}`}>
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-out, transform 0.5s ease-out;
        }
        .reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .loaded .reveal {
          transition-delay: 0.2s;
        }
      `}</style>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Left content - 2/3 width */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold mb-4 text-[#191919] reveal">Your Feedback is Ready!</h1>
            <p className="text-base mb-2 text-[#191919] reveal">{feedback.overview}</p>
            <p className="text-base mb-8 text-[#191919] reveal">
              Your presentation scored an overall rating of <span className="font-bold">{feedback.score} out of 5</span>
              . This score reflects the quality of your content, design, and storytelling. These are the two top areas
              of improvement:
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12 reveal">
              {feedback.improvementAreas.map((area, index) => (
                <div key={index} className="bg-[#ffffff] rounded-lg shadow-md overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={getRandomImage() || "/placeholder.svg"}
                      alt={area.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 text-[#191919]">{area.title}</h3>
                    <p className="text-sm text-[#191919]">{area.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-6 text-[#191919] reveal">Here are some references to inspire you!</h2>

            <div className="mb-8 reveal">
              <div className="flex space-x-4 mb-6 overflow-x-auto pb-2">
                {Object.keys(tabContent).map((tab) => (
                  <button
                    key={tab}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-[#191919] text-[#ffffff]"
                        : "bg-[#ffffff] text-[#191919] hover:bg-gray-200"
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {tabContent[activeTab].map((item, index) => (
                  <Link key={index} href={getYouTubeSearchUrl(item.title)} target="_blank" rel="noopener noreferrer">
                    <div className="bg-[#ffffff] rounded-lg overflow-hidden shadow-md transition-transform duration-300 ease-in-out hover:scale-105 cursor-pointer reveal">
                      <div className="relative h-48">
                        <Image
                          src={getRandomImage() || "/placeholder.svg"}
                          alt={item.title}
                          layout="fill"
                          objectFit="cover"
                        />
                        {item.duration && (
                          <div className="absolute bottom-2 right-2 bg-[#191919] text-[#ffffff] text-xs px-2 py-1 rounded">
                            {item.duration}
                          </div>
                        )}
                        {item.readTime && (
                          <div className="absolute bottom-2 right-2 bg-[#191919] text-[#ffffff] text-xs px-2 py-1 rounded">
                            {item.readTime}
                          </div>
                        )}
                        {item.slides && (
                          <div className="absolute bottom-2 right-2 bg-[#191919] text-[#ffffff] text-xs px-2 py-1 rounded">
                            {item.slides}
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h3 className="font-bold mb-2 text-lg text-[#191919]">{item.title}</h3>
                        <p className="text-sm text-[#a5a3a3]">{item.description}</p>
                        {item.author && <p className="text-sm text-[#191919] mt-2">By {item.author}</p>}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar - 1/3 width, sticky */}
          <div className="md:sticky md:top-6 self-start">
            <div className="bg-[#ffffff] rounded-lg overflow-hidden shadow-md mb-8 reveal">
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#191919]">{portfolioUrl}</h3>
              </div>
              <div className="relative aspect-video w-full">
                <Image src={portfolioImage || "/placeholder.svg"} alt={portfolioUrl} fill className="object-cover" />
              </div>
            </div>

            <div className="space-y-4 reveal">
              <Link href="/recent-feedback" className="block">
                <Button variant="default" size="lg" className="w-full">
                  View Detailed Feedback
                </Button>
              </Link>

              <Link href="/app/upload" className="block">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full border border-input bg-background hover:bg-accent hover:text-accent-foreground"
                >
                  Try Again
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

