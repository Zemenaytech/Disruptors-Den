"use client";

import { format } from "date-fns";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/lib/store";
import { fetchEvents } from "@/lib/eventSlice";
import DenCommunityPage from "@/components/layout/EventVido";
import { EventCarousel } from "@/components/event-ui/event-carousel";
import EventSkeleton from "@/components/event-ui/eventSkeleton";

export default function EventsPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { events, status, error, currentPage } = useSelector(
    (state: RootState) => state.event
  );

  useEffect(() => {
    dispatch(fetchEvents(currentPage));
  }, [dispatch]);

  // Format events data to match the EventCard props
  const formattedEvents = events.map((event) => ({
    title: event.title,
    image: event.imageUrl || "/meetup.jpeg?height=192&width=320",
    date: format(new Date(event.date), "MMM dd, yyyy"),
    location: event.location,
    time: event.time,
    speakers: event.speakers || [],
  }));

  return (
    <div className="min-h-screen">
      {/* Main container with consistent padding */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        {/* Header section */}
        <div className="py-8">
          <h1 className="text-3xl font-bold text-center text-[#00144b] dark:text-white">
            Upcoming Events
          </h1>
        </div>

        {/* Video section with consistent margins */}
        <div className="mb-12">
          <DenCommunityPage />
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-[#00144b] dark:text-white">
          Events
        </h2>

        <div className="container mx-auto py-6">
          {status === "loading" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((_, index) => (
                <EventSkeleton key={index} />
              ))}
            </div>
          ) : status === "failed" ? (
            <div className="text-center py-10">
              <p className="text-red-500">Error loading events: {error}</p>
              <button
                onClick={() => dispatch(fetchEvents(currentPage))}
                className="mt-4 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Try Again
              </button>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No upcoming events found.</p>
            </div>
          ) : (
            <EventCarousel events={formattedEvents} />
          )}
        </div>
      </div>
    </div>
  );
}
