import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch comments by postId
export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchByPostId",
  async (postId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/comments/${postId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk to create a new comment
export const createComment = createAsyncThunk(
  "comments/create",
  async ({ postId, text, authorId }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/comments", {
        postId,
        text,
        authorId,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const commentsSlice = createSlice({
  name: "comments",
  initialState: {
    comments: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch comments
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create comment
      .addCase(createComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createComment.fulfilled, (state, action) => {
        state.loading = false;
        state.comments.push(action.payload);
      })
      .addCase(createComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
