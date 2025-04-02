"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CarouselItem {
  image: string;
  title: string;
  description: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

export function Carousel({ items }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length]);

  const goToPrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + items.length) % items.length
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      {/* Carousel items */}
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentIndex
              ? "opacity-100"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div className="absolute inset-0 bg-black/50 z-10" />
          <Image
            src={item.image || "/placeholder.svg"}
            alt={item.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-20 px-4">
            <h1
              className="text-4xl md:text-6xl font-bold mb-4 text-center"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                transform:
                  index === currentIndex ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 1s ease, transform 1s ease",
                transitionDelay: "0.3s",
              }}
            >
              {item.title}
            </h1>
            <p
              className="text-xl md:text-2xl max-w-2xl text-center"
              style={{
                opacity: index === currentIndex ? 1 : 0,
                transform:
                  index === currentIndex ? "translateY(0)" : "translateY(20px)",
                transition: "opacity 1s ease, transform 1s ease",
                transitionDelay: "0.6s",
              }}
            >
              {item.description}
            </p>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/40 border-none text-white"
        onClick={goToPrevious}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/20 backdrop-blur-sm hover:bg-white/40 border-none text-white"
        onClick={goToNext}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-white w-6" : "bg-white/50"}`}
            onClick={() => setCurrentIndex(index)}
          >
            <span className="sr-only">Go to slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
