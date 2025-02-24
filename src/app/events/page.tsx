"use client"

import { useRef, useState, useEffect, useCallback } from "react"
import { EventCard } from "@/components/layout/EventCard"
import { ChevronLeft, ChevronRight } from "lucide-react"
import DenCommunityPage from "@/components/layout/EventVido"

const events = [
  {
    title: "AI & Innovation Forum",
    image: "/meetup.jpeg?height=192&width=320",
    date: "April 10, 2025",
    location: "TBA",
    time: "TBA",
    topic: "AI & Innovation",
    speakers: "TBA",
  },
  {
    title: "Startup Funding Masterclass",
    image: "/meetup.jpeg?height=192&width=320",
    date: "April 15, 2025",
    location: "ALX ETHIOPIA, CityPoint Tech Hub",
    time: "3:00 PM",
    topic: "Fundraising & Investment",
    speakers: "Abel Kebede Fekadu",
  },
  {
    title: "Tech Entrepreneurship Workshop",
    image: "/meetup.jpeg?height=192&width=320",
    date: "April 20, 2025",
    location: "ALX ETHIOPIA, CityPoint Tech Hub",
    time: "2:30 PM",
    topic: "Entrepreneurship",
    speakers: "Betelhem Dessie",
  },
  {
    title: "Digital Marketing Strategy",
    image: "/meetup.jpeg?height=192&width=320",
    date: "April 25, 2025",
    location: "ALX ETHIOPIA, CityPoint Tech Hub",
    time: "4:00 PM",
    topic: "Digital Marketing",
    speakers: "Abenazzer B. Tadesse",
  },
  {
    title: "Blockchain & Web3 Development",
    image: "/meetup.jpeg?height=192&width=320",
    date: "May 1, 2025",
    location: "ALX ETHIOPIA, CityPoint Tech Hub",
    time: "2:00 PM",
    topic: "Blockchain Technology",
    speakers: "Bereket Semagn",
  },
  {
    title: "Product Management Essentials",
    image: "/meetup.jpeg?height=192&width=320",
    date: "May 5, 2025",
    location: "ALX ETHIOPIA, CityPoint Tech Hub",
    time: "3:30 PM",
    topic: "Product Management",
    speakers: "Eyoel Teshome",
  },
  {
    title: "UX/UI Design Principles",
    image: "/meetup.jpeg?height=192&width=320",
    date: "May 10, 2025",
    location: "ALX ETHIOPIA, CityPoint Tech Hub",
    time: "2:00 PM",
    topic: "Design",
    speakers: "Yishak Tofik",
  },
  {
    title: "Data Science & Analytics",
    image: "/meetup.jpeg?height=192&width=320",
    date: "May 15, 2025",
    location: "ALX ETHIOPIA, CityPoint Tech Hub",
    time: "4:00 PM",
    topic: "Data Science",
    speakers: "Hanna Teklu",
  },
  {
    title: "Cloud Computing Workshop",
    image: "/meetup.jpeg?height=192&width=320",
    date: "May 20, 2025",
    location: "ALX ETHIOPIA, CityPoint Tech Hub",
    time: "2:30 PM",
    topic: "Cloud Technology",
    speakers: "Michael Tamiru",
  },
  {
    title: "Cybersecurity Fundamentals",
    image: "/meetup.jpeg?height=192&width=320",
    date: "May 25, 2025",
    location: "ALX ETHIOPIA, CityPoint Tech Hub",
    time: "3:00 PM",
    topic: "Cybersecurity",
    speakers: "Samuel Mekonnen",
  },
{
  title: "AI & Innovation Forum",
    image: "/meetup.jpeg?height=192&width=320",
    date: "April 10, 2025",
    location: "TBA",
    time: "TBA",
    topic: "AI & Innovation",
    speakers: "TBA",
}
]

export default function EventsPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setShowLeftArrow(scrollLeft > 0)
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1)
    }
  }, [])

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll)
      handleScroll()
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll)
      }
    }
  }, [handleScroll])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Main container with consistent padding */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Header section */}
        <div className="py-8">
          <h1 className="text-3xl font-bold text-center text-[#00144b] dark:text-white">Upcoming Events</h1>
        </div>

        {/* Video section with consistent margins */}
        <div className="mb-12">
          <DenCommunityPage />
        </div>
        <h1>Events</h1>


        {/* Events carousel section */}
        <div className="relative px-4">
          <div className="max-w-full overflow-hidden">
            <div
              ref={scrollContainerRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 -mx-4 px-4"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                gridAutoFlow: "column",
                gridAutoColumns: "calc((100% - 18rem) / 4)",
              }}
            >
              {events.map((event, index) => (
                <div key={index} className="flex-shrink-0 w-[calc((100%-72px)/4)]">
                  <EventCard {...event} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          {showLeftArrow && (
            <button
              onClick={() => scroll("left")}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md z-10"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6 text-[#00144b] dark:text-white" />
            </button>
          )}
          {showRightArrow && (
            <button
              onClick={() => scroll("right")}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md z-10"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6 text-[#00144b] dark:text-white" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

