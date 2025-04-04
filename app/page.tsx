"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import FloatingCards from "@/components/floating-cards"
import CommunityGallery from "@/components/community-gallery"
import { TrustSecurityModal } from "@/components/trust-security-modal"
import FeaturesSection from "@/components/features-section"

// Avatar images for community section
const communityImages = [
  "https://randomuser.me/api/portraits/women/1.jpg",
  "https://randomuser.me/api/portraits/men/2.jpg",
  "https://randomuser.me/api/portraits/women/3.jpg",
  "https://randomuser.me/api/portraits/men/4.jpg",
  "https://randomuser.me/api/portraits/women/5.jpg",
  "https://randomuser.me/api/portraits/men/6.jpg",
  "https://randomuser.me/api/portraits/women/7.jpg",
  "https://randomuser.me/api/portraits/men/8.jpg",
  "https://randomuser.me/api/portraits/women/9.jpg",
  "https://randomuser.me/api/portraits/men/10.jpg",
  "https://randomuser.me/api/portraits/women/11.jpg",
  "https://randomuser.me/api/portraits/men/12.jpg",
  "https://randomuser.me/api/portraits/women/13.jpg",
  "https://randomuser.me/api/portraits/men/14.jpg",
]

export default function Home() {
  const communityRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [animateFeatures, setAnimateFeatures] = useState(false)
  const [trustModalOpen, setTrustModalOpen] = useState(false)

  const scrollToCommunity = () => {
    communityRef.current?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Handle scroll-based animations
  useEffect(() => {
    const handleScroll = () => {
      if (featuresRef.current) {
        const rect = featuresRef.current.getBoundingClientRect()
        const isVisible = rect.top < window.innerHeight * 0.75
        if (isVisible) {
          setAnimateFeatures(true)
        }
      }
    }

    // Initial check
    handleScroll()

    // Add scroll listener
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center relative z-50">
        <Link href="/" className="logo">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5Btales%5D-logo-cr5dVmAyZBoyYbXBQ1bLbyRXtpQGBW.svg"
            alt="tales"
            width={80}
            height={28}
          />
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 focus:outline-none"
          onClick={toggleMobileMenu}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost" onClick={() => setTrustModalOpen(true)} className="text-sm font-medium">
            Trust and Security
          </Button>
          <Button variant="ghost" onClick={scrollToFeatures} className="text-sm font-medium">
            Solution
          </Button>
          <Link href="/login">
            <Button variant="default" className="text-sm font-medium bg-black text-white hover:bg-gray-800">
              Get Started Free
            </Button>
          </Link>
        </nav>

        {/* Mobile navigation */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg p-4 flex flex-col gap-2 md:hidden z-50">
            <Button
              variant="ghost"
              onClick={() => setTrustModalOpen(true)}
              className="text-sm font-medium w-full justify-start"
            >
              Trust and Security
            </Button>
            <Button variant="ghost" onClick={scrollToFeatures} className="text-sm font-medium w-full justify-start">
              Solution
            </Button>
            <Link href="/login" className="w-full">
              <Button variant="default" className="text-sm font-medium bg-black text-white hover:bg-gray-800 w-full">
                Get Started Free
              </Button>
            </Link>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="container mx-auto px-4 pt-12 md:pt-16 pb-16 md:pb-24 text-center relative">
          <h1 className="text-3xl md:text-5xl font-bold mb-8 md:mb-16 max-w-4xl mx-auto relative z-0">
            <div>A place to create</div>
            <div>your masterpiece.</div>
          </h1>

          <div
            className="-mt-16 md:-mt-24 relative z-10 overflow-visible"
            style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
          >
            <FloatingCards />
          </div>

          <div
            className="mt-4 opacity-0 animate-fade-in relative z-0"
            style={{ animationDelay: "1s", animationFillMode: "forwards" }}
          >
            <p className="max-w-2xl mx-auto mb-4 text-base md:text-lg px-4">
              Upload your presentations, get <span className="font-bold">human powered AI feedback</span>, and create
              compelling narratives that captivate your audience.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/login">
                <Button variant="default" size="lg" className="bg-black text-white hover:bg-gray-800 min-w-[200px]">
                  Get Started Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={scrollToFeatures} className="min-w-[200px]">
                See How It Works
              </Button>
            </div>
          </div>
        </section>

        {/* Master Storytelling Section */}
        <section className="container mx-auto px-4 md:px-8 py-16 md:py-24 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">Master the Art of Storytelling</h2>
              <div className="max-w-md">
                <p className="mb-4 text-sm md:text-base">
                  Your work deserves to be seen, understood, and appreciated. With [tales], get expert AI-driven
                  feedback to refine your presentations and captivate your audience. Whether it's a portfolio, case
                  study, or pitch deck, we help you craft narratives that open doors.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <Link href="/login">
                  <Button variant="default" size="lg" className="min-w-[180px]">
                    Try For Free
                  </Button>
                </Link>
                <Button variant="outline" size="lg" onClick={() => setTrustModalOpen(true)} className="min-w-[180px]">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="bg-gray-200 rounded-lg overflow-hidden aspect-video md:scale-110 lg:scale-125 transform origin-center shadow-xl mt-6 md:mt-0">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/ZDh7dPmczoU"
                title="Master the Art of Storytelling"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <FeaturesSection />

        {/* Core Features Section */}
        <section ref={featuresRef} className="bg-[#09090b] text-white py-24 overflow-hidden">
          <style jsx global>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(30px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            
            @keyframes scaleIn {
              from {
                opacity: 0;
                transform: scale(0.95);
              }
              to {
                opacity: 1;
                transform: scale(1);
            }
            }
            
            @keyframes floatImage {
              0% {
                transform: translateY(0);
              }
              50% {
                transform: translateY(-8px);
              }
              100% {
                transform: translateY(0);
              }
            }
            
            .feature-card {
              transition: all 0.5s cubic-bezier(0.25, 0.1, 0.25, 1);
              transform: translateY(0);
              box-shadow: 0 0 0 rgba(0, 0, 0, 0);
            }
            
            .feature-card:hover {
              transform: translateY(-10px) scale(1.02);
              box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
              z-index: 10;
            }
            
            .feature-card:hover .card-image {
              transform: translateY(-8px);
            }
            
            .feature-card .card-image {
              transition: transform 1.2s cubic-bezier(0.25, 0.1, 0.25, 1);
            }
            
            .feature-heading {
              animation: fadeInUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) forwards;
              opacity: 0;
            }
            
            .feature-description {
              animation: fadeInUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.2s forwards;
              opacity: 0;
            }
            
            .feature-card-1 {
              animation: scaleIn 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.4s forwards;
              opacity: 0;
            }
            
            .feature-card-2 {
              animation: scaleIn 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.6s forwards;
              opacity: 0;
            }
            
            .feature-card-3 {
              animation: scaleIn 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 0.8s forwards;
              opacity: 0;
            }
            
            .feature-text-1 {
              animation: fadeInUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 1s forwards;
              opacity: 0;
            }
            
            .feature-text-2 {
              animation: fadeInUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 1.1s forwards;
              opacity: 0;
            }
            
            .feature-text-3 {
              animation: fadeInUp 0.8s cubic-bezier(0.25, 0.1, 0.25, 1) 1.2s forwards;
              opacity: 0;
            }
          `}</style>

          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2
                className={`text-4xl md:text-5xl font-bold mb-4 ${animateFeatures ? "feature-heading" : "opacity-0"}`}
              >
                Core Features Unleashed
              </h2>
              <p className={`text-gray-400 max-w-2xl mx-auto ${animateFeatures ? "feature-description" : "opacity-0"}`}>
                Dive into a world where our cutting-edge technology meets your creative needs, setting a new standard
                for design excellence.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Portfolio Review Card */}
              <div
                className={`feature-card rounded-3xl border border-zinc-800 overflow-hidden ${animateFeatures ? "feature-card-1" : "opacity-0"}`}
              >
                <div className="bg-[#09090b] p-8 h-full">
                  <div className="card-image bg-red-600 rounded-2xl mb-6 aspect-[4/3] overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%205.png-c41HFW408BO4v8h9vRaxhs27vUZCjg.webp"
                      alt="Portfolio Review"
                      width={200}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Portfolio Review</h3>
                  <p className="text-gray-400 mb-4">
                    A great portfolio can open new doors. Get detailed feedback on your portfolio to showcase your
                    skills effectively.
                  </p>
                </div>
              </div>

              {/* Case Presentation Review Card */}
              <div
                className={`feature-card rounded-3xl border border-zinc-800 overflow-hidden ${animateFeatures ? "feature-card-2" : "opacity-0"}`}
              >
                <div className="bg-[#09090b] p-8 h-full">
                  <div className="card-image bg-[#18181b] rounded-2xl mb-6 aspect-[4/3] overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%206.png-dI7bqP0LD9EO6tMU8gVJZ0OJffqGeD.webp"
                      alt="Case Presentation Review"
                      width={200}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Case Presentation Review</h3>
                  <p className="text-gray-400 mb-4">
                    Receive insights on your case studies to highlight your problem-solving abilities and outcomes.
                  </p>
                </div>
              </div>

              {/* Deck Presentation Review Card */}
              <div
                className={`feature-card rounded-3xl border border-zinc-800 overflow-hidden ${animateFeatures ? "feature-card-3" : "opacity-0"}`}
              >
                <div className="bg-[#09090b] p-8 h-full">
                  <div className="card-image bg-gray-100 rounded-2xl mb-6 aspect-[4/3] overflow-hidden">
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%209.png-7eFwLDccwqplAtd1FNhnVZZ9e6xBbW.webp"
                      alt="Deck Presentation Review"
                      width={200}
                      height={150}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Deck Presentation Review</h3>
                  <p className="text-gray-400 mb-4">
                    Enhance your presentation decks with expert feedback to ensure they are engaging and impactful.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section ref={communityRef} className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center">Join our community</h2>

          <div className="mb-6 md:mb-8">
            <CommunityGallery images={communityImages} />
          </div>

          <div className="max-w-3xl mx-auto text-center mt-8 md:mt-12">
            <p className="text-base md:text-lg font-medium mb-2">
              Join a thriving community of designers, product managers, and storytellers shaping the future of
              presentations.
            </p>
            <p className="mb-6 text-sm md:text-base">
              With 500+ professionals submitting their work and 20+ industry experts providing feedback, our beta
              testers are already seeing real improvements in their portfolios and case studies. Be part of the
              movement—
              <span className="font-bold">elevate your storytelling today! 🚀</span>
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button variant="default" size="lg" className="bg-black text-white hover:bg-gray-800 min-w-[200px]">
                  Join Community Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" onClick={scrollToCommunity} className="min-w-[200px]">
                View Success Stories
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer - Updated with social links */}
      <footer className="bg-[#09090b] text-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left column with logo */}
            <div className="flex items-center h-full">
              <Link href="/" className="inline-block">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5Btales%5D-logo-cr5dVmAyZBoyYbXBQ1bLbyRXtpQGBW.svg"
                  alt="tales"
                  width={100}
                  height={35}
                  className="invert" // Invert to make logo white on dark background
                />
              </Link>
            </div>

            {/* Right column with social links */}
            <div className="flex items-center justify-end">
              <div className="bg-white rounded-[6px] px-6 py-3 flex gap-8">
                <Link
                  href="https://instagram.com"
                  className="text-[#09090b] hover:text-[#09090b]/80 transition-colors text-sm font-medium"
                >
                  Instagram
                </Link>
                <Link
                  href="https://linkedin.com"
                  className="text-[#09090b] hover:text-[#09090b]/80 transition-colors text-sm font-medium"
                >
                  LinkedIn
                </Link>
                <Link
                  href="/contact"
                  className="text-[#09090b] hover:text-[#09090b]/80 transition-colors text-sm font-medium"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom links */}
          <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">© 2024 Tales. All rights reserved.</div>
            {/* <div className="flex flex-wrap gap-6">
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Terms
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Privacy
              </Link>
              <Link href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                Cookies
              </Link>
            </div> */}
          </div>
        </div>
      </footer>
      <TrustSecurityModal open={trustModalOpen} onOpenChange={setTrustModalOpen} />
    </>
  )
}

