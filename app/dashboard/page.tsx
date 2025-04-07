"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, Upload, Settings, LogOut, Trash2, X, Home, User } from "lucide-react"
import { UploadForm } from "@/components/upload-form"
import { FeedbackEntry } from "@/components/feedback-entry"
import { FeedbackProcessing } from "@/components/feedback-processing"
import PeelCard from "@/components/peel-component"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "../../hooks/use-media-query"

interface FeedbackItem {
  id: string
  title: string
  date: Date
  status: 'pending' | 'processing' | 'ready'
  imageUrl?: string
  formData?: {
    link?: string
    file?: File
  }
  metrics?: Array<{
    id: string
    title: string
    icon: string
    feedback: string
  }>
  references?: Array<{
    id: string
    title: string
    description: string
    imageUrl: string
    contentUrl: string
    type: 'Videos' | 'Podcasts' | 'Decks' | 'Articles' | 'Books'
  }>
}
export default function DashboardPage() {
  const router = useRouter()
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [showPeelCard, setShowPeelCard] = useState(false)
  const [showNewFeedback, setShowNewFeedback] = useState(false)
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([])
  const [currentFeedback, setCurrentFeedback] = useState<FeedbackItem | null>(null)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const isMobile = useMediaQuery("(max-width: 768px)")

  const createNewFeedback = () => {
    // Check if there's already a pending feedback
    const pendingFeedback = feedbacks.find(f => f.status === 'pending')
    
    if (pendingFeedback) {
      // Focus on the existing pending feedback
      setCurrentFeedback(pendingFeedback)
      setShowNewFeedback(false)
      setIsUploadModalOpen(true)
      return
    }

    const newFeedback: FeedbackItem = {
      id: Date.now().toString(),
      title: "New Feedback",
      date: new Date(),
      status: 'pending'
    }
    
    setFeedbacks(prev => [newFeedback, ...prev])
    setCurrentFeedback(newFeedback)
    setShowNewFeedback(false)
    setIsUploadModalOpen(true)
  }

  const handleFileUpload = async (data: { link?: string; file?: File }) => {
    if (!currentFeedback) return
    
    // Save form data before processing
    const updatedFeedback = {
      ...currentFeedback,
      formData: data,
      status: 'processing' as const,
      title: data.file?.name || data.link || "Presentation Feedback"
    }

    setFeedbacks(prev => prev.map(f => 
      f.id === currentFeedback.id ? updatedFeedback : f
    ))
    setCurrentFeedback(updatedFeedback)
    
    setIsUploadModalOpen(false)
    setIsProcessing(true)

    // Simulate API processing
    await new Promise(resolve => setTimeout(resolve, 3000))

    const processedFeedback: FeedbackItem = {
      ...updatedFeedback,
      status: 'ready',
      imageUrl: "https://picsum.photos/400/300?random=1",
      metrics: [
        { 
          id: "visual-consistency",
          title: "Visual Consistency",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <path d="M8 12h8M12 8v8" strokeWidth="2" strokeLinecap="round"/>
          </svg>`,
          feedback: "Great use of color palette, but some slides have inconsistent typography. Try using a single font family to maintain consistency."
        },
        {
          id: "content-clarity",
          title: "Content Clarity",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 6h16M4 12h16M4 18h16" strokeWidth="2" strokeLinecap="round"/>
          </svg>`,
          feedback: "Your key points are strong, but consider reducing text in some slides for better readability. Using bullet points could help organize information."
        },
        {
          id: "storytelling",
          title: "Storytelling",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" strokeWidth="2"/>
            <path d="M12 6v6l4 2" strokeWidth="2" strokeLinecap="round"/>
          </svg>`,
          feedback: "The narrative is compelling, but the flow between sections could be smoother. A clear transition slide between topics would help guide the viewer."
        },
        {
          id: "data-visualization",
          title: "Data Visualization",
          icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M4 4v16h16M16 8v8M12 12v4M8 16v0" strokeWidth="2" strokeLinecap="round"/>
          </svg>`,
          feedback: "Your charts and graphs are informative, but the labels could be clearer. Try increasing contrast and using more intuitive color coding."
        }
      ],
      references: [
        // Videos
        { 
          id: "video-storytelling", 
          title: "The Art of Visual Storytelling", 
          description: "Christopher Nolan breaks down his approach to visual narrative and how he crafts memorable scenes.", 
          imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://www.youtube.com/watch?v=example1",
          type: "Videos"
        },
        { 
          id: "video-cinematography", 
          title: "Mastering Cinematic Lighting", 
          description: "Roger Deakins shares his lighting techniques and how to create mood through cinematography.", 
          imageUrl: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://www.youtube.com/watch?v=example2",
          type: "Videos"
        },
        { 
          id: "video-editing", 
          title: "The Power of Film Editing", 
          description: "Thelma Schoonmaker discusses how editing shapes narrative and emotional impact in films.", 
          imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://www.youtube.com/watch?v=example3",
          type: "Videos"
        },
        { 
          id: "video-sound", 
          title: "Sound Design Masterclass", 
          description: "Hans Zimmer explores the art of film scoring and sound design in modern cinema.", 
          imageUrl: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://www.youtube.com/watch?v=example4",
          type: "Videos"
        },
        { 
          id: "video-color", 
          title: "Color Grading Essentials", 
          description: "Professional colorists share their secrets for achieving cinematic looks.", 
          imageUrl: "https://images.unsplash.com/photo-1534131707746-25d604851a1f?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://www.youtube.com/watch?v=example5",
          type: "Videos"
        },

        // Podcasts
        { 
          id: "podcast-directors", 
          title: "Directors on Directing", 
          description: "Weekly conversations with renowned directors about their creative process and latest projects.", 
          imageUrl: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://podcasts.example.com/directors",
          type: "Podcasts"
        },
        { 
          id: "podcast-screenwriting", 
          title: "Script Notes", 
          description: "Deep dive into screenwriting techniques, story structure, and character development.", 
          imageUrl: "https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://podcasts.example.com/scriptnotes",
          type: "Podcasts"
        },
        { 
          id: "podcast-industry", 
          title: "Film Industry Insights", 
          description: "Industry professionals discuss current trends, technology, and the future of filmmaking.", 
          imageUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://podcasts.example.com/insights",
          type: "Podcasts"
        },
        { 
          id: "podcast-tech", 
          title: "Cinema Tech Today", 
          description: "Exploring the latest innovations in filmmaking technology and digital cinema.", 
          imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://podcasts.example.com/tech",
          type: "Podcasts"
        },

        // Decks
        { 
          id: "deck-pitching", 
          title: "Perfect Pitch Deck Guide", 
          description: "Learn how to create compelling pitch decks that win over producers and investors.", 
          imageUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://decks.example.com/pitch-guide",
          type: "Decks"
        },
        { 
          id: "deck-storyboard", 
          title: "Storyboarding Essentials", 
          description: "Master the art of storyboarding with this comprehensive presentation guide.", 
          imageUrl: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://decks.example.com/storyboard",
          type: "Decks"
        },
        { 
          id: "deck-production", 
          title: "Production Planning 101", 
          description: "A complete guide to planning and organizing your film production effectively.", 
          imageUrl: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://decks.example.com/production",
          type: "Decks"
        },
        { 
          id: "deck-budget", 
          title: "Film Budgeting Guide", 
          description: "Essential tips for creating and managing film production budgets.", 
          imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://decks.example.com/budget",
          type: "Decks"
        },
        { 
          id: "deck-marketing", 
          title: "Film Marketing Strategy", 
          description: "Comprehensive guide to marketing and promoting your film.", 
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://decks.example.com/marketing",
          type: "Decks"
        },

        // Articles
        { 
          id: "article-composition", 
          title: "The Rule of Thirds in Modern Cinema", 
          description: "An in-depth analysis of how contemporary filmmakers use and break composition rules.", 
          imageUrl: "https://images.unsplash.com/photo-1512025316832-8658f04f8a83?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://articles.example.com/rule-of-thirds",
          type: "Articles"
        },
        { 
          id: "article-sound", 
          title: "The Impact of Sound Design", 
          description: "How sound design shapes audience perception and emotional engagement in film.", 
          imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://articles.example.com/sound-design",
          type: "Articles"
        },
        { 
          id: "article-color", 
          title: "Color Theory in Film", 
          description: "Understanding color grading and its psychological impact on storytelling.", 
          imageUrl: "https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://articles.example.com/color",
          type: "Articles"
        },
        { 
          id: "article-vfx", 
          title: "The Evolution of VFX", 
          description: "Tracing the development of visual effects from practical to digital.", 
          imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://articles.example.com/vfx",
          type: "Articles"
        },
        { 
          id: "article-cameras", 
          title: "Digital Cinema Cameras", 
          description: "Comparing the latest digital cinema cameras and their unique characteristics.", 
          imageUrl: "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://articles.example.com/cameras",
          type: "Articles"
        },

        // Books
        { 
          id: "book-directing", 
          title: "On Directing Film", 
          description: "David Mamet's essential guide to film directing and visual storytelling.", 
          imageUrl: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://books.example.com/on-directing",
          type: "Books"
        },
        { 
          id: "book-camera", 
          title: "The Five C's of Cinematography", 
          description: "Joseph V. Mascelli's comprehensive guide to camera techniques and movement.", 
          imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://books.example.com/five-cs",
          type: "Books"
        },
        { 
          id: "book-storytelling", 
          title: "Story: Substance, Structure, Style", 
          description: "Robert McKee's influential work on the principles of storytelling.", 
          imageUrl: "https://images.unsplash.com/photo-1456518563096-0ff5ee08204e?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://books.example.com/story",
          type: "Books"
        },
        { 
          id: "book-production", 
          title: "The Filmmaker's Handbook", 
          description: "A comprehensive guide to digital filmmaking in the modern age.", 
          imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=800&auto=format&fit=crop&q=60", 
          contentUrl: "https://books.example.com/handbook",
          type: "Books"
        }
      ]
    }

    setFeedbacks(prev => prev.map(f => 
      f.id === currentFeedback.id ? processedFeedback : f
    ))
    setCurrentFeedback(processedFeedback)
    setIsProcessing(false)
    setShowPeelCard(true)
  }

  const handlePeelComplete = () => {
    setShowPeelCard(false)
    setShowNewFeedback(true)
  }

  const handleFeedbackSelect = (feedback: FeedbackItem) => {
    setCurrentFeedback(feedback)
    setShowNewFeedback(feedback.status === 'ready')
    setIsUploadModalOpen(feedback.status === 'pending')
  }

  const handleDeleteFeedback = (feedbackId: string, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent triggering the feedback selection
    
    // Get the feedback being deleted and the remaining feedbacks
    const updatedFeedbacks = feedbacks.filter(f => f.id !== feedbackId)
    const deletedFeedback = feedbacks.find(f => f.id === feedbackId)
    const isCurrentFeedback = currentFeedback?.id === feedbackId

    setFeedbacks(updatedFeedbacks)
    
    // If we're deleting the current feedback
    if (isCurrentFeedback) {
      if (updatedFeedbacks.length > 0) {
        // Select the next feedback in the list
        const nextFeedback = updatedFeedbacks[0]
        setCurrentFeedback(nextFeedback)
        setShowNewFeedback(nextFeedback.status === 'ready')
        setIsUploadModalOpen(nextFeedback.status === 'pending')
      } else {
        // If no feedbacks left, create a new pending feedback
        createNewFeedback()
      }
    }
  }

  // Function to get the list of items to show in the sidebar
  const getSidebarItems = () => {
    // If there are no feedbacks, return empty array (initialization will be handled by useEffect)
    return feedbacks
  }

  // Initialize with a pending feedback if there are no feedbacks
  useEffect(() => {
    if (feedbacks.length === 0) {
      const newFeedback: FeedbackItem = {
        id: 'initial',
        title: 'New Feedback',
        date: new Date(),
        status: 'pending'
      }
      setFeedbacks([newFeedback])
      setCurrentFeedback(newFeedback)
      setShowNewFeedback(false)
      setIsUploadModalOpen(true)
    }
  }, [])

  const handleLogout = () => {
    // Simulate logout - in the future this would clear auth tokens, etc.
    setTimeout(() => {
      router.push("/")
    }, 500)
  }

  // Function to get a consistent color based on email
  const getAvatarColor = (email: string) => {
    const colors = [
      'bg-slate-900 text-white',
      'bg-emerald-500 text-white',
      'bg-violet-500 text-white',
      'bg-pink-500 text-white',
      'bg-indigo-500 text-white',
      'bg-blue-500 text-white'
    ]
    const index = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[index % colors.length]
  }

  const userEmail = "john@example.com"

  // Sidebar content component to reuse in both desktop and mobile
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-16 px-2 border-b border-border">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5Btales%5D-logo-cr5dVmAyZBoyYbXBQ1bLbyRXtpQGBW.svg"
          alt="Tales"
          width={80}
          height={28}
        />
        {!isMobile && (
          <Button 
            variant="default"
            size="sm"
            className="h-8 text-xs ml-auto"
            onClick={createNewFeedback}
          >
            New Feedback
          </Button>
        )}
      </div>

      <div className="flex-1 overflow-auto p-2">
          <h2 className="text-sm font-medium mb-2">
            Recent Feedback
          </h2>
          <div className="flex flex-col gap-2">
            {getSidebarItems().map(feedback => (
              <div
                key={feedback.id}
                className="group relative"
              >
                <Button
                  variant="ghost"
                  className={`w-full justify-start text-xs py-2 px-2 ${
                    currentFeedback?.id === feedback.id ? 'bg-accent' : ''
                  }`}
                onClick={() => {
                  handleFeedbackSelect(feedback)
                  if (isMobile) setIsDrawerOpen(false)
                }}
                >
                  <div className="flex flex-col items-start w-full min-w-0">
                    <span className="font-medium truncate w-[180px] text-left">
                      {feedback.status === 'pending' ? 'New Feedback...' : feedback.title}
                    </span>
                    <span className="text-muted-foreground text-[10px]">
                    {formatDistanceToNow(feedback.date, { addSuffix: true })}
                    </span>
                  </div>
                </Button>
                {!(feedbacks.length === 1 && feedback.status === 'pending') && (
                  <Button
                    variant="ghost"
                    size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => handleDeleteFeedback(feedback.id, e)}
                  >
                    <Trash2 className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

      <div className="mt-auto p-2 border-t border-border">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="w-full h-8 px-2 justify-start">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className={`${getAvatarColor(userEmail)} flex items-center justify-center`}>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-xs">{userEmail}</span>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[200px]">
              <DropdownMenuItem onClick={() => router.push("/")}>
                <Home className="mr-2 h-4 w-4" />
                Home
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
  )

  return (
    <div className="flex h-screen bg-background">
      {/* Desktop sidebar */}
      {!isMobile && (
        <div className="flex flex-col w-[240px] border-r border-border bg-card">
          <SidebarContent />
        </div>
      )}

      {/* Mobile header */}
      {isMobile && (
        <div className="fixed top-0 left-0 right-0 h-14 border-b border-border bg-card/80 backdrop-blur-sm z-50 flex items-center px-4">
          <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] p-0">
              <SidebarContent />
            </SheetContent>
          </Sheet>
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5Btales%5D-logo-cr5dVmAyZBoyYbXBQ1bLbyRXtpQGBW.svg"
            alt="Tales"
            width={80}
            height={32}
          />
          <div className="flex-1" />
          <Button 
            variant="default"
            onClick={createNewFeedback}
          >
            New Feedback
          </Button>
        </div>
      )}

      {/* Main content area */}
      <div className={`flex-1 overflow-auto ${isMobile ? 'pt-14' : ''}`}>
        {showNewFeedback && currentFeedback?.status === 'ready' ? (
          <div className="p-4 md:p-6">
            <FeedbackEntry
              fileName={currentFeedback.title}
              description="Here's what our AI found in your presentation"
              metrics={currentFeedback.metrics || []}
              references={currentFeedback.references || []}
              feedbackImage={currentFeedback.imageUrl}
            />
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-2xl px-4">
              <UploadForm 
                onSubmit={handleFileUpload}
                initialData={currentFeedback?.formData}
              />
            </div>
          </div>
        )}
      </div>

      {/* Processing Modal */}
      <FeedbackProcessing
        isOpen={isProcessing}
        onComplete={() => {}}
      />

      {/* Peel Card Modal */}
      {showPeelCard && currentFeedback && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50">
          <PeelCard
            onReveal={handlePeelComplete}
            gradient="linear-gradient(135deg, #6B63B5 0%, #5D56A6 100%)"
            name="Your Feedback"
            role="is ready"
            width={isMobile ? 320 : 640}
            height={isMobile ? 180 : 360}
          />
        </div>
      )}
    </div>
  )
}

