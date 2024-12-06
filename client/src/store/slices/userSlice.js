import { createSlice } from "@reduxjs/toolkit";

// Redux slice for managing the user state
const userSlice = createSlice({
  name: "user",
  initialState: {
    _id: "",
    username: "",
    email: "",
    createdAt: null,
  },
  reducers: {
    /**
     * Update the user state with new user data
     * @param {Object} state - The current state of the user slice
     * @param {Object} action - The dispatched action containing user data
     * @property {Object} action.payload - Should include `_id`, `username`, `email`, and optionally `createdAt`
     */
    setUser: (state, action) => {
      return { ...state, ...action.payload }; // Merge the current state with the new user data
    },
    /**
     * Reset the user state to its initial values
     */
    resetUser: () => {
      return {
        _id: "",
        username: "",
        email: "",
        createdAt: null,
      };
    },
  },
});

// Export actions
export const { setUser, resetUser } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;
