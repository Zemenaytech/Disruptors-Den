"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import DenCommunityPage from "@/components/layout/EventVido";
import { EventCarousel } from "@/components/event-ui/event-carousel";

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
  },
];

export default function EventsPage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 1);
    }
  }, []);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => {
        scrollContainer.removeEventListener("scroll", handleScroll);
      };
    }
  }, [handleScroll]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount = direction === "left" ? -clientWidth : clientWidth;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen">
      {/* Main container with consistent padding */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Header section */}
        <div className="py-8">
          <h1 className="text-3xl font-bold text-center text-[#00144b] dark:text-white">
            Upcoming Events
          </h1>
        </div>

        {/* Video section with consistent margins */}
        <div className="mb-12">
          <DenCommunityPage />
        </div>
        <h1>Events</h1>
        <div className="container mx-auto py-12">
          <EventCarousel events={events} />
        </div>
      </div>
    </div>
  );
}
