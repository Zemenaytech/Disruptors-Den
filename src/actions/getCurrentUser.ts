import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";

export async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user?.email) {
      return null; // Return null if session is missing or email is not found
    }

    const currentUser = await db.user.findFirst({
      where: { email: session.user.email },
      select: { id: true, email: true },
    });

    return currentUser ?? null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
}
