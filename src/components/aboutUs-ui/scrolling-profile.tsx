"use client"

import { useRef, useEffect } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const profiles = [
  { name: "Alex Innovator", role: "Visionary Lead", image: "/placeholder.svg?height=200&width=200" },
  { name: "Sam Disruptor", role: "Innovation Catalyst", image: "/placeholder.svg?height=200&width=200" },
  { name: "Jordan Futurist", role: "Strategy Architect", image: "/placeholder.svg?height=200&width=200" },
  { name: "Taylor Tech", role: "AI Specialist", image: "/placeholder.svg?height=200&width=200" },
  { name: "Morgan Venture", role: "Investment Guru", image: "/placeholder.svg?height=200&width=200" },
  { name: "Casey Creator", role: "Design Maverick", image: "/placeholder.svg?height=200&width=200" },
  { name: "Riley Robotics", role: "Automation Expert", image: "/placeholder.svg?height=200&width=200" },
  { name: "Quinn Quantum", role: "Quantum Computing Lead", image: "/placeholder.svg?height=200&width=200" },
]

export function ScrollingProfiles() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.5 })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [isInView, controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  }

  const scrollingVariants = {
    animate: {
      x: [0, -100 * profiles.length],
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        },
      },
    },
  }

  return (
    <div ref={containerRef} className="overflow-hidden">
      <motion.div className="flex space-x-6 py-4" variants={containerVariants} initial="hidden" animate={controls}>
        <motion.div className="flex space-x-6" variants={scrollingVariants} animate="animate">
          {[...profiles, ...profiles].map((profile, index) => (
            <Card
              key={`${profile.name}-${index}`}
              className="w-64 flex-shrink-0 bg-primary/10 backdrop-blur-sm border-primary/20"
            >
              <CardHeader>
                <Image
                  src={profile.image || "/placeholder.svg"}
                  alt={profile.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
              </CardHeader>
              <CardContent className="text-center">
                <CardTitle className="text-primary">{profile.name}</CardTitle>
                <CardDescription>{profile.role}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

