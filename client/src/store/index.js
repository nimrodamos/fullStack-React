import { configureStore } from "@reduxjs/toolkit";
// Import `configureStore` from Redux Toolkit to set up the Redux store.

import postsReducer from "./slices/postsSlice";

import userReducer from "./slices/userSlice.js";

import commentsReducer from "./slices/commentsSlice";

/**
 * The `store` is the centralized location for managing the state of your application.
 * It uses the `configureStore` method from Redux Toolkit, which simplifies store setup.
 */
export const store = configureStore({
  // The `reducer` field is an object that maps slice names to their respective reducers.
  reducer: {
    user: userReducer, // The `user` slice of the state is managed by `userReducer`.
    posts: postsReducer,
    comments: commentsReducer,
  },
});

/**
 * Export the `store` so it can be used throughout the application.
 * Components can use `Provider` to make the store available, and `useDispatch` and `useSelector`
 * hooks to interact with the state.
 */
