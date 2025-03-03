"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BlogPost } from "@/components/blog-ui/BlogPost";
import { BlogPostSkeleton } from "@/components/blog-ui/BlogPostSkeleton";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ArrowLeftCircle } from "lucide-react";

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

// Sort blog posts by date, most recent first
const sortedBlogPosts = [...blogPosts].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export default function BlogDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [blogPost, setBlogPost] = useState<(typeof blogPosts)[0] | null>(null);
  const [nextPost, setNextPost] = useState<(typeof blogPosts)[0] | null>(null);
  const [prevPost, setPrevPost] = useState<(typeof blogPosts)[0] | null>(null);

  useEffect(() => {
    // Simulate loading delay
    setLoading(true);

    // Find the current post and its index
    const currentPostIndex = sortedBlogPosts.findIndex(
      (post) => post.id === id
    );

    if (currentPostIndex !== -1) {
      const currentPost = sortedBlogPosts[currentPostIndex];
      setBlogPost(currentPost);

      // Find next and previous posts
      if (currentPostIndex > 0) {
        setPrevPost(sortedBlogPosts[currentPostIndex - 1]);
      } else {
        setPrevPost(null);
      }

      if (currentPostIndex < sortedBlogPosts.length - 1) {
        setNextPost(sortedBlogPosts[currentPostIndex + 1]);
      } else {
        setNextPost(null);
      }
    } else {
      setBlogPost(null);
      setNextPost(null);
      setPrevPost(null);
    }

    // Simulate API fetch delay
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [id]);

  // Handle navigation
  const goBack = () => {
    router.push("/blog");
  };

  const goToPost = (postId: string) => {
    router.push(`/blog/${postId}`);
    // Scroll to top when navigating to a new post
    window.scrollTo(0, 0);
  };

  /* 
  // COMMENTED OUT: Real database fetching code for future implementation
  // This would replace the useEffect above when connecting to a real database
  
  useEffect(() => {
    async function fetchBlogPost() {
      setLoading(true)
      try {
        // Fetch the current blog post
        const response = await fetch(`/api/blog/${id}`)
        if (!response.ok) throw new Error('Failed to fetch blog post')
        const post = await response.json()
        setBlogPost(post)
        
        // Fetch next and previous posts
        const navResponse = await fetch(`/api/blog/navigation?currentId=${id}`)
        if (navResponse.ok) {
          const { nextPost, prevPost } = await navResponse.json()
          setNextPost(nextPost)
          setPrevPost(prevPost)
        }
      } catch (error) {
        console.error('Error fetching blog post:', error)
        setBlogPost(null)
      } finally {
        setLoading(false)
      }
    }
    
    fetchBlogPost()
  }, [id])
  */

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <Button
          onClick={goBack}
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
          onClick={goBack}
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
        onClick={goBack}
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
              onClick={() => goToPost(prevPost.id)}
              className="bg-[#00144b] hover:bg-[#00144b]/90 text-white w-full sm:w-auto"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous:{" "}
              {prevPost.title.length > 25
                ? prevPost.title.substring(0, 25) + "..."
                : prevPost.title}
            </Button>
          ) : (
            <div></div> // Empty div to maintain layout when no previous post
          )}

          {nextPost ? (
            <Button
              onClick={() => goToPost(nextPost.id)}
              className="bg-[#eab308] hover:bg-[#eab308]/90 text-[#032a2a] w-full sm:w-auto"
            >
              Next:{" "}
              {nextPost.title.length > 25
                ? nextPost.title.substring(0, 25) + "..."
                : nextPost.title}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <div></div> // Empty div to maintain layout when no next post
          )}
        </div>
      </div>
    </div>
  );
}
