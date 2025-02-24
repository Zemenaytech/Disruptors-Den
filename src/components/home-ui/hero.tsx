"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Hero() {
  const [hoveredBox, setHoveredBox] = useState<number | null>(null)

  const bentoImages = [
    { src: "/tdd3.avif?height=400&width=400", alt: "Entrepreneur 1", className: "col-span-2 row-span-2" },
    { src: "/tdd4.jpg?height=200&width=200", alt: "Entrepreneur 2", className: "col-span-1 row-span-1" },
    { src: "/tdd5.jpg?height=200&width=200", alt: "Entrepreneur 3", className: "col-span-1 row-span-1" },
    { src: "/placeholder.svg?height=200&width=400", alt: "Entrepreneur 4", className: "col-span-2 row-span-1" },
  ]

  return (
    <section className="w-full min-h-screen bg-gray-50 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <motion.h1
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Empowering Struggling Entrepreneurs
            </motion.h1>
            <motion.p
              className="text-base text-gray-600 max-w-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              We provide the support, resources, and community you need to overcome challenges and thrive in your
              entrepreneurial journey.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Button className="bg-[#00144b] hover:bg-[#00144b]/90 text-white font-medium px-6 py-2 rounded-full text-sm transition-all duration-300 transform hover:scale-105">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>

          {/* Bento Box Images */}
          <div className="w-full lg:w-1/2">
            <div className="grid grid-cols-3 grid-rows-2 gap-3 aspect-square">
              {bentoImages.map((image, index) => (
                <motion.div
                  key={index}
                  className={`relative overflow-hidden rounded-2xl ${image.className}`}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setHoveredBox(index)}
                  onHoverEnd={() => setHoveredBox(null)}
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
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
                      <p className="text-white text-center text-sm font-semibold px-4">
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
  )
}

