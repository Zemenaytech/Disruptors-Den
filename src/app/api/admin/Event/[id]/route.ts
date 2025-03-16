import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getCurrentUser } from "@/actions/getCurrentUser";
import { z } from "zod";

// GET a single event by ID (including speakers)
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const session = getCurrentUser();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
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

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.string().min(1, "Date is required"), // Accepts string, will convert to Date
  imageUrl: z.string().url("Please enter a valid URL"),
  time: z.string().min(1, "Hour is required"),
  location: z.string().min(1, "Location is required"),
  speakers: z.array(z.object({ name: z.string().min(1) })).optional(),
});

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

    const validateData = formSchema.parse(body);

    const {
      title,
      date,
      time,
      location,
      imageUrl,
      speakers = [],
    } = validateData;

    // Update the event basic info
    await db.event.update({
      where: { id },
      data: {
        title,
        date: new Date(date),
        time,
        location,
        imageUrl,
        updatedAt: new Date(),
        speakers: {
          set: [], // This disconnects all existing speakers
        },
      },
    });

    const eventWithSpeakers = await db.event.update({
      where: { id },
      data: {
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
      { message: "Event updated successfully", event: eventWithSpeakers },
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
