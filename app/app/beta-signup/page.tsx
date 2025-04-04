"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function BetaSignupPage() {
  const [email, setEmail] = useState("")
  const [isValidEmail, setIsValidEmail] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    setIsValidEmail(emailRegex.test(email))

    // Trigger fade-in effect
    setIsVisible(true)

    return () => {
      // Cleanup function
    }
  }, [email])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (isValidEmail) {
      setIsSubmitted(true)
      console.log("Email submitted:", email)
    }
  }

  const handleClose = () => {
    setIsVisible(false)
    setTimeout(() => {
      router.back() // Use router to navigate back
    }, 300)
  }

  if (!isVisible) {
    return null
  }

  return (
    <div id="beta-signup" className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleClose}></div>
      <div
        className={`relative bg-[#ffffff] rounded-xl shadow-2xl max-w-2xl w-full mx-4 overflow-hidden transition-all duration-300 ease-in-out ${isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"}`}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-[#191919]">Join Our Beta Phase!</h1>
            <button
              onClick={handleClose}
              className="text-[#191919] hover:bg-[#f3f3f3] p-2 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <p className="mb-6 text-[#191919]">
            We're excited to have you on board! [tales] is currently in its beta phase, and we'd love your help in
            making it even better.
          </p>

          <div
            className="w-full h-48 rounded-lg mb-6 overflow-hidden"
            style={{
              background: "linear-gradient(45deg, #8b5cf6, #3b82f6, #10b981, #6366f1)",
              backgroundSize: "300% 300%",
              animation: "gradient 15s ease infinite",
            }}
          ></div>

          <p className="mb-6 text-[#191919]">
            By joining our beta testing community, you'll get early access to new features and the opportunity to
            provide valuable feedback. We'll send you updates and information about new features.
          </p>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="E-mail"
                  className="w-full p-4 rounded-xl bg-[#f3f3f3] text-[#191919] outline-none transition-all border-2 border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                {isValidEmail && email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500">✓</div>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className={`bg-[#191919] text-[#ffffff] px-8 py-3 rounded-full text-base font-medium transition-all duration-300 ease-in-out hover:bg-gray-800
                    ${!isValidEmail ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={!isValidEmail}
                >
                  Submit
                </button>
              </div>
            </form>
          ) : (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              <p className="font-medium">Thank you for joining our beta!</p>
              <p>We'll be in touch soon with updates and new features.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

