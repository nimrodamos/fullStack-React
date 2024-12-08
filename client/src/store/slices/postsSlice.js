import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk for fetching posts from the server
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get("http://localhost:5000/posts");
  return response.data; // The list of posts from the server
});

// Async thunk for adding a new post to the server
export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const response = await axios.post("http://localhost:5000/posts", newPost);
  return response.data; // The newly created post
});

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [], // List of posts
    loading: false, // Loading state
    error: null, // Error state
  },
  reducers: {
    // Update a specific post (for example, adding comments or likes)
    updatePost: (state, action) => {
      const { id, updatedPost } = action.payload;
      const index = state.posts.findIndex((post) => post._id === id);
      if (index !== -1) {
        state.posts[index] = { ...state.posts[index], ...updatedPost };
      }
    },
    // Delete a post by its ID
    deletePost: (state, action) => {
      state.posts = state.posts.filter((post) => post._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle adding a new post
      .addCase(addPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.push(action.payload);
      })
      .addCase(addPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { updatePost, deletePost } = postsSlice.actions;

export default postsSlice.reducer;
