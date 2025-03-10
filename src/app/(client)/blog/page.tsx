"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { fetchBlogs } from "@/lib/blogSlice";
import { BlogPost } from "@/components/blog-ui/BlogPost";
import { BlogPostSkeleton } from "@/components/blog-ui/BlogPostSkeleton";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

<<<<<<< HEAD
// This would typically come from a database
const blogPosts = [
  {
    id: "1",
    title: "The Future of AI in Africa",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>",
    author: "John Doe",
    date: "2023-05-15",
    imageUrl: "/DALLE_1.webp",
  },
  {
    id: "2",
    title: "Sustainable Tech Solutions for Developing Nations",
    content:
      "<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p><p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>",
    author: "Jane Smith",
    date: "2023-06-02",
    imageUrl: "/DALLE_2.webp",
  },
  {
    id: "3",
    title: "Emerging Startups in East Africa",
    content:
      "<p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p><p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p><p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?</p>",
    author: "Alice Johnson",
    date: "2023-06-20",
    imageUrl: "/DALLE_2.webp",
  },
  {
    id: "4",
    title: "Digital Transformation in African Banking",
    content:
      "<p>Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p><p>Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.</p><p>Vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p>",
    author: "Robert Chen",
    date: "2023-07-05",
    imageUrl: "/DALLE_1.webp",
  },
  {
    id: "5",
    title: "Renewable Energy Solutions for Rural Communities",
    content:
      "<p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.</p><p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p><p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p>",
    author: "Sarah Okafor",
    date: "2023-07-18",
    imageUrl: "/DALLE_1.webp",
  },
  {
    id: "6",
    title: "The Rise of Mobile Payment Systems in Africa",
    content:
      "<p>Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.</p><p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p><p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p>",
    author: "Michael Adeyemi",
    date: "2023-08-01",
    imageUrl: "/DALLE_2.webp",
  },
  {
    id: "7",
    title: "Cybersecurity Challenges in Emerging Markets",
    content:
      "<p>Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.</p><p>Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.</p><p>Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>",
    author: "David Mwangi",
    date: "2023-08-15",
    imageUrl: "/DALLE_3.webp",
  },
];
const isAdmin = true; // or your real auth check


// Helper function to create excerpt from HTML content
const createExcerpt = (htmlContent: string, maxLength = 150) => {
  // Remove HTML tags and get plain text
  const plainText = htmlContent.replace(/<[^>]+>/g, "");

  // Create excerpt
  if (plainText.length <= maxLength) return plainText;

  // Find a good breaking point
  const breakPoint = plainText.lastIndexOf(" ", maxLength);
  return (
    plainText.substring(0, breakPoint > 0 ? breakPoint : maxLength) + "..."
  );
};

=======
>>>>>>> a51f7c72c190026c4723c68e49e64869a3708204
export default function BlogPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { blogs, status, error } = useSelector(
    (state: RootState) => state.blog
  );
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchBlogs());
    }
  }, [status, dispatch]);

  // Sort blog posts by date, most recent first
  const sortedBlogPosts = [...blogs].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );
  // Calculate current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedBlogPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(sortedBlogPosts.length / postsPerPage);

  // Handle page navigation
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle navigation to blog detail
  // Handle navigation to blog detail
  const navigateToBlogDetail = (id: string) => {
    router.push(`/blog/${id}`);
  };

<<<<<<< HEAD
  // Handle navigation to edit page
  const navigateToEditPage = (id: string) => {
    router.push(`/blog/edit/${id}`);
  };
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
=======
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
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
>>>>>>> a51f7c72c190026c4723c68e49e64869a3708204
      <h1 className="text-3xl font-bold mb-8 text-center text-[#00144b] dark:text-white">
        The Disruptors Den Blog
      </h1>
  
      <div className="space-y-16">
        {currentPosts.map((post) => (
          <div key={post.id} className="border-b pb-12 last:border-b-0">
            <BlogPost
              {...post}
              showFullContent={false}
              onReadMore={() => navigateToBlogDetail(post.id)}
            />
            {isAdmin && (
              <div className="mt-4 text-right">
                <button
                  onClick={() => navigateToEditPage(post.id)}
                  className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
  
      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-12 space-x-4">
          <Button
            onClick={goToPrevPage}
            disabled={currentPage === 1}
            className="flex items-center justify-center h-10 px-4 rounded-md text-primary border border-input bg-background hover:bg-accent hover:text-accent-foreground disabled:opacity-50 disabled:pointer-events-none"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
<<<<<<< HEAD
          </button>
  
          <span className="text-sm font-medium">
            {currentPage} / {totalPages}
          </span>
  
          <button
=======
          </Button>

          <span className="text-sm font-medium">
            {currentPage} / {totalPages}
          </span>

          <Button
>>>>>>> a51f7c72c190026c4723c68e49e64869a3708204
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
  