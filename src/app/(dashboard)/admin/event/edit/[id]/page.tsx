import EventForm from "@/components/admin-dashboard-ui/create_event-ui/create-event-form";

export default function EditEventPage({ params }: { params: { id: string } }) {
  return <EventForm eventId={params.id} />;
}
