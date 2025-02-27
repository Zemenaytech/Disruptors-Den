import { db } from "@/lib/db";

export async function GET({ params }: { params: { id: string } }) {
  try {
    const faq = await db.faq.findUnique({
      where: { id: params.id },
    });

    if (!faq) {
      return new Response("FAQ not found", { status: 404 });
    }

    return new Response(JSON.stringify(faq), { status: 200 });
  } catch (error) {
    return new Response("Error fetching FAQ", { status: 500 });
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
    const { question, answer } = await request.json();

    const updatedFAQ = await db.faq.update({
      where: { id: params.id },
      data: {
        question,
        answer,
      },
    });

    return new Response(JSON.stringify(updatedFAQ), { status: 200 });
  } catch (error) {
    return new Response("Error updating FAQ", { status: 500 });
  }
}

export async function DELETE({ params }: { params: { id: string } }) {
  try {
    const deletedFAQ = await db.faq.delete({
      where: { id: params.id },
    });

    return new Response(JSON.stringify(deletedFAQ), { status: 200 });
  } catch (error) {
    return new Response("Error deleting FAQ", { status: 500 });
  }
}
