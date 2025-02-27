"use server"

import { db } from "@/lib/db"
import { revalidatePath } from "next/cache"

interface CreateBlogData {
  title: string
  description: string
  content: string
  image: string
  category: string
  status: "draft" | "published"
}

export async function createBlog(data: CreateBlogData) {
  try {
    const blog = await db.blog.create({
      data: {
        ...data,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    })

    revalidatePath("/blog")
    return blog
  } catch (error) {
    console.error("Error creating blog:", error)
    throw new Error("Failed to create blog")
  }
}

interface CreateEventData {
    title: string
    description: string
    date: Date
    time: string
    location: string
    category: string
    capacity: string
    image: string
    speakers: Array<{
      name: string
      role: string
      image?: string
    }>
    status: "draft" | "published"
  }
  
  export async function createEvent(data: CreateEventData) {
    try {
      const event = await db.event.create({
        data: {
          ...data,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      })
  
      revalidatePath("/event")
      return event
    } catch (error) {
      console.error("Error creating event:", error)
      throw new Error("Failed to create event")
    }
  }
  

