"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { fetchBlogById, updateBlog } from "@/lib/blogSlice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2 } from "lucide-react";
import RichTextEditor from "@/app/(dashboard)/admin/blog/create/rich-text-editor";
import { toast } from "@/components/ui/use-toast";
import { useSelector } from "react-redux";

export default function EditPost() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const params = useParams();
  const { blog, status, error } = useSelector((state: RootState) => state.blog);

  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");

  useEffect(() => {
    if (typeof params.id == "string") {
      const fetchBlogData = async () => {
        try {
          await dispatch(fetchBlogById(params.id as string)).unwrap();

          if (blog) {
            setBlogId(blog.id);
            setTitle(blog.title);
            setSummary(blog.summary || "");
            setAuthor(blog.author);
            setContent(blog.content);
            setImageUrl(blog.imageUrl);
            setCreatedAt(blog.createdAt || "");
            setUpdatedAt(blog.updatedAt || "");
          } else {
            toast({
              title: "Error",
              description: "Blog post not found",
              variant: "destructive",
            });
            // router.push("/blogs");
          }
        } catch (error) {
          console.error("Failed to fetch blog:", error);
          toast({
            title: "Error",
            description: "Failed to load blog post",
            variant: "destructive",
          });
        }
      };

      if (params.id) {
        fetchBlogData();
      }
    }
  }, [params.id, dispatch, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await dispatch(
        updateBlog({
          id: blogId,
          title,
          summary,
          content,
          author,
          imageUrl,
          createdAt,
          updatedAt,
        })
      ).unwrap();

      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });

      router.push("/blog");
    } catch (error) {
      console.error("Failed to update blog:", error);
      toast({
        title: "Error",
        description: "Failed to update blog post",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (status == "loading") {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading blog post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/admin/blog" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to blogs
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
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL"
              required
            />
            {imageUrl && (
              <div className="mt-2">
                <img
                  src={imageUrl || "/placeholder.svg?height=200&width=400"}
                  alt="Preview"
                  className="max-h-[200px] rounded-md border object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "/placeholder.svg?height=200&width=400";
                  }}
                />
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <RichTextEditor value={content} onChange={setContent} />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/blog")}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Update Post"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
