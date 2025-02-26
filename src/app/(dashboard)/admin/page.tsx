import { getServerSession } from "next-auth/next"; // Explicit import
import { authOptions } from "@/lib/auth";

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);

  console.log("Session:", session); // Debugging

  if (session?.user) {
    return <div>Admin Dashboard</div>;
  } else {
    return <div>Please login</div>;
  }
}
