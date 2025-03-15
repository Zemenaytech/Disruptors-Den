import EventForm from "@/components/admin-dashboard-ui/create_event-ui/create-event-form";

export default function CreateEventPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Event</h1>
        <p className="text-muted-foreground">
          Create a new event for your platform
        </p>
      </div>
      <EventForm />
    </div>
  );
}
