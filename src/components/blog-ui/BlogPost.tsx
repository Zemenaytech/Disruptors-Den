"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Bookmark } from "lucide-react"

interface BlogPostProps {
  id: string
  title: string
  content: string
  author: string
  date: string
  imageUrl: string
  isBookmarked?: boolean
}

export function BlogPost({ id, title, content, author, date, imageUrl, isBookmarked = false }: BlogPostProps) {
  const [expanded, setExpanded] = useState(false)
  const [bookmarked, setBookmarked] = useState(isBookmarked)

  const toggleExpand = () => {
    setExpanded(!expanded) // Toggle between expanded and collapsed state
  }

  const toggleBookmark = () => {
    setBookmarked(!bookmarked)
  }

  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  const truncatedContent = content.split("</p>")[0] + "</p>"

  return (
    <article className="border-b border-gray-200 dark:border-gray-700 pb-8">
      <h2 className="text-2xl font-bold text-[#00144b] dark:text-white mb-2">{title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        By {author} | {formattedDate}
      </p>
      <div className="relative h-64 w-full mb-6">
        <Image src={imageUrl || "/placeholder.svg"} alt={title} fill className="object-cover rounded-lg" />
      </div>
      <div className="prose dark:prose-invert max-w-none mb-6">
        <div dangerouslySetInnerHTML={{ __html: expanded ? content : truncatedContent }} />
      </div>
      <div className="flex justify-between items-center">
        <Button onClick={toggleExpand} variant="outline">
          {expanded ? "Less" : "Read More"}
        </Button>
        <Button variant="ghost" onClick={toggleBookmark} aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}>
          <Bookmark className={`h-5 w-5 ${bookmarked ? "fill-[#f5aa14]" : "text-gray-500"}`} />
        </Button>
      </div>
    </article>
  )
}
