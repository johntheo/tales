"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { TrustSecurityModal } from "@/components/trust-security-modal"

interface HeaderProps {
  dashboardPage?: boolean
  feedbackPage?: boolean
}

export function Header({ dashboardPage = false, feedbackPage = false }: HeaderProps) {
  const [trustModalOpen, setTrustModalOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showGetStarted, setShowGetStarted] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Handle scroll to show/hide Get Started button
  useEffect(() => {
    const handleScroll = () => {
      // Find the "Master the Art of Storytelling" section using data attribute
      const storytellingSection = document.querySelector('section[data-section="storytelling"]');
      
      if (storytellingSection) {
        const rect = storytellingSection.getBoundingClientRect();
        // Show button when the section is in view (top of section reaches top of viewport)
        // Using a small threshold to trigger slightly before the section is fully in view
        setShowGetStarted(rect.top <= 150);
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-b border-[#e4e4e7] py-3 px-4 md:py-4 md:px-6 flex justify-between items-center animate-fade-in z-50">
        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/" className="logo">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5Btales%5D-logo-cr5dVmAyZBoyYbXBQ1bLbyRXtpQGBW.svg"
              alt="tales"
              width={80}
              height={28}
              className="h-6 w-auto"
            />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2">
          {/* Get Started button that appears on scroll for mobile */}
          {showGetStarted && (
            <Link href="/dashboard" className="md:hidden">
              <Button
                variant="default"
                size="sm"
                className="bg-black text-white hover:bg-black/90 text-xs"
              >
                Get Started
              </Button>
            </Link>
          )}
          
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 md:gap-4">
          <Button variant="ghost" className="text-sm" onClick={() => setTrustModalOpen(true)}>
            Trust and Security
          </Button>
          <Link href="/dashboard">
            <Button
              variant="default"
              size="sm"
              className="bg-black text-white hover:bg-black/90 text-xs md:text-sm"
            >
              Get Started Free
            </Button>
          </Link>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed top-[72px] left-0 right-0 bg-white shadow-lg p-4 flex flex-col gap-2 md:hidden z-50 border-b border-[#e4e4e7]">
          <Button variant="ghost" className="text-sm w-full justify-start" onClick={() => setTrustModalOpen(true)}>
            Trust and Security
          </Button>
          {!dashboardPage && !feedbackPage && (
            <Button variant="ghost" className="text-sm w-full justify-start">
              Solution
            </Button>
          )}
          {/* Removed Get Started button from mobile menu as requested */}
        </div>
      )}

      <TrustSecurityModal open={trustModalOpen} onOpenChange={setTrustModalOpen} />
    </>
  )
}

