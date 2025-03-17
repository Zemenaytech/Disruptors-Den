"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useDispatch } from "react-redux";
import { ChevronLeft, Loader2, Trash2 } from "lucide-react";
import { fetchEventById, addEvent, updateEvent } from "@/lib/eventSlice";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { toast } from "sonner";
import Image from "next/image";
import { AppDispatch } from "@/lib/store";
import { Event } from "@prisma/client";

// Form schema with validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  date: z.date({
    required_error: "Date is required",
  }),
  location: z.string().min(1, "Location is required"),
  imageUrl: z.string().url("Please enter a valid URL"),
  hour: z.string().min(1, "Hour is required"),
  minute: z.string().min(1, "Minute is required"),
  ampm: z.string().min(1, "AM/PM is required"),
});

export default function EventForm({ eventId }: { eventId?: string }) {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [imageLoading, setImageLoading] = useState(false);
  const [speakers, setSpeakers] = useState([{ name: "" }]);
  const imageUrlRef = useRef("");

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      date: undefined,
      location: "",
      imageUrl: "",
      hour: "",
      minute: "",
      ampm: "AM",
    },
  });

  // Fetch event data if editing
  useEffect(() => {
    if (eventId) {
      setIsLoading(true);
      dispatch(fetchEventById(eventId))
        .unwrap()
        .then((event: Event) => {
          console.log("event from ui", event);
          // Parse date and time
          const eventDate = new Date(event.date);

          // Parse time (format: "HH:MM:SS.000+00:00")
          let timeString = event.time;
          if (timeString.includes(".")) {
            timeString = timeString.split(".")[0];
          }

          const [hours, minutes] = timeString.split(":");
          const hour = Number.parseInt(hours, 10);
          const formattedHour =
            hour > 12 ? (hour - 12).toString() : hour.toString();
          const ampm = hour >= 12 ? "PM" : "AM";

          // Set form values
          form.reset({
            title: event.title,
            date: eventDate,
            location: event.location,
            imageUrl: event.imageUrl,
            hour: formattedHour === "0" ? "12" : formattedHour,
            minute: minutes,
            ampm: ampm,
          });

          // Set speakers
          if (event.speakers && event.speakers.length > 0) {
            setSpeakers(event.speakers);
          }

          // Set image preview
          imageUrlRef.current = event.imageUrl;
          setImagePreview(event.imageUrl);
          setIsLoading(false);
        })
        .catch((error: Error) => {
          console.error("Failed to fetch event:", error);
          toast.error("Failed to load event data");
          setIsLoading(false);
        });
    }
  }, [eventId, dispatch, form]);

  // Handle image URL change
  const handleImageUrlChange = (url: string) => {
    // Only update if the URL has actually changed
    if (url !== imageUrlRef.current) {
      imageUrlRef.current = url;
      form.setValue("imageUrl", url);

      if (url) {
        setImageLoading(true);
        // Create a new image object to test loading
        const img = new window.Image();
        img.onload = () => {
          setImagePreview(url);
          setImageLoading(false);
        };
        img.onerror = () => {
          setImagePreview("");
          setImageLoading(false);
        };
        img.src = url;
      } else {
        setImagePreview("");
        setImageLoading(false);
      }
    }
  };

  // Add a new speaker field
  const addSpeaker = () => {
    setSpeakers([...speakers, { name: "" }]);
  };

  // Remove a speaker field
  const removeSpeaker = (index: number) => {
    if (speakers.length > 1) {
      const newSpeakers = [...speakers];
      newSpeakers.splice(index, 1);
      setSpeakers(newSpeakers);
    }
  };

  // Update speaker name
  const updateSpeakerName = (index: number, newName: string) => {
    setSpeakers((prevSpeakers) => {
      // Create a new array (spread operator)
      const updatedSpeakers = [...prevSpeakers];

      // Update the specific speaker (shallow copy):
      updatedSpeakers[index] = { ...updatedSpeakers[index], name: newName };

      return updatedSpeakers;
    });
  };

  // Form submission handler
  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    // Validate speakers
    if (!speakers[0].name) {
      toast.error("At least one speaker is required");
      return;
    }

    setIsLoading(true);

    try {
      // Format time (12-hour to 24-hour)
      let hour = Number.parseInt(data.hour);
      if (data.ampm === "PM" && hour < 12) hour += 12;
      if (data.ampm === "AM" && hour === 12) hour = 0;

      const formattedTime = `${hour.toString().padStart(2, "0")}:${data.minute}:00.000+00:00`;

      // Prepare event data
      const eventData = {
        title: data.title,
        date: data.date.toISOString(),
        time: formattedTime,
        location: data.location,
        imageUrl: data.imageUrl,
        speakers: speakers,
      };

      if (eventId) {
        // Update existing event
        await dispatch(
          updateEvent({
            id: eventId,
            ...eventData,
          })
        ).unwrap();
        toast.success("Event updated successfully");
      } else {
        // Create new event
        await dispatch(addEvent(eventData)).unwrap();
        toast.success("Event created successfully");
      }

      // Redirect to events list
      router.push("/admin/event");
    } catch (error) {
      console.error("Failed to save event:", error);
      toast.error("Failed to save event. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Generate hours for 12-hour format
  const hours = Array.from({ length: 12 }, (_, i) => {
    const hour = i + 1;
    return hour.toString();
  });

  // Generate minutes (00-59)
  const minutes = Array.from({ length: 60 }, (_, i) => {
    return i.toString().padStart(2, "0");
  });

  if (isLoading && eventId) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center min-h-[50vh]">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p>Loading event data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/admin/event" className="flex items-center gap-2">
          <ChevronLeft className="h-4 w-4" />
          Back to events
        </Link>
      </Button>

      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">
          {eventId ? "Edit Event" : "Create New Event"}
        </h1>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Field */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Event Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Select a date</span>
                          )}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="ml-auto h-4 w-4 opacity-50"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              width="18"
                              height="18"
                              x="3"
                              y="4"
                              rx="2"
                              ry="2"
                            />
                            <line x1="16" x2="16" y1="2" y2="6" />
                            <line x1="8" x2="8" y1="2" y2="6" />
                            <line x1="3" x2="21" y1="10" y2="10" />
                          </svg>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Time Fields (Hour, Minute, AM/PM) */}
            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="hour"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hour</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Hour" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {hours.map((hour) => (
                          <SelectItem key={hour} value={hour}>
                            {hour}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="minute"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Minute</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Minute" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[200px]">
                        {minutes.map((minute) => (
                          <SelectItem key={minute} value={minute}>
                            {minute}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="ampm"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>AM/PM</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="AM/PM" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="AM">AM</SelectItem>
                        <SelectItem value="PM">PM</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Location Field */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter event location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image URL Field */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image URL</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter image URL"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e);
                        handleImageUrlChange(e.target.value);
                      }}
                      onBlur={() => {
                        // Only try to load the image on blur to prevent constant reloading
                        if (field.value) {
                          handleImageUrlChange(field.value);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />

                  {/* Image Preview */}
                  {field.value && (
                    <div className="mt-2 relative">
                      {imageLoading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                          <Loader2 className="h-8 w-8 animate-spin" />
                        </div>
                      )}
                      {imagePreview ? (
                        <Image
                          src={imagePreview || "/placeholder.svg"}
                          alt="Event preview"
                          height={200}
                          width={300}
                          className="max-h-[200px] rounded-md border object-cover"
                          onError={() => {
                            setImagePreview("");
                          }}
                        />
                      ) : (
                        <div className="h-[200px] w-full rounded-md border flex items-center justify-center bg-muted">
                          <p className="text-muted-foreground">
                            Image preview will appear here
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </FormItem>
              )}
            />

            {/* Speakers Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <FormLabel className="text-base">Speakers</FormLabel>
                <Button
                  type="button"
                  variant="outline"
                  onClick={addSpeaker}
                  size="sm"
                >
                  Add Speaker
                </Button>
              </div>

              <div className="space-y-4">
                {speakers.map((speaker, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-1">
                      <FormLabel
                        className={index !== 0 ? "sr-only" : undefined}
                      >
                        {index === 0
                          ? "Speaker Name (Required)"
                          : "Speaker Name"}
                      </FormLabel>
                      <Input
                        placeholder="Enter speaker name"
                        value={speaker.name}
                        onChange={(e) =>
                          updateSpeakerName(index, e.target.value)
                        }
                        required={index === 0}
                      />
                    </div>

                    {index > 0 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeSpeaker(index)}
                        className="mt-6"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Remove speaker</span>
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/event")}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {eventId ? "Updating..." : "Creating..."}
                  </>
                ) : eventId ? (
                  "Update Event"
                ) : (
                  "Create Event"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
