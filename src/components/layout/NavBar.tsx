"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useTheme } from "next-themes"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const currentTheme = theme || resolvedTheme

  return (
    <div className="relative w-full min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('/Addis-Ababa.jpeg')" }}>
      <nav
        className="w-full navbar-text font-roboto"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          boxSizing: "border-box",
          paddingTop: "0.3vw",
          paddingBottom: "0.3vw",
          pointerEvents: "auto",
          transition: "background-color 0.3s ease-in-out"
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-12 flex justify-between items-center">
          <div className="flex-shrink-0" style={{ marginLeft: "-10vw" }}> 
            <Link href="/" className="block">
              {currentTheme && (
                <Image
                  src={
                    currentTheme === "dark"
                      ? "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TDD%20White-Y1zLvYCjgZArslwudo5YS0bQlvmQhV.png"
                      : "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TDD%20Black-l7CxZ58JjjcLsdShVzzWBmRlmlfiY1.png"
                  }
                  alt="The Disruptors Den"
                  width={160}
                  height={50}
                  className="h-auto w-auto"
                  priority
                />
              )}
            </Link>
          </div>
          <div className="header-nav-list hidden lg:flex lg:items-center lg:space-x-5 text-[18px] ml-auto">
            <Link href="/" className="text-gray-800 dark:text-white/90 hover:text-[#f5aa14] transition-colors px-2 py-2 font-medium">
              Home
            </Link>
            <Link href="/events" className="text-gray-800 dark:text-white/90 hover:text-[#f5aa14] transition-colors px-2 py-2 font-medium">
              Event
            </Link>
            <Link href="/blog" className="text-gray-800 dark:text-white/90 hover:text-[#f5aa14] transition-colors px-2 py-2 font-medium">
              Blog
            </Link>
            <Link href="/about" className="text-gray-800 dark:text-white/90 hover:text-[#f5aa14] transition-colors px-2 py-2 font-medium">
              About Us
            </Link>
            <div className="ml-auto" style={{ marginRight: "-10vw" }}>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#f5aa14] hover:bg-[#f5aa14]/90 text-[#00144b] font-medium text-lg px-24 py-6 rounded-full">
                  Join
                </Button>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </div>
  )
}
