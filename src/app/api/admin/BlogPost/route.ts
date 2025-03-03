import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all blog posts
export async function GET() {
  try {
    const blogs = await db.blog.findMany();

    if (blogs.length === 0) {
      return NextResponse.json(
        { message: "No blog posts found" },
        { status: 404 }
      );
    }

    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch blog posts",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// POST a new blog post
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { title, content, author, imageUrl } = body;

    // Ensure all required fields are provided
    if (!title || !content || !author || !imageUrl) {
      return NextResponse.json(
        {
          message: "Missing required fields: title, content, author, imageUrl",
        },
        { status: 400 }
      );
    }

    const newBlog = await db.blog.create({
      data: {
        title,
        content,
        author,
        imageUrl,
      },
    });

    return NextResponse.json(
      { message: "Blog post created successfully", blog: newBlog },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create blog post",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
