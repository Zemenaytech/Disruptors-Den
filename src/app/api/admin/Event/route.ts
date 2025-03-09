import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET all events with pagination
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await db.event.count();

    // Get paginated events
    const events = await db.event.findMany({
      skip,
      take: limit,
      orderBy: {
        date: "asc",
      },
    });

    if (events.length === 0 && page === 1) {
      return NextResponse.json(
        { message: "No events found", events: [], totalCount: 0 },
        { status: 404 }
      );
    }

    return NextResponse.json({ events, totalCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch events",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// POST a new event
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { title, date, time, location, imageUrl } = body;

    // Ensure all required fields are provided
    if (!title || !date || !time || !location) {
      return NextResponse.json(
        {
          message: "Missing required fields: title, date, time, location",
        },
        { status: 400 }
      );
    }

    const newEvent = await db.event.create({
      data: {
        title,
        date: new Date(date),
        time,
        location,
      },
    });

    return NextResponse.json(
      { message: "Event created successfully", event: newEvent },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to create event",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
