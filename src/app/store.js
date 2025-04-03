import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"; // Your auth slice
import eventReducer from "../features/auth/eventSlice"; // Your event slice

const store = configureStore({
  reducer: {
    auth: authReducer,  // Already present
    events: eventReducer, // Make sure this is added!
  },
});

export default store;
