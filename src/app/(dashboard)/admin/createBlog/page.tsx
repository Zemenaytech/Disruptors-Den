import { CreateBlogForm } from "@/components/create_blog-ui/create-blog-form"

export default function CreateBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Blog Post</h1>
        <p className="text-muted-foreground">Create a new blog post for your website</p>
      </div>
      <CreateBlogForm />
    </div>
  )
}

