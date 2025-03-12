"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft } from "lucide-react";
import RichTextEditor from "@/app/(dashboard)/admin/blog/create/rich-text-editor";

export default function EditPost({ params }: { params: { id: string } }) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real application, you would fetch the post data based on the ID
    const postId = Number.parseInt(params.id);
    const post = blogPosts.find((p) => p.id === postId);

    if (post) {
      setTitle(post.title);
      setSummary(post.summary);
      setAuthor(post.author);
      setContent(
        "<h2>Introduction</h2><p>This is the full content of the blog post that would be loaded from the database.</p><ul><li>Point one</li><li>Point two</li><li>Point three</li></ul><blockquote><p>This is a quote from someone important.</p></blockquote>"
      );
      setImagePreview(post.image);
    }

    setLoading(false);
  }, [params.id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would update the post data
    console.log({ title, summary, author, content });
    // The 'content' variable now contains the full HTML string
    // You can use this directly when updating and rendering the blog post
    alert("Post updated successfully!");
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/admin" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
      </Button>

      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary of your post"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Your name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Featured Image</Label>
            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-[200px] rounded-md border"
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" asChild>
              <Link href="/admin">Cancel</Link>
            </Button>
            <Button type="submit">Update Post</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Next.js",
    slug: "getting-started-with-nextjs",
    summary: "Learn how to build modern web applications with Next.js",
    image: "/placeholder.svg?height=400&width=600",
    author: "Jane Doe",
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "The Power of Tailwind CSS",
    slug: "power-of-tailwind-css",
    summary:
      "Discover why Tailwind CSS is changing the way we style web applications",
    image: "/placeholder.svg?height=400&width=600",
    author: "John Smith",
    date: "2023-06-22",
  },
  {
    id: 3,
    title: "Building a Blog with Next.js and Tailwind",
    slug: "building-blog-nextjs-tailwind",
    summary: "A step-by-step guide to creating your own blog platform",
    image: "/placeholder.svg?height=400&width=600",
    author: "Alex Johnson",
    date: "2023-07-10",
  },
];
