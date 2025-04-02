"use client"

import * as React from "react"
import Image from "next/image"
import { ImagePlus, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ImageUploadProps {
  value: string
  onChange: (value: string) => void
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isUploading, setIsUploading] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleUpload = async (file: File) => {
    setIsUploading(true)
    try {
      // Here you would typically:
      // 1. Upload the file to your storage service (e.g., S3, Cloudinary)
      // 2. Get back the URL of the uploaded image
      // For now, we'll simulate this with a timeout
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const imageUrl = URL.createObjectURL(file)
      onChange(imageUrl)
    } catch (error) {
      console.error("Error uploading image:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange("")
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) {
            handleUpload(file)
          }
        }}
      />
      {value ? (
        <div className="relative">
          <Image
            src={value || "/placeholder.svg"}
            alt="Upload"
            className="rounded-lg object-cover"
            width={200}
            height={200}
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute -top-2 -right-2"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button type="button" variant="outline" disabled={isUploading} onClick={() => inputRef.current?.click()}>
          <ImagePlus className="mr-2 h-4 w-4" />
          {isUploading ? "Uploading..." : "Upload Image"}
        </Button>
      )}
    </div>
  )
}

