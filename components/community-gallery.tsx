"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"

interface CommunityGalleryProps {
  images: string[]
}

export default function CommunityGallery({ images }: CommunityGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let animationId: number
    let lastTimestamp = 0
    const speed = 1.5 // pixels per frame (increased for more visible movement)

    // Set initial scroll position to the end to start scrolling from right to left
    scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2

    const scroll = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp
      const elapsed = timestamp - lastTimestamp

      // Smooth animation based on elapsed time
      if (elapsed > 16) {
        // aim for 60fps
        // Decrease scrollLeft to move from right to left
        scrollContainer.scrollLeft -= speed
        lastTimestamp = timestamp

        // If we've scrolled to the beginning, reset to the middle
        if (scrollContainer.scrollLeft <= 0) {
          // Jump back to middle without animation
          scrollContainer.style.scrollBehavior = "auto"
          scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2
          // Restore smooth scrolling
          setTimeout(() => {
            scrollContainer.style.scrollBehavior = "smooth"
          }, 100)
        }
      }

      animationId = requestAnimationFrame(scroll)
    }

    // Start animation
    animationId = requestAnimationFrame(scroll)

    // Add hover pause functionality
    const pauseAnimation = () => {
      cancelAnimationFrame(animationId)
    }

    const resumeAnimation = () => {
      lastTimestamp = 0
      animationId = requestAnimationFrame(scroll)
    }

    scrollContainer.addEventListener("mouseenter", pauseAnimation)
    scrollContainer.addEventListener("mouseleave", resumeAnimation)

    return () => {
      cancelAnimationFrame(animationId)
      scrollContainer.removeEventListener("mouseenter", pauseAnimation)
      scrollContainer.removeEventListener("mouseleave", resumeAnimation)
    }
  }, [])

  return (
    <div className="w-full overflow-hidden">
      <div
        ref={scrollRef}
        className="flex gap-4 py-4 w-max transition-all duration-300 ease-linear"
        style={{ scrollBehavior: "smooth" }}
      >
        {/* Duplicate images multiple times to create seamless scrolling */}
        {[...images, ...images, ...images].map((src, index) => (
          <div
            key={index}
            className="relative min-w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-white shadow-md hover:scale-110 transition-transform duration-300"
          >
            <Image src={src || "/placeholder.svg"} alt={`Community member ${index}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  )
}

