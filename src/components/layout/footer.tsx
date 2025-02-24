import Image from "next/image"
import Link from "next/link"
import { Phone, Mail, Linkedin, Send } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#00144b] text-white/90 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="space-y-6">
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
            <p className="text-sm text-white/70 max-w-xs">
              A community providing a vibrant platform for entrepreneurs, fostering collaboration, innovation, and
              growth through networking, shared resources, and mentorship opportunities.
            </p>
            <div className="space-y-2">
              <h3 className="font-semibold text-[#f5aa14]">Vision</h3>
              <p className="text-sm text-white/70">Seeing a thriving Africa where innovation knows no bound.</p>
            </div>
          </div>

          {/* Main Pages */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Main Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm hover:text-[#f5aa14] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/event" className="text-sm hover:text-[#f5aa14] transition-colors">
                  Event
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:text-[#f5aa14] transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-[#f5aa14] transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Our Programs */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Programs</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/programs/media" className="text-sm hover:text-[#f5aa14] transition-colors">
                  Disruptors Media
                </Link>
              </li>
              <li>
                <Link href="/programs/business" className="text-sm hover:text-[#f5aa14] transition-colors">
                  Business እናውጋ
                </Link>
              </li>
              <li>
                <Link href="/programs/academy" className="text-sm hover:text-[#f5aa14] transition-colors">
                  Disruptors Academy
                </Link>
              </li>
              <li>
                <Link href="/programs/meetup" className="text-sm hover:text-[#f5aa14] transition-colors">
                  Weekly Coffee Meetup
                </Link>
              </li>
              <li>
                <Link href="/programs/adventure" className="text-sm hover:text-[#f5aa14] transition-colors">
                  Disruptors Adventure
                </Link>
              </li>
              <li>
                <Link href="/programs/kasma" className="text-sm hover:text-[#f5aa14] transition-colors">
                  ካስማ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#f5aa14]" />
                <span className="text-sm">+251913398561</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#f5aa14]" />
                <span className="text-sm">+251944131837</span>
              </li>
              <li className="flex items-center space-x-3">
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
                  className="flex items-center space-x-3 hover:text-[#f5aa14] transition-colors group"
                >
                  <Linkedin className="h-5 w-5 text-[#f5aa14] group-hover:scale-110 transition-transform" />
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a
                  href="https://t.me/disruptorsden"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 hover:text-[#f5aa14] transition-colors group"
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
              © {new Date().getFullYear()} The Disruptors Den. All rights reserved.
            </p>
            <p className="text-sm text-white/70">Fostering Entrepreneurs, Fueling Progress</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

