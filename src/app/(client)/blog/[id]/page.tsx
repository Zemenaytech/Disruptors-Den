"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { fetchBlogs } from "@/lib/blogSlice";
import { BlogPost } from "@/components/blog-ui/BlogPost";
import { BlogPostSkeleton } from "@/components/blog-ui/BlogPostSkeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowLeftCircle } from "lucide-react";

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, status, error } = useSelector(
    (state: RootState) => state.blog
  );

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          onClick={() => router.push("/blog")}
          variant="ghost"
          className="mb-8 text-[#00144b] hover:text-[#00144b]/80 hover:bg-[#eab308]/10"
        >
          <ArrowLeftCircle className="mr-2 h-5 w-5" />
          Back to Blog
        </Button>

        <BlogPostSkeleton />
      </div>
    );
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  const blogPost = blogs.find((post) => post.id === id);
  const currentIndex = blogs.findIndex((post) => post.id === id);
  const prevPost = currentIndex > 0 ? blogs[currentIndex - 1] : null;
  const nextPost =
    currentIndex < blogs.length - 1 ? blogs[currentIndex + 1] : null;

  if (!blogPost) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-3xl text-center">
        <h1 className="text-2xl font-bold mb-4 text-[#00144b]">
          Blog Post Not Found
        </h1>
        <p className="mb-8 text-[#032a2a]">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Button
          onClick={() => router.push("/blog")}
          className="bg-[#eab308] hover:bg-[#eab308]/90 text-[#00144b]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button
        onClick={() => router.push("/blog")}
        variant="ghost"
        className="mb-8 text-[#00144b] hover:text-[#00144b]/80 hover:bg-[#eab308]/10"
      >
        <ArrowLeftCircle className="mr-2 h-5 w-5" />
        Back to Blog
      </Button>

      <BlogPost {...blogPost} showFullContent={true} />

      {/* Post Navigation */}
      <div className="mt-16 border-t border-gray-200 dark:border-gray-800 pt-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          {prevPost ? (
            <Button
              onClick={() => router.push(`/blog/${prevPost.id}`)}
              className="bg-[#00144b] hover:bg-[#00144b]/90 text-white w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous:{" "}
              {prevPost.title.length > 25
                ? prevPost.title.substring(0, 25) + "..."
                : prevPost.title}
            </Button>
          ) : (
            <div></div>
          )}

          {nextPost ? (
            <Button
              onClick={() => router.push(`/blog/${nextPost.id}`)}
              className="bg-[#eab308] hover:bg-[#eab308]/90 text-[#032a2a] w-full sm:w-auto"
            >
              Next:{" "}
              {nextPost.title.length > 25
                ? nextPost.title.substring(0, 25) + "..."
                : nextPost.title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
}
