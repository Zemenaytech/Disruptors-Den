import { BlogPost } from "@/components/blog-ui/BlogPost"

// This would typically come from a database
const blogPosts = [
  {
    id: "1",
    title: "The Future of AI in Africa",
    content:
      "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p><p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>",
    author: "John Doe",
    date: "May 15, 2023",
    imageUrl: "/placeholder.svg?height=256&width=512",
  },
  {
    id: "2",
    title: "Sustainable Tech Solutions for Developing Nations",
    content:
      "<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p><p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>",
    author: "Jane Smith",
    date: "June 2, 2023",
    imageUrl: "/placeholder.svg?height=256&width=512",
  },
  // Add more blog posts as needed
]

export default function BlogPostPage({ params }: { params: { id: string } }) {
  const post = blogPosts.find((post) => post.id === params.id)

  if (!post) {
    return <div>Post not found</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BlogPost {...post} />
    </div>
  )
}

