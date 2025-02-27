import { db } from "@/lib/db";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const event = await db.event.findUnique({
      where: { id: params.id },
    });

    if (!event) {
      return new Response("Event not found", { status: 404 });
    }

    return new Response(JSON.stringify(event), { status: 200 });
  } catch (error) {
    return new Response("Error fetching event", { status: 500 });
  }
}

export async function PUT({
  params,
  request,
}: {
  params: { id: string };
  request: Request;
}) {
  try {
    const { title, date, time, location } = await request.json();

    const updatedEvent = await db.event.update({
      where: { id: params.id },
      data: {
        title,
        date: new Date(date),
        time,
        location,
      },
    });

    return new Response(JSON.stringify(updatedEvent), { status: 200 });
  } catch (error) {
    return new Response("Error updating event", { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const deletedEvent = await db.event.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify(deletedEvent), { status: 200 });
  } catch (error) {
    return new Response("Error deleting event", { status: 500 });
  }
}
