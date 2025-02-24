"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TDD%20Black-l7CxZ58JjjcLsdShVzzWBmRlmlfiY1.png"
                alt="The Disruptors Den"
                width={120}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/events">Event</NavLink>
            <NavLink href="/programs">Programs</NavLink>
            <NavLink href="/blog">Blog</NavLink>
            <NavLink href="/about">About Us</NavLink>
          </div>

          <div className="hidden md:flex items-center">
            <Button className="bg-[#f5aa14] hover:bg-[#f5aa14]/90 text-[#00144b] font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
              Join
            </Button>
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-800 focus:outline-none">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink href="/">Home</MobileNavLink>
            <MobileNavLink href="/events">Event</MobileNavLink>
            <MobileNavLink href="/programs">Programs</MobileNavLink>
            <MobileNavLink href="/blog">Blog</MobileNavLink>
            <MobileNavLink href="/about">About Us</MobileNavLink>
          </div>
          <div className="px-4 py-3">
            <Button className="w-full bg-[#f5aa14] hover:bg-[#f5aa14]/90 text-[#00144b] font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
              Join
            </Button>
          </div>
        </div>
      )}
    </nav>
  )
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-800 hover:text-[#f5aa14] transition-colors px-3 py-2 text-sm font-medium">
      {children}
    </Link>
  )
}

function MobileNavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-gray-800 hover:text-[#f5aa14] block px-3 py-2 rounded-md text-base font-medium">
      {children}
    </Link>
  )
}

