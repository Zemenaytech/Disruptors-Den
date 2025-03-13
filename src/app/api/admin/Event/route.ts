import { NextResponse } from "next/server";
import { db } from "@/lib/db";

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
        speakers: {
          include: {
            speaker: true,
          },
        },
      },
    });

    // Transform the response to include speakers directly
    const formattedEvents = events.map((event) => ({
      ...event,
      speakers: event.speakers.map((s) => s.speaker),
    }));

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
        events: formattedEvents,
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

// POST a new event with speakers
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { title, date, time, location, imageUrl, speakers = [] } = body;

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
      },
    });

    // Process speakers - find existing ones or create new ones
    const speakerConnections = [];
    for (const speakerData of speakers) {
      // Check if speaker already exists by name
      let speaker = await db.speaker.findFirst({
        where: { name: speakerData.name },
      });

      // If speaker doesn't exist, create it
      if (!speaker) {
        speaker = await db.speaker.create({
          data: { name: speakerData.name },
        });
      }

      // Create the connection in the join table
      const connection = await db.speakerOnEvent.create({
        data: {
          eventId: newEvent.id,
          speakerId: speaker.id,
        },
        include: {
          speaker: true,
        },
      });

      speakerConnections.push(connection);
    }

    // Get the complete event with speakers
    const eventWithSpeakers = await db.event.findUnique({
      where: { id: newEvent.id },
      include: {
        speakers: {
          include: {
            speaker: true,
          },
        },
      },
    });

    // Format the response
    const formattedEvent = {
      ...eventWithSpeakers,
      speakers: eventWithSpeakers?.speakers.map((s) => s.speaker) || [],
    };

    return NextResponse.json(
      { message: "Event created successfully", event: formattedEvent },
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
