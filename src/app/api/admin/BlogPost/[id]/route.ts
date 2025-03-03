import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET a specific blog post by ID
export async function GET({ params }: { params: { id: string } }) {
  try {
    const blog = await db.blog.findUnique({
      where: { id: params.id },
    });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.error();
  }
}

// PUT update a specific blog post by ID
export async function PUT({
  params,
  request,
}: {
  params: { id: string };
  request: Request;
}) {
  try {
    const body = await request.json();
    const { title, content, author, date, imageUrl } = body;

    const updatedBlog = await db.blog.update({
      where: { id: params.id },
      data: {
        title,
        content,
        author,
        imageUrl,
      },
    });

    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.error();
  }
}

// DELETE a specific blog post by ID
export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const deletedBlog = await db.blog.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedBlog, { status: 200 });
  } catch (error) {
    return NextResponse.error();
  }
}
