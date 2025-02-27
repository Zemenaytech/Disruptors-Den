import { db } from "@/lib/db";

export async function GET() {
  try {
    const events = await db.event.findMany();
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    return new Response("Error fetching events", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { title, date, time, location } = await req.json();

    const newEvent = await db.event.create({
      data: {
        title,
        date: new Date(date),
        time,
        location,
      },
    });

    return new Response(JSON.stringify(newEvent), { status: 201 });
  } catch (error) {
    return new Response("Error creating event", { status: 500 });
  }
}
