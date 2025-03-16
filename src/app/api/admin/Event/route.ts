import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { z } from "zod";

// GET all events with pagination (including speakers)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Number.parseInt(searchParams.get("page") || "1");
    const limit = Number.parseInt(searchParams.get("limit") || "10");
    const skip = (page - 1) * limit;

    // Get total count for pagination
    const totalCount = await db.event.count();
    const totalPages = Math.ceil(totalCount / limit);

    // Get paginated events with speakers
    const events = await db.event.findMany({
      skip,
      take: limit,
      orderBy: {
        date: "desc",
      },
      include: {
        speakers: true,
      },
    });
    // Transform the response to include speakers directly

    if (events.length === 0 && page === 1) {
      return NextResponse.json(
        {
          message: "No events found",
          events: [],
          totalCount: 0,
          totalPages: 0,
          currentPage: page,
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        events,
        totalCount,
        totalPages,
        currentPage: page,
      },
      { status: 200 }
    );
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

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"), // Accepts string, will convert to Date
  imageUrl: z.string().url("Please enter a valid URL"),
  time: z.string().min(1, "Hour is required"),
  location: z.string().min(1, "Location is required"),
  speakers: z.array(z.object({ name: z.string().min(1) })).optional(),
});

// POST a new event with speakers
export async function POST(request: Request) {
  const session = await getCurrentUser();
  console.log(session);
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const validatedData = formSchema.parse(body);

    const {
      title,
      date,
      time,
      location,
      imageUrl,
      speakers = [],
    } = validatedData;

    // Ensure all required fields are provided
    if (!title || !date || !time || !location) {
      return NextResponse.json(
        {
          message: "Missing required fields: title, date, time, location",
        },
        { status: 400 }
      );
    }

    // First, create the event
    const newEvent = await db.event.create({
      data: {
        title,
        date: new Date(date),
        time,
        location,
        imageUrl,
        speakers: {
          connectOrCreate: speakers.map((speaker: { name: string }) => ({
            where: { name: speaker.name },
            create: { name: speaker.name },
          })),
        },
      },
      include: {
        speakers: true,
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
