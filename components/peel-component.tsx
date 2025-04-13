"use client"

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

interface PeelCardProps {
  onReveal: () => void
  gradient: string
  name: string
  role: string
  width: number
  height: number
}

const gradients = [
  {
    start: '#FF0080',
    middle: '#7928CA',
    end: '#FF0080'
  },
  {
    start: '#7928CA',
    middle: '#FF0080',
    end: '#4299E1'
  },
  {
    start: '#00DFD8',
    middle: '#007CF0',
    end: '#00DFD8'
  },
  {
    start: '#7928CA',
    middle: '#FF0080',
    end: '#7928CA'
  },
  {
    start: '#FF4D4D',
    middle: '#F9CB28',
    end: '#FF4D4D'
  }
]

// Função auxiliar para criar números primos para as durações
const getPrimeDurations = () => ({
  base: 7.1,    // Duração base para evitar sincronização
  short: 3.7,   // Para efeitos rápidos
  medium: 5.3,  // Para efeitos médios
  long: 11.3,   // Para efeitos longos
  veryLong: 13.7 // Para rotações completas
})

export default function PeelCard({ onReveal, gradient, name, role, width, height }: PeelCardProps) {
  const [isPeeling, setIsPeeling] = useState(false)
  const [peelProgress, setPeelProgress] = useState(0)
  const cardRef = useRef<HTMLDivElement>(null)
  
  // Escolhe um gradiente aleatório ao montar o componente
  const [randomGradient] = useState(() => {
    const randomIndex = Math.floor(Math.random() * gradients.length)
    return gradients[randomIndex]
  })

  const updatePeelProgress = useCallback((clientX: number) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect()
      const x = clientX - rect.left
      const buttonWidth = 32
      const maxWidth = rect.width - buttonWidth
      const progress = Math.min(Math.max((x / maxWidth) * 100, 0), 100)
      setPeelProgress(progress)
    }
  }, [])

  const handleStart = useCallback((clientX: number) => {
    setIsPeeling(true)
    updatePeelProgress(clientX)
  }, [updatePeelProgress])

  const handleMove = useCallback((clientX: number) => {
    if (isPeeling) {
      updatePeelProgress(clientX)
    }
  }, [isPeeling, updatePeelProgress])

  const triggerConfetti = () => {
    const count = 200
    const defaults = {
      origin: { y: 0.7 },
      zIndex: 999,
    }

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      })
    }

    fire(2.6, {
      spread: 360,
      startVelocity: 35,
      decay: 0.92,
      scalar: 1.1,
      origin: { x: 0.5, y: 0.3 },
    })
    fire(1.3, {
      spread: 365,
      startVelocity: 35,
      decay: 0.92,
      scalar: 0.9,
      origin: { x: 0.65, y: 0.3 },
    })
  }

  const handleEnd = useCallback(() => {
    if (isPeeling) {
      setIsPeeling(false)
      if (peelProgress > 95) {
        triggerConfetti()
        onReveal()
      } else {
        setPeelProgress(0)
      }
    }
  }, [isPeeling, peelProgress, onReveal])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX)
    const handleMouseUp = () => handleEnd()
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX)
    const handleTouchEnd = () => handleEnd()

    if (isPeeling) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleTouchMove)
      document.addEventListener('touchend', handleTouchEnd)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isPeeling, handleMove, handleEnd])

  const durations = getPrimeDurations()

  return (
    <motion.div 
      className="relative overflow-visible border-transparent rounded-2xl select-none" 
      ref={cardRef}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`,
        background: `
          linear-gradient(125deg, 
            ${randomGradient.start} 0%, 
            ${randomGradient.middle} 50%, 
            ${randomGradient.end} 100%
          )
        `,
        position: 'relative',
      }}
      initial={false}
    >
      {/* Base holographic effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl"
        style={{
          background: `
            radial-gradient(120% 120% at 50% 0%, 
              transparent 0%,
              rgba(255, 255, 255, 0.2) 20%, 
              rgba(123, 245, 255, 0.4) 40%,
              rgba(141, 171, 255, 0.4) 60%,
              rgba(255, 199, 255, 0.4) 80%,
              transparent 100%
            )
          `,
          mixBlendMode: 'soft-light'
        }}
        animate={{
          opacity: [0.6, 0.8, 0.7, 0.9, 0.6],
          scale: [1, 1.02, 1.01, 1.03, 1]
        }}
        transition={{
          duration: durations.medium,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut"
        }}
      />

      {/* Iridescent rotation */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          mixBlendMode: 'color-dodge'
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: '-50%',
            background: `
              conic-gradient(
                from 0deg at 50% 50%,
                ${randomGradient.start} 0deg,
                ${randomGradient.middle} 120deg,
                ${randomGradient.end} 240deg,
                ${randomGradient.start} 360deg
              )
            `,
            filter: 'blur(35px)',
            opacity: 0.25
          }}
          animate={{
            rotate: [0, 180, 360],
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            rotate: {
              duration: durations.veryLong,
              repeat: Infinity,
              ease: "linear"
            },
            scale: {
              duration: durations.medium,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            },
            opacity: {
              duration: durations.short,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut"
            }
          }}
        />
      </motion.div>

      {/* Floating particles */}
      <motion.div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          mixBlendMode: 'plus-lighter'
        }}
      >
        <motion.div
          style={{
            position: 'absolute',
            inset: '-20%',
            background: `
              radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.5) 0%, transparent 15%),
              radial-gradient(circle at 70% 60%, rgba(255, 255, 255, 0.5) 0%, transparent 15%),
              radial-gradient(circle at 40% 80%, rgba(255, 255, 255, 0.5) 0%, transparent 15%),
              radial-gradient(circle at 80% 30%, rgba(255, 255, 255, 0.5) 0%, transparent 15%),
              radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.5) 0%, transparent 15%)
            `,
            filter: 'blur(3px)'
          }}
          animate={{
            x: [0, 5, -5, 10, 0],
            y: [0, -10, 5, -5, 0],
            scale: [1, 1.05, 0.95, 1.02, 1]
          }}
          transition={{
            duration: durations.long,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            times: [0, 0.25, 0.5, 0.75, 1]
          }}
        />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-2 rounded-3xl"
        style={{
          background: `
            radial-gradient(70% 70% at 50% 50%, rgba(255, 255, 255, 0.3) 0%, transparent 100%),
            radial-gradient(90% 90% at 80% 20%, ${randomGradient.start}99 0%, transparent 100%),
            radial-gradient(80% 80% at 20% 80%, ${randomGradient.middle}99 0%, transparent 100%)
          `,
          filter: 'blur(20px)',
          opacity: 0.7
        }}
        animate={{
          opacity: [0.5, 0.7, 0.6, 0.8, 0.5],
          scale: [1, 1.02, 1.01, 1.03, 1]
        }}
        transition={{
          duration: durations.base,
          repeat: Infinity,
          repeatType: "mirror",
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1]
        }}
      />

      {/* Content shadow for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent rounded-2xl z-5" />

      <motion.div 
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-6xl font-bold text-white mb-4 drop-shadow-lg"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {name}
        </motion.h2>
        <motion.p 
          className="text-4xl text-white/90 drop-shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {role}
        </motion.p>
      </motion.div>

      {/* Peel overlay */}
      <div 
        className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-12 z-20"
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center backdrop-blur-sm">
          <span className="text-white text-lg z-10">Peel to unlock your feedback</span>
        </div>
        <div 
          className="absolute inset-y-0 left-0 bg-black bg-opacity-80"
          style={{ width: `${peelProgress}%` }}
        />
        <div
          className="absolute inset-y-0"
          style={{ 
            left: `${peelProgress}%`, 
            transform: 'translateX(-100%)'
          }}
        >
          <motion.div
            className="h-full w-8 bg-red-500 cursor-pointer flex items-center justify-center rounded-l-[10px]"
            onMouseDown={(e) => handleStart(e.clientX)}
            onTouchStart={(e) => handleStart(e.touches[0].clientX)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
} 