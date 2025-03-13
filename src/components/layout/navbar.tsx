"use client";

import type React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = useCallback((open: boolean) => {
    return new Promise<void>((resolve) => {
      setIsMenuOpen(open);
      setTimeout(resolve, 500);
    });
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="max-w-[95%] mx-auto flex justify-between items-center h-[87px] px-8">
        
        {/* Logo pushed to the left */}
        <div className="flex-shrink-0 pl-0">
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

        {/* Navbar links & button pushed to the right */}
        <div className="hidden md:flex items-center space-x-8 justify-end pr-0">
          <NavLink href="/">Home</NavLink>
          <NavLink href="/about">About Us</NavLink>
          <NavLink href="/programs">Programs</NavLink>
          <NavLink href="/events">Events</NavLink>
          <NavLink href="/blog">Blog</NavLink>

          <Button className="bg-[#f5aa14] hover:bg-[#f5aa14]/90 text-[#00144b] font-medium px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105">
            <a
              href="https://www.linkedin.com/company/disruptorsden/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center space-x-3 hover:text-[#f5aa14] transition-colors group"
            >
              <span className="text-sm">Join</span>
            </a>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => toggleMenu(!isMenuOpen)}
            className="text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-black/90 backdrop-blur-lg flex flex-col"
          >
            <div className="flex justify-end p-6">
              <button
                onClick={() => toggleMenu(false)}
                className="text-white focus:outline-none"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <div className="flex flex-col justify-between h-full pb-10">
              <div className="flex-1 flex flex-col items-center justify-center w-full space-y-8 text-center">
                <MobileNavLink href="/" toggleMenu={toggleMenu}>
                  Home
                </MobileNavLink>
                <MobileNavLink href="/events" toggleMenu={toggleMenu}>
                  Events
                </MobileNavLink>
                <MobileNavLink href="/programs" toggleMenu={toggleMenu}>
                  Programs
                </MobileNavLink>
                <MobileNavLink href="/blog" toggleMenu={toggleMenu}>
                  Blog
                </MobileNavLink>
                <MobileNavLink href="/about" toggleMenu={toggleMenu}>
                  About Us
                </MobileNavLink>
              </div>

              <div className="w-full px-8 mt-auto">
                <Button className="w-full bg-[#f5aa14] hover:bg-[#f5aa14]/90 text-[#00144b] font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 text-lg">
                  Join
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={
        pathname === href
          ? "text-[#f5aa14] font-sans font-semibold transition-colors"
          : "text-gray-800 hover:text-[#f5aa14] font-sans font-semibold transition-colors px-3 py-2 text-sm"
      }
    >
      {children}
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  toggleMenu,
}: {
  href: string;
  children: React.ReactNode;
  toggleMenu: (open: boolean) => Promise<void>;
}) {
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    await toggleMenu(false);
    router.push(href);
  };

  return (
    <a
      href={href}
      className="text-white hover:text-[#f5aa14] font-sans font-semibold block px-3 py-4 text-2xl transition-colors"
      onClick={handleClick}
    >
      {children}
    </a>
  );
}
