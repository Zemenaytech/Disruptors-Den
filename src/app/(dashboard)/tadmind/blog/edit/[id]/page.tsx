"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ChevronLeft, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { fetchBlogById, updateBlog } from "@/lib/blogSlice";
import RichTextEditor from "@/app/(dashboard)/tadmind/blog/create/rich-text-editor";
import { AppDispatch } from "@/lib/store";
import Image from "next/image";
import { Blog } from "@prisma/client";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  author: z.string().min(1, "Author is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
  updatedAt: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export default function EditPost() {
  const params = useParams();
  const postId = params.id as string;
  const dispatch: AppDispatch = useDispatch();
  const router = useRouter();
  const [imageLoading, setImageLoading] = useState(false);
  const imageUrlRef = useRef("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // Get blog state from Redux
  const { blog, status } = useSelector(
    (state: { blog: { blog: Blog; status: string } }) => state.blog
  );

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      summary: "",
      author: "",
      content: "",
      imageUrl: "",
      updatedAt: "",
    },
  });

  // Fetch blog data
  useEffect(() => {
    if (postId) {
      dispatch(fetchBlogById(postId));
    }
  }, [dispatch, postId]);

  // Populate form when blog data is available
  useEffect(() => {
    if (blog && status === "succeeded") {
      console.log("typeof updatedAt:", typeof blog.updatedAt);
      form.reset({
        title: blog.title,
        summary: blog.summary,
        author: blog.author,
        content: blog.content,
        imageUrl: blog.imageUrl || "",
        updatedAt: String(blog.updatedAt),
      });

      if (blog.imageUrl) {
        setImagePreview(blog.imageUrl);
        imageUrlRef.current = blog.imageUrl;
      }
    }
  }, [blog, form, status]);

  const onSubmit = async (values: FormValues) => {
    try {
      await dispatch(
        updateBlog({
          ...values,
          id: postId,
          imageUrl: values.imageUrl || "",
        })
      ).unwrap();
      toast.success("Blog post updated successfully!");
      router.push("/tadmind/blog");
    } catch {
      toast.error("Failed to update blog post. Please try again.");
    }
  };

  const handleImageUrlChange = (url: string) => {
    // Only update if the URL has actually changed
    if (url !== imageUrlRef.current) {
      imageUrlRef.current = url;
      form.setValue("imageUrl", url);

      if (url) {
        setImageLoading(true);
        // Create a new image object to test loading
        const img = new window.Image();
        img.onload = () => {
          setImagePreview(url);
          setImageLoading(false);
        };
        img.onerror = () => {
          setImagePreview("");
          setImageLoading(false);
        };
        img.src = url;
      } else {
        setImagePreview("");
        setImageLoading(false);
      }
    }
  };
  if (status == "loading") {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading blog data...</p>
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">
            Error Loading Blog
          </h1>
          <p className="mt-2">Failed to load blog post</p>
          <Button asChild className="mt-4">
            <Link href="/tadmind">Back to Dashboard</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/tadmind" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to dashboard
        </Link>
      </Button>

      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Edit Blog Post</h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Brief summary of your post"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image URL Field */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter image URL"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleImageUrlChange(e.target.value);
                      }}
                      onBlur={() => {
                        // Only try to load the image on blur to prevent constant reloading
                        if (field.value) {
                          handleImageUrlChange(field.value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />

                  {/* Image Preview */}
                  {field.value && (
                    <div className="mt-2 relative">
                      {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                          <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                      )}
                      {imagePreview ? (
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          height={200}
                          width={300}
                          alt="Event preview"
                          className="max-h-[200px] rounded-md border object-cover"
                          onError={() => {
                            setImagePreview("");
                          }}
                        />
                      ) : (
                        <div className="h-[200px] w-full rounded-md border flex items-center justify-center bg-muted">
                          <p className="text-muted-foreground">
                            Image preview will appear here
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" asChild>
                <Link href="/tadmind/blog">Cancel</Link>
              </Button>
              <Button type="submit">Update Post</Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
