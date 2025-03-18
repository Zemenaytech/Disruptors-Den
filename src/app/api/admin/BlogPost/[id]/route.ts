import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { z } from "zod";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  summary: z.string().min(1, "Summary is required"),
  author: z.string().min(1, "Author is required"),
  content: z.string().min(1, "Content is required"),
  imageUrl: z.string().url("Invalid image URL").optional(),
});
// GET a specific blog post by ID
// Corrected Signature for GET
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Accessing the parameter correctly
  // Your logic...

  try {
    // Fetch the current blog
    const blog = await db.blog.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        summary: true,
        content: true,
        imageUrl: true,
        author: true,
        updatedAt: true,
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Find the next blog (newer by date)
    const nextBlog = await db.blog.findFirst({
      where: {
        updatedAt: {
          lt: blog.updatedAt,
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        id: true,
        title: true,
      },
    });

    // Find the previous blog (older by date)
    const prevBlog = await db.blog.findFirst({
      where: {
        updatedAt: {
          gt: blog.updatedAt,
        },
      },
      orderBy: {
        updatedAt: "asc",
      },
      select: {
        id: true,
        title: true,
      },
    });

    return NextResponse.json({
      blog,
      nextBlog,
      prevBlog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return NextResponse.json(
      { error: "Failed to fetch blog" },
      { status: 500 }
    );
  }
}

// PUT update a specific blog post by ID
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Accessing the parameter correctly
  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const validatedData = formSchema.parse(body);

    const { title, content, author, imageUrl } = validatedData;

    if (!title || !content || !author || !imageUrl) {
      return NextResponse.json(
        {
          message: "Missing required fields: title, content, author, imageUrl",
        },
        { status: 400 }
      );
    }

    const existingBlog = await db.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { message: "Blog post not found, cannot update" },
        { status: 404 }
      );
    }

    const updatedBlog = await db.blog.update({
      where: { id },
      data: validatedData,
    });

    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update blog post",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// DELETE a specific blog post by ID
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params; // Accessing the parameter correctly

  const session = await getCurrentUser();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    if (!id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const existingBlog = await db.blog.findUnique({
      where: { id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { message: "Blog post not found, cannot delete" },
        { status: 404 }
      );
    }

    const deletedBlog = await db.blog.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Blog deleted successfully", blog: deletedBlog },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete blog post",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
