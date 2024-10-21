import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the user, including name and email
type TUser = {
  name: string;
  email: string;
};

// Define the initial state type
type TAuthState = {
  user: TUser | null;
  token: string | null;
};

// Helper function to safely get localStorage data on the client side
const getLocalStorageData = (key: string) => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(key);
  }
  return null;
};

// Set the initial state with token and user from localStorage
const initialState: TAuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : null,
  token: getLocalStorageData("token") /* localStorage.getItem("token"), */, // Get token from localStorage
};

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set user and token, and store them in localStorage
    setUser: (state, action: PayloadAction<{ user: TUser; token: string }>) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      localStorage.setItem("user", JSON.stringify(user)); // Store user in localStorage
      localStorage.setItem("token", token); // Store token in localStorage
    },
    // Action to handle logout
    logOut: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user"); // Clear user from localStorage
      localStorage.removeItem("token"); // Clear token from localStorage
    },
    // Action to initialize auth state from localStorage
    initializeAuth: (state) => {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user") as string)
        : null;

      if (token) {
        state.token = token;
        state.user = user; // Restore user from localStorage
      }
    },
  },
});

// Export actions and reducer
export const { setUser, logOut, initializeAuth } = authSlice.actions;
export default authSlice.reducer;
