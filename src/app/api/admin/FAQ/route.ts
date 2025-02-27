import { db } from "@/lib/db";

export async function GET() {
  try {
    const faqs = await db.faq.findMany();
    return new Response(JSON.stringify(faqs), { status: 200 });
  } catch (error) {
    return new Response("Error fetching FAQs", { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { question, answer } = await req.json();

    const newFAQ = await db.faq.create({
      data: {
        question,
        answer,
      },
    });

    return new Response(JSON.stringify(newFAQ), { status: 201 });
  } catch (error) {
    return new Response("Error creating FAQ", { status: 500 });
  }
}
