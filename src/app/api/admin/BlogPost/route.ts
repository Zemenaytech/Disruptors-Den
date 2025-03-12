import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all blog posts with pagination
export async function GET(request: Request) {
  console.log("Incoming GET request:", request.url);

  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    let limit = Number.parseInt(searchParams.get("limit") || "2");

    if (isNaN(page)) {
      return NextResponse.json(
        { error: "Invalid page or limit parameter" },
        { status: 400 }
      );
    }

    console.log(
      `Fetching blogs with skip=${(page - 1) * limit}, limit=${limit}`
    );
    const skip = (page - 1) * limit;
    const blogs = await db.blog.findMany({
      select: {
        id: true,
        title: true,
        summary: true,
        imageUrl: true,
        author: true,
        updatedAt: true,
      },

      skip,
      take: limit,
    });

    console.log("✅ Successfully fetched blogs:", blogs.length);
    if (!Array.isArray(blogs)) {
      return NextResponse.json(
        { error: "Database error: Unexpected response" },
        { status: 500 }
      );
    }

    const totalBlogs = await db.blog.count();
    const totalPages = Math.ceil(totalBlogs / limit);

    return NextResponse.json({
      blogs,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch blogs", details: (error as Error).message },
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
