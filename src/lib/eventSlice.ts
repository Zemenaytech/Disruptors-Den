import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define interfaces for Event and Speaker
interface Speaker {
  id: string;
  name: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  imageUrl: string;
  time: string;
  location: string;
  speakers: Speaker[];
  createdAt: string;
  updatedAt: string;
}

interface EventState {
  events: Event[];
  event: Event | null;
  totalPages: number;
  currentPage: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EventState = {
  events: [],
  event: null,
  totalPages: 1,
  currentPage: 1,
  status: "idle",
  error: null,
};

// Fetch events with pagination
export const fetchEvents = createAsyncThunk(
  "event/fetchEvents",
  async (page: number = 1) => {
    try {
      const response = await fetch(`/api/admin/Event?page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error:", error);
      throw error;
    }
  }
);

// Fetch a single event by ID
export const fetchEventById = createAsyncThunk(
  "event/fetchEventById",
  async (id: string) => {
    const response = await fetch(`/api/admin/Event/${id}`);
    if (!response.ok) throw new Error("Failed to fetch event");
    return response.json();
  }
);

// Add a new event with speakers
export const addEvent = createAsyncThunk(
  "event/addEvent",
  async (eventData: {
    title: string;
    date: string;
    time: string;
    location: string;
    imageUrl: string;
    speakers: { name: string }[];
  }) => {
    const response = await fetch("/api/admin/Event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error("Failed to add event");
    return response.json();
  }
);

// Update an event with speakers
export const updateEvent = createAsyncThunk(
  "event/updateEvent",
  async (eventData: {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    imageUrl: string;
    speakers: { id?: string; name: string }[];
  }) => {
    const response = await fetch(`/api/admin/Event/${eventData.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
    if (!response.ok) throw new Error("Failed to update event");
    return response.json();
  }
);

// Delete an event
export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async (id: string) => {
    const response = await fetch(`/api/admin/Event/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete event");
    return id;
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch events cases
      .addCase(fetchEvents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload?.events || [];
        state.totalPages = action.payload?.totalPages || 1;
        state.currentPage = action.payload?.currentPage || 1;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // Fetch event by ID cases
      .addCase(fetchEventById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.event = action.payload || null;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch event details";
      })
      // Add event cases
      .addCase(addEvent.fulfilled, (state, action) => {
        state.events.unshift(action.payload.event);
      })
      // Update event cases
      .addCase(updateEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(
          (event) => event.id === action.payload.event.id
        );
        if (index !== -1) {
          state.events[index] = action.payload.event;
        }
        if (state.event && state.event.id === action.payload.event.id) {
          state.event = action.payload.event;
        }
      })
      // Delete event cases
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.events = state.events.filter(
          (event) => event.id !== action.payload
        );
        if (state.event && state.event.id === action.payload) {
          state.event = null;
        }
      });
  },
});

export const { setCurrentPage, setEvents } = eventSlice.actions;
export default eventSlice.reducer;
