"use client"

import { useEffect, useRef, useState } from "react"
import { motion, Transition } from "framer-motion"
import Image from "next/image"

interface CardProps {
  color: string
  username: string
  index: number
  position: number
  total: number
  image?: string
  scrollProgress: number
}

const Card = ({ color, username, index, position, total, image, scrollProgress }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isInitialAnimationComplete, setIsInitialAnimationComplete] = useState(false)

  // Initial and final positions for the card
  const initialX = 0
  const initialY = 0
  const initialRotate = 0

  // Ajustando o espaçamento entre os cards para ser responsivo
  const cardSpacing = 40 // Reduzido ainda mais para evitar overflow
  const finalX = position * cardSpacing - (total * cardSpacing) / 2 + cardSpacing
  const finalRotate = (position - total / 2) * 2 // Reduzido para rotação mais suave

  // Calculate current position based on scroll progress (0 = initial, 1 = final)
  const currentX = initialX + (finalX - initialX) * scrollProgress
  const currentRotate = initialRotate + (finalRotate - initialRotate) * scrollProgress

  // Username tag visibility
  const usernameOpacity = scrollProgress > 0.9 ? (scrollProgress - 0.9) * 10 : 0

  // Get balloon color and rotation based on username
  const getBalloonStyle = (username: string) => {
    if (username === "hugo") {
      return {
        backgroundColor: "#16A34A",
        rotation: "0deg",
      }
    } else if (username === "hyesung") {
      return {
        backgroundColor: "#DC2626",
        rotation: "-10.03deg",
      }
    } else if (username === "john") {
      return {
        backgroundColor: "#0284C7",
        rotation: "7.18deg",
      }
    }
    return {
      backgroundColor: "#09090b",
      rotation: "0deg",
    }
  }

  const balloonStyle = getBalloonStyle(username)

  useEffect(() => {
    // Trigger initial animation only once
    if (!isInitialAnimationComplete && scrollProgress === 1) {
      setIsInitialAnimationComplete(true)
    }
  }, [scrollProgress, isInitialAnimationComplete])

  // Corrigindo o erro de tipagem do Framer Motion
  const animationTransition = isInitialAnimationComplete
    ? {
        y: {
          duration: 4,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
        },
      }
    : {
        duration: 0.3,
        ease: [0.25, 0.1, 0.25, 1],
      }

  return (
    <motion.div
      ref={cardRef}
      className="absolute origin-bottom"
      style={{
        x: currentX,
        y: isInitialAnimationComplete ? [-8, 0, -8][Math.floor((Date.now() % 4000) / (4000 / 3))] : 0,
        rotate: currentRotate,
        zIndex: total - position,
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
      transition={animationTransition}
    >
      {username && (
        <motion.div
          className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-white px-3 py-1 text-sm z-10 inline-flex items-center whitespace-nowrap"
          style={{
            opacity: usernameOpacity,
            borderRadius: "16px",
            position: "relative",
            backgroundColor: balloonStyle.backgroundColor,
            transform: `translate(-50%, 0) rotate(${balloonStyle.rotation})`,
          }}
        >
          @{username}
          <div
            className="absolute w-3 h-3 rotate-45"
            style={{
              bottom: "-4px",
              left: "calc(50% - 6px)",
              backgroundColor: balloonStyle.backgroundColor,
            }}
          ></div>
        </motion.div>
      )}
      <div className={`w-[160px] sm:w-[200px] md:w-[240px] aspect-[16/9] rounded-xl flex items-center justify-center shadow-lg overflow-hidden`}>
        <Image
          src={image || "/placeholder.svg"}
          alt={`Card ${index + 1}`}
          width={280}
          height={158}
          className="object-contain w-full h-full"
          priority={index < 3}
        />
      </div>
    </motion.div>
  )
}

export default function FloatingCards() {
  const containerRef = useRef<HTMLDivElement>(null)
  const observerRef = useRef<HTMLDivElement>(null)
  const [shuffledCards, setShuffledCards] = useState<Array<any>>([])
  const [scrollProgress, setScrollProgress] = useState(1) // Start with cards fanned out
  const [hasBeenVisible, setHasBeenVisible] = useState(false)
  const animationRef = useRef<number>(0)

  // Original cards with fixed positions
  const originalCards = [
    {
      username: "",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%205.png-c41HFW408BO4v8h9vRaxhs27vUZCjg.webp",
      position: 0,
    },
    {
      username: "hugo",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%206.png-dI7bqP0LD9EO6tMU8gVJZ0OJffqGeD.webp",
      position: 1,
    },
    {
      username: "",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%204.png-8cP9clyqHhs55TGaZzo4k73vtTalhc.webp",
      position: 2,
    },
    {
      username: "",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%207.png-HjgAo4A4idYyMjY4FOTbXZIrwfU5NG.webp",
      position: 3,
    },
    {
      username: "hyesung",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%209.png-7eFwLDccwqplAtd1FNhnVZZ9e6xBbW.webp",
      position: 4,
    },
    {
      username: "",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%2010.png-uXlYVDKDIAhA2j3vQA79ld4o8EZZ79.webp",
      position: 5,
    },
    {
      username: "",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%203.png-exdAzMkSVur05AegQyuz1dAxZUhuKT.webp",
      position: 6,
    },
    {
      username: "john",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%202.png-caP1v4bSQRqIu94eM3wWTNEmBLEi2t.webp",
      position: 7,
    },
    {
      username: "",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%201.png-65OhH0xbch2GW3VF9fmPmpmk2UqgZd.webp",
      position: 8,
    },
    {
      username: "",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image%208.png-VEGld7bJQCwoMs0gDFGzqsSiGo03Vi.webp",
      position: 9,
    },
  ]

  // Initial animation to fan out the cards
  useEffect(() => {
    if (!hasBeenVisible) return

    // Animate from stacked to fanned out when component first becomes visible
    let startTime: number | null = null
    const duration = 1500 // 1.5 seconds

    const animateInitial = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function for smoother animation
      const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3)
      const easedProgress = easeOutCubic(progress)

      setScrollProgress(easedProgress)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animateInitial)
      }
    }

    // Start with stacked cards
    setScrollProgress(0)
    // Begin animation
    animationRef.current = requestAnimationFrame(animateInitial)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [hasBeenVisible])

  // Track scroll position and update animation progress
  useEffect(() => {
    if (!hasBeenVisible) return

    let lastScrollY = window.scrollY
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Calculate scroll progress (0 to 1)
          // 0 = stacked cards (scrolled down)
          // 1 = fanned out cards (at top)
          const scrollThreshold = 500 // Adjust as needed
          const newScrollY = window.scrollY
          const newProgress = Math.max(0, Math.min(1, 1 - newScrollY / scrollThreshold))

          // Apply easing for smoother transition
          const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

          setScrollProgress(easeInOutCubic(newProgress))
          lastScrollY = newScrollY
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [hasBeenVisible])

  // Shuffle cards on component mount
  useEffect(() => {
    // Create a copy of the original cards
    const cardsCopy = [...originalCards]

    // Shuffle only the images, keeping positions fixed
    const shuffledImages = [...cardsCopy.map((card) => card.image)].sort(() => Math.random() - 0.5)

    // Create new array with shuffled images but fixed positions and usernames
    const newShuffledCards = cardsCopy.map((card, index) => ({
      ...card,
      image: shuffledImages[index],
    }))

    setShuffledCards(newShuffledCards)
  }, [])

  // Detect when component becomes visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenVisible) {
            setHasBeenVisible(true)
          }
        })
      },
      { threshold: 0.1 },
    )

    if (observerRef.current) {
      observer.observe(observerRef.current)
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current)
      }
    }
  }, [hasBeenVisible])

  return (
    <div ref={observerRef} className="relative h-[400px] w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{
            willChange: "transform",
            transform: "translateZ(0)",
            backfaceVisibility: "hidden",
            perspective: "1000px",
            transformStyle: "preserve-3d",
          }}
        >
          <div
            ref={containerRef}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 w-full max-w-[700px] flex items-center justify-center"
          >
            {shuffledCards.map((card, index) => (
              <Card
                key={index}
                color=""
                username={card.username}
                index={index}
                position={card.position}
                total={shuffledCards.length}
                image={card.image}
                scrollProgress={scrollProgress}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

