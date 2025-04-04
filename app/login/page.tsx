"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const animationRef = useRef<number | null>(null)

  // Array of background images
  const backgroundImages = [
    "https://picsum.photos/id/1/1200/900",
    "https://picsum.photos/id/20/1200/900",
    "https://picsum.photos/id/30/1200/900",
    "https://picsum.photos/id/40/1200/900",
    "https://picsum.photos/id/50/1200/900",
  ]

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Login attempt with:", { email, password })
  }

  // Handle focus state for any input
  const handleFocus = () => setIsFocused(true)
  const handleBlur = () => setIsFocused(false)

  // Image animation effect
  useEffect(() => {
    const animateImages = () => {
      setCurrentImageIndex((prevIndex) => (prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1))
    }

    // Change image every 5 seconds
    const interval = setInterval(animateImages, 5000)

    return () => clearInterval(interval)
  }, [backgroundImages.length])

  // Smooth transition effect for images
  useEffect(() => {
    let startTime: number | null = null
    const duration = 1000 // 1 second transition

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const elapsed = timestamp - startTime

      if (elapsed < duration) {
        // Continue animation
        animationRef.current = requestAnimationFrame(animate)
      } else {
        // Animation complete
        animationRef.current = null
      }
    }

    // Start animation
    animationRef.current = requestAnimationFrame(animate)

    // Cleanup
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [currentImageIndex])

  return (
    <div className="flex min-h-screen">
      {/* Left panel - Image background with logo */}
      <div className="hidden md:block md:w-1/2 relative overflow-hidden">
        {/* Background images with crossfade effect */}
        {backgroundImages.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out"
            style={{
              opacity: index === currentImageIndex ? 1 : 0,
              filter: isFocused ? "blur(8px)" : "none",
              transition: "filter 0.3s ease-in-out, opacity 1s ease-in-out",
            }}
          >
            <Image
              src={src || "/placeholder.svg"}
              alt="Background"
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 z-10"></div>

        {/* Logo */}
        <div className="absolute top-12 left-12 z-20">
          <Link href="/" className="inline-block">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5Btales%5D-logo-cr5dVmAyZBoyYbXBQ1bLbyRXtpQGBW.svg"
              alt="tales"
              width={120}
              height={42}
              className="invert" // Invert to make logo white on dark background
            />
          </Link>
        </div>
      </div>

      {/* Right panel - Login form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo - only visible on mobile */}
          <div className="flex justify-center mb-8 md:hidden">
            <Link href="/" className="inline-block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5Btales%5D-logo-cr5dVmAyZBoyYbXBQ1bLbyRXtpQGBW.svg"
                alt="tales"
                width={100}
                height={35}
              />
            </Link>
          </div>

          <div className="bg-white p-8 rounded-lg border border-gray-100 shadow-sm">
            <h1 className="text-2xl font-semibold mb-6">Login</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium">
                  Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  required
                  className="w-full"
                />
              </div>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">OR CONTINUE WITH</span>
                </div>
              </div>

              <Button type="button" variant="outline" className="w-full flex items-center justify-center gap-2">
                <svg viewBox="0 0 24 24" width="16" height="16">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path
                      fill="#4285F4"
                      d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                    />
                    <path
                      fill="#34A853"
                      d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                    />
                    <path
                      fill="#EA4335"
                      d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                    />
                  </g>
                </svg>
                Google
              </Button>

              <Button type="submit" className="w-full bg-[#09090b] hover:bg-[#18181b]">
                Login
              </Button>
            </form>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#09090b] font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

