"use client";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null);

  const bentoImages = [
    { src: "/tdd3.avif", alt: "Entrepreneur 1", className: "col-span-2 row-span-2" },
    { src: "/tdd4.jpg", alt: "Entrepreneur 2", className: "col-span-1 row-span-1" },
    { src: "/tdd5.jpg", alt: "Entrepreneur 3", className: "col-span-1 row-span-1" },
    { src: "/placeholder.svg", alt: "Entrepreneur 4", className: "col-span-2 row-span-1" },
  ];

  return (
    <section className="w-full min-h-screen bg-gray-50 flex items-center">
      <div className="max-w-[90rem] mx-auto px-6 sm:px-12 lg:px-16 py-16 lg:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-24">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-8">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Empowering Struggling Entrepreneurs
            </motion.h1>
            <motion.p
              className="text-lg text-gray-600 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We provide the support, resources, and community you need to
              overcome challenges and thrive in your entrepreneurial journey.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link href="https://t.me/disruptorsden" target="_blank" rel="noopener noreferrer">
                <Button className="bg-[#00144b] hover:bg-[#00144b]/90 text-white font-medium px-8 py-3 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
                  Get Started
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Bento Box Images */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-3 grid-rows-2 gap-8 aspect-square">
              {bentoImages.map((image, index) => (
                <motion.div
                  key={index}
                  className={`relative overflow-hidden rounded-3xl ${image.className}`}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredBox(index)}
                  onHoverEnd={() => setHoveredBox(null)}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 hover:scale-110"
                  />
                  {hoveredBox === index && (
                    <motion.div
                      className="absolute inset-0 bg-[#00144b]/60 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-center text-lg font-semibold px-4">
                        {`Success Story ${index + 1}`}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
