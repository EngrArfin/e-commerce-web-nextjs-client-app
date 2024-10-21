import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/api";
import authReducer from "./features/authSlice";

// Configure the Redux store
export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer, // Add baseApi reducer
    auth: authReducer, // Auth slice
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware), // Add baseApi middleware
});

// Infer the RootState and AppDispatch types from the store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
