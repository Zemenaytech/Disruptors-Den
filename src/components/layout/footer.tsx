"use client";
import Image from "next/image";
import Link from "next/link";
import { Phone, Mail, Linkedin, Send } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-[#00144b] text-white/90 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col md:flex-row justify-between space-y-8 md:space-y-0 md:space-x-8">
          {/* Brand Column */}
          <div className="space-y-6 text-left">
            <Link href="/" className="block">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/TDD%20White-Y1zLvYCjgZArslwudo5YS0bQlvmQhV.png"
                alt="The Disruptors Den"
                width={360}
                height={80}
                className="h-20 w-auto"
                priority
              />
            </Link>
            <p className="text-sm text-white/70 max-w-xs ">
              A community providing a vibrant platform for entrepreneurs,
              fostering collaboration, innovation, and growth through
              networking, shared resources, and mentorship opportunities.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold text-[#f5aa14]">Vision</h3>
              <p className="text-sm text-white/70">
                Seeing a thriving Africa where innovation knows no bound.
              </p>
            </div>
          </div>

          {/* Main Pages */}
          <div className="text-left">
            <h3 className="font-semibold text-lg mb-4 mt-6">Main Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm hover:text-[#f5aa14] transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-sm hover:text-[#f5aa14] transition-colors"
                >
                  Event
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm hover:text-[#f5aa14] transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm hover:text-[#f5aa14] transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="text-left">
            <h3 className="font-semibold text-lg mt-6 mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex justify-start items-center space-x-3">
                <Phone className="h-5 w-5 text-[#f5aa14]" />
                <span className="text-sm">+251913398561</span>
              </li>
              <li className="flex justify-start items-center space-x-3">
                <Phone className="h-5 w-5 text-[#f5aa14]" />
                <span className="text-sm">+251944131837</span>
              </li>
              <li className="flex justify-start items-center space-x-3">
                <Mail className="h-5 w-5 text-[#f5aa14]" />
                <a
                  href="mailto:contact@thedisruptorsden.org"
                  className="text-sm hover:text-[#f5aa14] transition-colors"
                >
                  contact@thedisruptorsden.org
                </a>
              </li>
              <li className="pt-4 space-y-4">
                <a
                  href="https://www.linkedin.com/company/disruptorsden/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-start items-center space-x-3 hover:text-[#f5aa14] transition-colors group"
                >
                  <Linkedin className="h-5 w-5 text-[#f5aa14] group-hover:scale-110 transition-transform" />
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a
                  href="https://t.me/disruptorsden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex justify-start items-center space-x-3 hover:text-[#f5aa14] transition-colors group"
                >
                  <Send className="h-5 w-5 text-[#f5aa14] group-hover:scale-110 transition-transform" />
                  <span className="text-sm">Telegram</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-white/70">
              © {year} The Disruptors Den. All rights reserved.
            </p>
            <p className="text-sm text-white/70">
              Fostering Entrepreneurs, Fueling Progress
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
