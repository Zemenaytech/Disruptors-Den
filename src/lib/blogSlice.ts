import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Blog {
  id: string;
  title: string;
  content: string;
  author: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogState {
  blogs: Blog[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: BlogState = {
  blogs: [],
  status: "idle",
  error: null,
};

export const fetchBlogs = createAsyncThunk("blog/fetchBlogs", async () => {
  const response = await fetch("/api/admin/BlogPost");
  if (!response.ok) throw new Error("Failed to fetch blogs");
  return response.json();
});

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
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

export default blogSlice.reducer;
