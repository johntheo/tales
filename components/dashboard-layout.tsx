"use client"

import { ReactNode, useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Menu, User, Home, LogOut, Plus } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DashboardLayoutProps {
  children: ReactNode
  sidebarContent: ReactNode
  userEmail: string
  onNewFeedback: () => void
  onLogout: () => void
}

export function DashboardLayout({
  children,
  sidebarContent,
  userEmail,
  onNewFeedback,
  onLogout
}: DashboardLayoutProps) {
  const router = useRouter()
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Function to get a consistent color based on email
  const getAvatarColor = (email: string) => {
    const colors = [
      'bg-slate-900 text-white',
      'bg-emerald-500 text-white',
      'bg-violet-500 text-white',
      'bg-pink-500 text-white',
      'bg-indigo-500 text-white',
      'bg-blue-500 text-white'
    ]
    const index = email.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return colors[index % colors.length]
  }

  const SidebarHeader = () => (
    <div className="flex items-center h-14 px-4 border-b border-border">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5Btales%5D-logo-cr5dVmAyZBoyYbXBQ1bLbyRXtpQGBW.svg"
        alt="Tales"
        width={80}
        height={28}
        className="cursor-pointer"
        onClick={() => router.push("/")}
      />
    </div>
  )

  const UserSection = () => (
    <div className="mt-auto p-4 border-t border-border">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="w-full h-10 px-2 justify-start hover:bg-accent/5">
            <div className="flex items-center gap-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback className={`${getAvatarColor(userEmail)} flex items-center justify-center text-sm`}>
                  {userEmail[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm flex-1 text-left truncate">{userEmail}</span>
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-[280px]">
          <DropdownMenuItem onClick={() => router.push("/")}>
            <Home className="mr-2 h-4 w-4" />
            Home
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Desktop sidebar */}
      {!isMobile && (
        <div className="flex flex-col w-[280px] border-r border-border bg-card">
          <SidebarHeader />
          <div className="flex-1 overflow-hidden p-2 flex flex-col">
            <Button
              variant="default"
              size="sm"
              onClick={onNewFeedback}
              className="w-full mb-2 text-sm justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm"
            >
              <Plus className="h-4 w-4" />
              New Feedback
            </Button>
            <ScrollArea className="flex-1 w-full">
              <div className="pr-2">
                {sidebarContent}
              </div>
            </ScrollArea>
          </div>
          <UserSection />
        </div>
      )}

      {/* Mobile header */}
      {isMobile && (
        <>
          <div className="fixed top-0 left-0 right-0 h-14 border-b border-border bg-card/80 backdrop-blur-sm z-50 flex items-center px-4 gap-4">
            <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0 flex flex-col">
                <SidebarHeader />
                <div className="flex-1 overflow-hidden p-2 flex flex-col">
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      onNewFeedback();
                      setIsDrawerOpen(false);
                    }}
                    className="w-full mb-2 text-sm justify-start gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm"
                  >
                    <Plus className="h-4 w-4" />
                    New Feedback
                  </Button>
                  <ScrollArea className="flex-1 w-full">
                    <div className="pr-2">
                      {sidebarContent}
                    </div>
                  </ScrollArea>
                </div>
                <UserSection />
              </SheetContent>
            </Sheet>
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%5Btales%5D-logo-cr5dVmAyZBoyYbXBQ1bLbyRXtpQGBW.svg"
              alt="Tales"
              width={80}
              height={32}
              className="cursor-pointer"
              onClick={() => router.push("/")}
            />
            <div className="flex-1" />
            <Button 
              variant="default"
              size="sm"
              onClick={onNewFeedback}
              className="shrink-0 bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm"
            >
              <Plus className="h-4 w-4 mr-2" />
              New
            </Button>
          </div>
        </>
      )}

      {/* Main content area */}
      <div className={`flex-1 overflow-hidden ${isMobile ? 'pt-14' : ''}`}>
        <ScrollArea className="h-full">
          {children}
        </ScrollArea>
      </div>
    </div>
  )
} 