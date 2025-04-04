import type React from "react"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"], display: "swap" })

export default function PricingLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <div className={`${inter.className} font-sans`}>{children}</div>
}

