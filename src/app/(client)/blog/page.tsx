"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { fetchBlogs, setBlogs, setCurrentPage } from "@/lib/blogSlice";
import { BlogPost } from "@/components/blog-ui/BlogPost";
import { BlogPostSkeleton } from "@/components/blog-ui/BlogPostSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function BlogPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, status, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.blog
  );

  useEffect(() => {
    dispatch(fetchBlogs(currentPage));
  }, [currentPage, dispatch]);
  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
      window.scrollTo(0, 0);
    }
  };
  console.log("blogs", blogs);
  const goToPrevPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
      window.scrollTo(0, 0);
    }
  };
  // Handle navigation to blog detail
  const navigateToBlogDetail = (id: string) => {
    router.push(`/blog/${id}`);
  };
  console.log(status);

  if (status === "loading") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#00144b] dark:text-white">
          The Disruptors Den Blog
        </h1>
        <div className="space-y-16">
          {[...Array(6)].map((_, index) => (
            <BlogPostSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-[#00144b] dark:text-white">
          The Disruptors Den Blog
        </h1>
        <div>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8 text-center text-[#00144b] dark:text-white">
        The Disruptors Den Blog
      </h1>

      <div className="space-y-16">
        {blogs.map((post) => (
          <div key={post.id} className="border-b pb-12 last:border-b-0">
            <BlogPost
              {...post}
              summary={post.summary ?? ""}
              showFullContent={false}
              onReadMore={() => navigateToBlogDetail(post.id)}
            />
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      {totalPages >= 1 && (
        <div className="flex justify-center items-center mt-12 space-x-4">
          <Button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center h-10 px-4 rounded-md text-primary border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>

          <span className="text-sm font-medium">
            {currentPage} / {totalPages}
          </span>

          <Button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="flex items-center justify-center h-10 px-4 rounded-md text-primary border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Next page"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  );
}
