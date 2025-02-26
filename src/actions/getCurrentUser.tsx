import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export interface CurrentUser {
  id: string;
  email?: string | null;
}

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) return null;

    const currentUser = await db.user.findFirst({
      where: { email: session.user.email },
      select: { id: true, email: true },
    });

    return currentUser ?? null;
  } catch (error) {
    console.error("Error fetching current user:", error);
    return null;
  }
};
