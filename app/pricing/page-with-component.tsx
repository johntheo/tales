"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Bell, Users, Download, LinkIcon } from "lucide-react"
import { PricingCard } from "@/components/pricing-card"

export default function PricingPage() {
  const router = useRouter()
  const [isAnnual, setIsAnnual] = useState(false)

  const handleFreePlan = () => {
    router.push("/app")
  }

  const handleCreatorPlan = () => {
    router.push("/signup")
  }

  const handleEnterprisePlan = () => {
    // This could open a contact form or modal
    window.location.href = "mailto:sales@tales.com"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="logo">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5Btales%5D-logo-cr5dVmAyZBoyYbXBQ1bLbyRXtpQGBW.svg"
            alt="tales"
            width={80}
            height={28}
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#">
            <Button variant="ghost" className="text-sm font-medium">
              Trust and Security
            </Button>
          </Link>
          <Link href="/#">
            <Button variant="ghost" className="text-sm font-medium">
              Solution
            </Button>
          </Link>
          <Link href="/pricing">
            <Button variant="ghost" className="text-sm font-medium bg-[#f4f4f5]">
              Pricing
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="ghost" className="text-sm font-medium">
              Login
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="default" className="text-sm font-medium bg-black text-white hover:bg-gray-800">
              Join Us
            </Button>
          </Link>
        </nav>

        {/* Mobile menu button - would need to be expanded with state management */}
        <button className="md:hidden p-2 focus:outline-none">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 6H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M3 18H21" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      <main className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Pricing</h1>
          <p className="text-xl text-[#71717a] mb-12 max-w-3xl">
            From individual creators to the biggest enterprises, we have a plan for you
          </p>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <PricingCard
              title="Free"
              description="For individuals who want to try out the most advanced feedback platform."
              price="$0"
              limit="10k credits limit"
              buttonText="Try it now!"
              onButtonClick={handleFreePlan}
              features={[
                {
                  icon: <Bell className="h-5 w-5" />,
                  title: "Basic AI Feedback",
                  description: "Get AI-powered insights on your presentations",
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  title: "10,000 Monthly Credits",
                  description: "Limited usage for feedback submissions",
                },
                {
                  icon: <LinkIcon className="h-5 w-5" />,
                  title: "Community Access",
                  description: "Engage with other professionals & creators",
                },
              ]}
            />

            {/* Creator Plan */}
            <PricingCard
              title="Creator"
              description="For creators making premium content for global audiences."
              price="$10"
              limit="100k credits limit"
              buttonText="Choose Plan"
              onButtonClick={handleCreatorPlan}
              features={[
                {
                  icon: <Bell className="h-5 w-5" />,
                  title: "100,000 Monthly Credits",
                  description: "More submissions per month",
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  title: "Advanced AI Feedback",
                  description: "Deeper insights with structured breakdowns",
                },
                {
                  icon: <Download className="h-5 w-5" />,
                  title: "Custom Feedback Reports",
                  description: "Download detailed improvement reports",
                },
              ]}
            />

            {/* Enterprise Plan */}
            <PricingCard
              title="Enterprise"
              description="For enterprises that need volume based discounts and custom terms."
              price="Custom"
              period=""
              buttonText="Contact Us"
              onButtonClick={handleEnterprisePlan}
              features={[
                {
                  icon: <Bell className="h-5 w-5" />,
                  title: "Unlimited Monthly Credits",
                  description: "Scale feedback for entire teams",
                },
                {
                  icon: <Users className="h-5 w-5" />,
                  title: "Team Collaboration",
                  description: "Share and review feedback internally",
                },
                {
                  icon: <LinkIcon className="h-5 w-5" />,
                  title: "Recruiter Access",
                  description: "Find top talent through the Tales platform",
                },
              ]}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#e4e4e7] py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-[#71717a]">Tales. All rights reserved</p>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-[#71717a] hover:text-[#09090b]">
                Instagram
              </Link>
              <Link href="#" className="text-sm text-[#71717a] hover:text-[#09090b]">
                LinkedIn
              </Link>
              <Link href="#" className="text-sm text-[#71717a] hover:text-[#09090b]">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

