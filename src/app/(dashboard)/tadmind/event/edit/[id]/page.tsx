"use client";

import EventForm from "@/components/admin-dashboard-ui/create_event-ui/create-event-form";
import { useParams } from "next/navigation";

export default function EditEventPage() {
  const params = useParams();
  return <EventForm eventId={params.id as string} />;
}
