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
        speakers: {
          include: {
            speaker: true,
          },
        },
      },
    });

    if (!event) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

    // Format the response to include speakers directly
    const formattedEvent = {
      ...event,
      speakers: event.speakers.map((s) => s.speaker),
    };

    return NextResponse.json(formattedEvent, { status: 200 });
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

    // Check if event exists
    const existingEvent = await db.event.findUnique({
      where: { id },
      include: {
        speakers: {
          include: {
            speaker: true,
          },
        },
      },
    });

    if (!existingEvent) {
      return NextResponse.json({ message: "Event not found" }, { status: 404 });
    }

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
      },
    });

    // Get current speaker connections
    const currentSpeakerConnections = await db.speakerOnEvent.findMany({
      where: { eventId: id },
    });

    // Get current speaker IDs
    const currentSpeakerIds = currentSpeakerConnections.map(
      (conn) => conn.speakerId
    );

    // Process speakers for the update
    const updatedSpeakerIds: any = [];

    for (const speakerData of speakers) {
      let speaker;

      // If speaker has an ID, check if it exists
      if (speakerData.id) {
        speaker = await db.speaker.findUnique({
          where: { id: speakerData.id },
        });
      }

      // If no ID or speaker not found, check by name
      if (!speaker) {
        speaker = await db.speaker.findFirst({
          where: { name: speakerData.name },
        });
      }

      // If speaker still not found, create a new one
      if (!speaker) {
        speaker = await db.speaker.create({
          data: { name: speakerData.name },
        });
      }

      updatedSpeakerIds.push(speaker.id);

      // Check if connection already exists
      const connectionExists = currentSpeakerIds.includes(speaker.id);

      // If connection doesn't exist, create it
      if (!connectionExists) {
        await db.speakerOnEvent.create({
          data: {
            eventId: id,
            speakerId: speaker.id,
          },
        });
      }
    }

    // Remove connections that are no longer needed
    const speakerIdsToRemove = currentSpeakerIds.filter(
      (id) => !updatedSpeakerIds.includes(id)
    );

    for (const speakerId of speakerIdsToRemove) {
      await db.speakerOnEvent.deleteMany({
        where: {
          eventId: id,
          speakerId,
        },
      });
    }

    // Get the updated event with speakers
    const eventWithSpeakers = await db.event.findUnique({
      where: { id },
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
      { message: "Event updated successfully", event: formattedEvent },
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
