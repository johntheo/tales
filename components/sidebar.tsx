"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, MessageSquare, History, Code, Music, BarChart, Target, Briefcase, Menu } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [activeItem, setActiveItem] = useState("")
  const [isLetterPeeled, setIsLetterPeeled] = useState(false)

  useEffect(() => {
    // Set active item based on current path
    if (pathname.includes("/dashboard")) {
      setActiveItem("dashboard")
    } else if (pathname.includes("/recent-feedback")) {
      setActiveItem("recent")
    } else if (pathname.includes("/past-feedbacks")) {
      setActiveItem("past")
    } else if (pathname.includes("/development")) {
      setActiveItem("development")
    } else if (pathname.includes("/pitch-simulator")) {
      setActiveItem("pitch")
    } else if (pathname.includes("/performance-review")) {
      setActiveItem("performance")
    } else if (pathname.includes("/goals")) {
      setActiveItem("goals")
    } else if (pathname.includes("/open-positions")) {
      setActiveItem("positions")
    } else if (pathname.includes("/industry-salaries")) {
      setActiveItem("salaries")
    }

    // Check if the feedback has been peeled
    const feedbackPeeled = sessionStorage.getItem("feedbackPeeled") === "true"
    setIsLetterPeeled(feedbackPeeled)

    // Listen for storage events to update the state
    const handleStorageChange = () => {
      const feedbackPeeled = sessionStorage.getItem("feedbackPeeled") === "true"
      setIsLetterPeeled(feedbackPeeled)
    }

    window.addEventListener("storage", handleStorageChange)
    return () => {
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [pathname])

  useEffect(() => {
    // Simulate letter being peeled after a delay
    const timer = setTimeout(() => {
      setIsLetterPeeled(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={cn("w-64 bg-white border-r border-[#e4e4e7] h-[calc(100vh-73px)] p-4", className)}>
      <div className={cn("transition-all duration-300", !isLetterPeeled && "blur-sm pointer-events-none")}>
        <div className="mb-6">
          <h2 className="text-sm font-medium text-[#71717a] mb-2 px-3">Feedbacks</h2>
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                activeItem === "dashboard" ? "bg-[#f4f4f5]" : "hover:bg-[#fafafa]",
              )}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span className={cn("text-sm", activeItem === "dashboard" ? "font-medium" : "")}>Dashboard</span>
            </Link>
            <Link
              href="/recent-feedback"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                activeItem === "recent" ? "bg-[#f4f4f5]" : "hover:bg-[#fafafa]",
              )}
            >
              <MessageSquare className="w-5 h-5" />
              <span className={cn("text-sm", activeItem === "recent" ? "font-medium" : "")}>Recent Feedback</span>
            </Link>
            <Link
              href="/past-feedbacks"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                activeItem === "past" ? "bg-[#f4f4f5]" : "hover:bg-[#fafafa]",
              )}
            >
              <History className="w-5 h-5" />
              <span className={cn("text-sm", activeItem === "past" ? "font-medium" : "")}>Past Feedbacks</span>
            </Link>
          </nav>
        </div>

        <div className="mb-6">
          <h2 className="text-sm font-medium text-[#71717a] mb-2 px-3">Growth</h2>
          <nav className="space-y-1">
            <Link
              href="/development"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                activeItem === "development" ? "bg-[#f4f4f5]" : "hover:bg-[#fafafa]",
              )}
            >
              <Code className="w-5 h-5" />
              <span className={cn("text-sm", activeItem === "development" ? "font-medium" : "")}>Development</span>
            </Link>
            <Link
              href="/pitch-simulator"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                activeItem === "pitch" ? "bg-[#f4f4f5]" : "hover:bg-[#fafafa]",
              )}
            >
              <Music className="w-5 h-5" />
              <span className={cn("text-sm", activeItem === "pitch" ? "font-medium" : "")}>Pitch Simulator</span>
            </Link>
            <Link
              href="/performance-review"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                activeItem === "performance" ? "bg-[#f4f4f5]" : "hover:bg-[#fafafa]",
              )}
            >
              <BarChart className="w-5 h-5" />
              <span className={cn("text-sm", activeItem === "performance" ? "font-medium" : "")}>
                Performance Review
              </span>
            </Link>
            <Link
              href="/goals"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                activeItem === "goals" ? "bg-[#f4f4f5]" : "hover:bg-[#fafafa]",
              )}
            >
              <Target className="w-5 h-5" />
              <span className={cn("text-sm", activeItem === "goals" ? "font-medium" : "")}>Goals</span>
            </Link>
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-medium text-[#71717a] mb-2 px-3">Career</h2>
          <nav className="space-y-1">
            <Link
              href="/open-positions"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                activeItem === "positions" ? "bg-[#f4f4f5]" : "hover:bg-[#fafafa]",
              )}
            >
              <Briefcase className="w-5 h-5" />
              <span className={cn("text-sm", activeItem === "positions" ? "font-medium" : "")}>Open Positions</span>
            </Link>
            <Link
              href="#"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                activeItem === "menu1" ? "bg-[#f4f4f5]" : "hover:bg-[#fafafa]",
              )}
            >
              <Menu className="w-5 h-5" />
              <span className={cn("text-sm", activeItem === "menu1" ? "font-medium" : "")}>Menu Option</span>
            </Link>
            <Link
              href="#"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                activeItem === "menu2" ? "bg-[#f4f4f5]" : "hover:bg-[#fafafa]",
              )}
            >
              <Menu className="w-5 h-5" />
              <span className={cn("text-sm", activeItem === "menu2" ? "font-medium" : "")}>Menu Option</span>
            </Link>
            <Link
              href="#"
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                activeItem === "menu3" ? "bg-[#f4f4f5]" : "hover:bg-[#fafafa]",
              )}
            >
              <Menu className="w-5 h-5" />
              <span className={cn("text-sm", activeItem === "menu3" ? "font-medium" : "")}>Menu Option</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  )
}

