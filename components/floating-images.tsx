"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"

interface ImageItem {
  src: string
  alt: string
  width: number
  height: number
}

interface FloatingImagesProps {
  firstRowImages: ImageItem[]
  secondRowImages: ImageItem[]
  speed?: number // Animation speed in pixels per second
}

export default function FloatingImages({
  firstRowImages,
  secondRowImages,
  speed = 0.05, // Much slower speed
}: FloatingImagesProps) {
  const firstRowRef = useRef<HTMLDivElement>(null)
  const secondRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let firstRowPosition = 0
    let secondRowPosition = 0
    let animationFrameId: number

    const animate = () => {
      if (firstRowRef.current && secondRowRef.current) {
        // First row (right to left)
        firstRowPosition -= speed
        const firstRowWidth = firstRowRef.current.scrollWidth / 2
        if (Math.abs(firstRowPosition) >= firstRowWidth) {
          firstRowPosition = 0
        }
        firstRowRef.current.style.transform = `translateX(${firstRowPosition}px)`

        // Second row (left to right)
        secondRowPosition += speed
        const secondRowWidth = secondRowRef.current.scrollWidth / 2
        if (secondRowPosition >= secondRowWidth) {
          secondRowPosition = 0
        }
        secondRowRef.current.style.transform = `translateX(${secondRowPosition}px)`
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [speed])

  return (
    <div className="w-full overflow-hidden">
      {/* First row - right to left */}
      <div className="mb-8 overflow-hidden">
        <div ref={firstRowRef} className="flex gap-6" style={{ width: "fit-content" }}>
          {/* Triple the images to ensure no blank spaces */}
          {[...firstRowImages, ...firstRowImages, ...firstRowImages].map((image, index) => (
            <div key={`first-row-${index}`} className="relative min-w-[300px] h-[200px] rounded-lg overflow-hidden">
              <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Second row - left to right */}
      <div className="overflow-hidden">
        <div ref={secondRowRef} className="flex gap-6" style={{ width: "fit-content" }}>
          {/* Repeat the images 13 times to ensure no blank spaces and add more images on the left */}
          {[...Array(13)]
            .flatMap(() => secondRowImages)
            .map((image, index) => (
              <div key={`second-row-${index}`} className="relative min-w-[300px] h-[200px] rounded-lg overflow-hidden">
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}

