import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// GET a single event by ID (including speakers)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    const event = await db.event.findUnique({
      where: { id },
      include: {
        speakers: true,
      },
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to fetch event",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// PUT/UPDATE an event with speakers
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    const body = await request.json().catch(() => null);

    if (!body) {
      return NextResponse.json(
        { message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    const { title, date, time, location, imageUrl, speakers = [] } = body;

    // Update the event basic info
    const updatedEvent = await db.event.update({
      where: { id },
      data: {
        title,
        date: new Date(date),
        time,
        location,
        imageUrl,
        updatedAt: new Date(),
        speakers: {
          c,
        },
      },
    });

    return NextResponse.json(
      { message: "Event updated successfully", event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to update event",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

// DELETE an event
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;

    // Check if event exists
    const existingEvent = await db.event.findUnique({
      where: { id },
    });

    if (!existingEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Delete event (SpeakerOnEvent records will be cascade deleted)
    await db.event.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Failed to delete event",
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
