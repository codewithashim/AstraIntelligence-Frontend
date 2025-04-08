import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, register } from "../api/authApi";
import { storageUtils } from "@/utils/storage-util";

// Define the shape of the user object
export interface IUser {
  id?: string | number | null | undefined;
  name: string;  
  email: string;
  phone?: string;  
  role?: string;
}

// Define the shape of the auth state
export interface IAuthState {
  isAuthenticated: boolean;
  user: IUser | null;
  token: string | null;
}

// Define the initial state
const initialState: IAuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
};

// Define the key for storing auth state in local storage
const AUTH_STORAGE_KEY = "authState";

// Create the auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<IAuthState>) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.token = action.payload.token;
      storageUtils.set(AUTH_STORAGE_KEY, action.payload);
    },

    clearAuthState: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      storageUtils.remove(AUTH_STORAGE_KEY);
    },
  },
});
 
// Export the action creators
export const { setAuthState, clearAuthState } = authSlice.actions;

// Export the reducer
export default authSlice.reducer;

// Selector to get the auth state
export const selectAuth = (state: { auth: IAuthState }) => state.auth;

// Selector to check if the user is authenticated
export const selectIsAuthenticated = (state: { auth: IAuthState }) =>
  state.auth.isAuthenticated;

// Selector to get the user
export const selectUser = (state: { auth: IAuthState }) => state.auth.user;

// Selector to get the token
export const selectToken = (state: { auth: IAuthState }) => state.auth.token;