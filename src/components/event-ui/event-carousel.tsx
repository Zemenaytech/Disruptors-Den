"use client";

import { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, BookOpen, Users } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Updated interface with speakers as an array of objects
interface Speaker {
  id?: string;
  name: string;
}

interface EventCardProps {
  title: string;
  image: string;
  date: string;
  location: string;
  time: string;
  speakers: Speaker[];
}
function formatTime(time: string) {
  // Split time into hours and minutes
  const [hourStr, minute] = time.split(":");
  let hour = parseInt(hourStr, 10); // Convert hour to a number

  // Determine AM/PM
  const ampm = hour >= 12 ? "PM" : "AM";

  // Convert hour to 12-hour format
  const formattedHour =
    hour > 12 ? (hour - 12).toString() : hour === 0 ? "12" : hour.toString();

  // Return the formatted time
  return `${formattedHour}:${minute} ${ampm}`;
}

const EventCard = (props: EventCardProps) => {
  // Format speakers display based on count
  const formatSpeakers = () => {
    if (!props.speakers || props.speakers.length === 0) {
      return "TBA";
    }

    if (props.speakers.length === 1) {
      return props.speakers[0].name;
    }

    // If there are 2 or more speakers, show the first one with "..."
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <span className="cursor-help">
              {props.speakers[0].name}{" "}
              <span className="text-muted-foreground">...</span>
            </span>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <span className="text-sm">
              {props.speakers
                .slice(1)
                .map((speaker) => speaker.name)
                .join(", ")}
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <Card className="h-full overflow-hidden">
      <div className="relative h-60 w-full overflow-hidden">
        <img
          src={props.image || "/placeholder.svg?height=240&width=400"}
          alt={props.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold">{props.title}</h3>
        <div className="flex justify-between items-start gap-6">
          {/* Left Section */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Calendar className="text-[#eab308] w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground">
                {props.date}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="text-[#eab308] w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground">
                {props.location}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="text-[#eab308] w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground">
                {formatTime(props.time)}
              </span>
            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Users className="text-[#eab308] w-4 h-4 text-muted-foreground shrink-0" />
              <span className="text-sm text-muted-foreground">
                {formatSpeakers()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

interface EventCarouselProps {
  events: EventCardProps[];
}

export function EventCarousel({ events }: EventCarouselProps) {
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // If there are no events, don't render the carousel
  if (events.length === 0) {
    return null;
  }

  return (
    <div className="relative px-4 py-6">
      <Carousel
        setApi={setApi}
        className="w-full"
        opts={{
          align: "center",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {events.map((event, index) => (
            <CarouselItem
              key={index}
              className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3"
            >
              <div
                className={cn(
                  "transition-all duration-300 ease-in-out transform",
                  current === index
                    ? "scale-105 shadow-lg z-10"
                    : "scale-95 opacity-70"
                )}
              >
                <EventCard {...event} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious
          className="absolute -left-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-6 h-6 text-[#00144b] dark:text-white" />
        </CarouselPrevious>
        <CarouselNext
          className="absolute -right-4 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-800 rounded-full p-2 shadow-md z-10"
          aria-label="Next slide"
        >
          <ChevronRight className="w-6 h-6 text-[#00144b] dark:text-white" />
        </CarouselNext>
      </Carousel>

      {/* Pagination indicators */}
      <div className="flex justify-center gap-1 mt-4">
        {Array.from({ length: count }).map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              current === index ? "bg-primary w-4" : "bg-muted"
            )}
            onClick={() => api?.scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
