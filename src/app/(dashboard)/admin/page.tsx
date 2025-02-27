import { getCurrentUser } from "@/actions/getCurrentUser";

export default async function AdminDashboard() {
  const user = await getCurrentUser();

  if (user) {
    return <div>Admin Dashboard</div>;
  } else {
    return <div>Please login</div>;
  }
}
