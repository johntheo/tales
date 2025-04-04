"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { TrustSecurityModal } from "@/components/trust-security-modal"

interface HeaderProps {
  dashboardPage?: boolean
  feedbackPage?: boolean
}

export function Header({ dashboardPage = false, feedbackPage = false }: HeaderProps) {
  const router = useRouter()
  const [trustModalOpen, setTrustModalOpen] = useState(false)

  const handleNewFeedback = () => {
    router.push("/app")
  }

  return (
    <header className="bg-white border-b border-[#e4e4e7] py-4 px-6 flex justify-between items-center animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8 bg-indigo-600">
            <AvatarImage src="https://randomuser.me/api/portraits/women/1.jpg" alt="Alicia Koch" />
            <AvatarFallback>AK</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Alicia Koch</span>
          <ChevronDown size={16} className="text-[#71717a]" />
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="text-sm" onClick={() => setTrustModalOpen(true)}>
          Trust and Security
        </Button>
        {!dashboardPage && !feedbackPage && (
          <Button variant="ghost" className="text-sm">
            Solution
          </Button>
        )}
        <Button
          variant="default"
          size="sm"
          onClick={handleNewFeedback}
          className="bg-black text-white hover:bg-black/90"
        >
          New Feedback
        </Button>
      </div>

      <TrustSecurityModal open={trustModalOpen} onOpenChange={setTrustModalOpen} />
    </header>
  )
}

