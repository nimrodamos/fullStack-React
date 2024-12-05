import { createSlice } from "@reduxjs/toolkit";

// Redux slice for managing the user state
const userSlice = createSlice({
  name: "user",
  initialState: {
    username: "", // Default value for `username`
    email: "", // Default value for `email`
    password: "", // Default value for `password`
    createdAt: null, // Default value for `createdAt` (null for no date)
  },
  reducers: {
    /**
     * Update the user state with new user data
     * @param {Object} state - The current state of the user slice
     * @param {Object} action - The dispatched action containing user data
     * @property {Object} action.payload - Should include `username`, `email`, `password`, and optionally `createdAt`
     */
    setUser: (state, action) => {
      const { username, email, password, createdAt } = action.payload;
      state.username = username || state.username;
      state.email = email || state.email;
      state.password = password || state.password;
      state.createdAt = createdAt || state.createdAt;
    },
    /**
     * Reset the user state to its initial values
     */
    resetUser: (state) => {
      state.username = "";
      state.email = "";
      state.password = "";
      state.createdAt = null;
    },
  },
});

// Export actions
export const { setUser, resetUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
