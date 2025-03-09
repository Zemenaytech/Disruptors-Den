import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET a specific blog post by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const blog = await db.blog.findUnique({
      where: { id: params.id },
    });

    if (!blog) {
      return NextResponse.json(
        { message: "Blog post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch blog post", error: (error as Error).message },
      { status: 500 }
    );
  }
}

// PUT update a specific blog post by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
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

    const { title, content, author, imageUrl } = body;
    if (!title || !content || !author || !imageUrl) {
      return NextResponse.json(
        {
          message: "Missing required fields: title, content, author, imageUrl",
        },
        { status: 400 }
      );
    }

    const existingBlog = await db.blog.findUnique({
      where: { id: params.id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { message: "Blog post not found, cannot update" },
        { status: 404 }
      );
    }

    const updatedBlog = await db.blog.update({
      where: { id: params.id },
      data: {
        title,
        content,
        author,
        imageUrl,
      },
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
  { params }: { params: { id: string } }
) {
  try {
    if (!params.id) {
      return NextResponse.json(
        { message: "Blog ID is required" },
        { status: 400 }
      );
    }

    const existingBlog = await db.blog.findUnique({
      where: { id: params.id },
    });

    if (!existingBlog) {
      return NextResponse.json(
        { message: "Blog post not found, cannot delete" },
        { status: 404 }
      );
    }

    const deletedBlog = await db.blog.delete({
      where: { id: params.id },
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
