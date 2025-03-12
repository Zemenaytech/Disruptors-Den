import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Blog {
  id: string;
  title: string;
  content: string;
  summary: string; // Added summary field
  author: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogState {
  blogs: Blog[];
  blog: Blog | null;
  totalPages: number;
  currentPage: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  blog: null,
  totalPages: 1,
  currentPage: 1,
  status: "idle",
  error: null,
};

// Updated to support pagination
export const fetchBlogs = createAsyncThunk(
  "blog/fetchBlogs",
  async (page: number = 1) => {
    try {
      const response = await fetch(`/api/admin/BlogPost?page=${page}`);
      if (!response.ok) {
        new Error("Failed to fetch blogs");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("error:", error);
    }
  }
);

// Fetch a single blog with next/prev blog info
export const fetchBlogById = createAsyncThunk(
  "blog/fetchBlogById",
  async (id: string) => {
    const response = await fetch(`/api/admin/BlogPost/${id}`);
    if (!response.ok) throw new Error("Failed to fetch blog");
    return response.json();
  }
);

// We'll keep these for future use, but they won't be used in the frontend for now
export const addBlog = createAsyncThunk(
  "blog/addBlog",
  async (blog: Omit<Blog, "id" | "createdAt" | "updatedAt">) => {
    const response = await fetch("/api/admin/BlogPost", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    });
    if (!response.ok) throw new Error("Failed to add blog");
    return response.json();
  }
);

export const updateBlog = createAsyncThunk(
  "blog/updateBlog",
  async (blog: Blog) => {
    const response = await fetch(`/api/admin/BlogPost/${blog.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    });
    if (!response.ok) throw new Error("Failed to update blog");
    return response.json();
  }
);

export const deleteBlog = createAsyncThunk(
  "blog/deleteBlog",
  async (id: string) => {
    const response = await fetch(`/api/admin/BlogPost/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete blog");
    return id;
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setBlogs: (state, action) => {
      state.blogs = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        console.log("Fulfilled Action:", action.payload);
        state.status = "succeeded";
        state.blogs = action.payload?.blogs || [];
        state.totalPages = action.payload?.totalPages;
        state.currentPage = action.payload?.currentPage;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      })
      // Fetch blog by ID cases
      .addCase(fetchBlogById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blog = action.payload.blog || null;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch blog details";
      })
      // We'll keep these for future use
      .addCase(addBlog.fulfilled, (state, action) => {
        state.blogs.unshift(action.payload);
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        const index = state.blogs.findIndex(
          (blog) => blog.id === action.payload.id
        );
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.blogs = state.blogs.filter((blog) => blog.id !== action.payload);
      });
  },
});

export const { setCurrentPage, setBlogs } = blogSlice.actions;
export default blogSlice.reducer;
