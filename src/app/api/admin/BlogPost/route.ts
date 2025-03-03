import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const blogs = await db.blog.findMany();
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.error();
  }
}

// POST a new blog post
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, content, author, date, imageUrl } = body;

    const newBlog = await db.blog.create({
      data: {
        title,
        content,
        author,
        imageUrl,
      },
    });

    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    return NextResponse.error();
  }
}
