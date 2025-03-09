import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all blog posts with pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await db.blog.count();

    // Get paginated blogs
    const blogs = await db.blog.findMany({
      skip,
      take: limit,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (blogs.length === 0 && page === 1) {
      return NextResponse.json(
        { message: "No blog posts found", blogs: [], totalCount: 0 },
        { status: 404 }
      );
    }

    return NextResponse.json({ blogs, totalCount }, { status: 200 });
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

    const { title, summary, content, author, imageUrl } = body;

    // Ensure all required fields are provided
    if (!title || !content || !author || !imageUrl || !summary) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: title, content, summary, author, imageUrl",
        },
        { status: 400 }
      );
    }

    const newBlog = await db.blog.create({
      data: {
        title,
        content,
        summary,
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
