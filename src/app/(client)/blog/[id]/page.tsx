"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { fetchBlogById } from "@/lib/blogSlice";
import { BlogPost } from "@/components/blog-ui/BlogPost";
import { BlogPostSkeleton } from "@/components/blog-ui/BlogPostSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSelector } from "react-redux";

interface BlogNavigation {
  id: string;
  title: string;
}

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const [nextBlog, setNextBlog] = useState<BlogNavigation | null>(null);
  const [prevBlog, setPrevBlog] = useState<BlogNavigation | null>(null);
  const { blog, status, error } = useSelector((state: RootState) => state.blog);

  useEffect(() => {
    if (typeof params.id == "string") {
      const fetchBlogDetail = async () => {
        const result = await dispatch(
          fetchBlogById(params.id as string)
        ).unwrap();
        setNextBlog(result.nextBlog);
        setPrevBlog(result.prevBlog);
      };
      fetchBlogDetail();
    }
  }, [params.id, dispatch]);

  const navigateToBlog = (blogId: string) => {
    router.push(`/blog/${blogId}`);
  };

  if (status === "loading" || status === "idle") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          onClick={() => router.push("/blog")}
          variant="ghost"
          className="mb-6 -ml-2 text-muted-foreground"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Blogs
        </Button>
        <BlogPostSkeleton />
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div>Error: {error}</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <div>Blog not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <Button
        onClick={() => router.push("/blog")}
        variant="ghost"
        className="mb-6 -ml-2 text-muted-foreground"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Back to Blogs
      </Button>
      <BlogPost {...blog} showFullContent={true} />

      {/* Next/Previous Navigation */}
      <div className="mt-12 pt-8 border-t flex justify-between">
        {prevBlog ? (
          <Button
            onClick={() => navigateToBlog(prevBlog.id)}
            variant="outline"
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            <div className="flex flex-col items-start">
              <span className="text-xs text-muted-foreground">Previous</span>
              <span className="text-sm truncate max-w-[150px]">
                {prevBlog.title}
              </span>
            </div>
          </Button>
        ) : (
          <div></div> // Empty div to maintain layout
        )}

        {nextBlog ? (
          <Button
            onClick={() => navigateToBlog(nextBlog.id)}
            variant="outline"
            className="flex items-center"
          >
            <div className="flex flex-col items-end">
              <span className="text-xs text-muted-foreground">Next</span>
              <span className="text-sm truncate max-w-[150px]">
                {nextBlog.title}
              </span>
            </div>
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <div></div> // Empty div to maintain layout
        )}
      </div>
    </div>
  );
}
