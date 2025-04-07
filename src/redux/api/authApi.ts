import { createAsyncThunk } from "@reduxjs/toolkit";
import { LOGIN_API, REGISTER_API } from "@/constants/api-constant";
import { post } from "@/lib/network";


export const login = createAsyncThunk(
  LOGIN_API(),
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await post(LOGIN_API(), credentials);
      return response;
    } catch (error) {
      return rejectWithValue((error as any).response.data);
    }
  }
);

export const register = createAsyncThunk(
  REGISTER_API(),
  async (userData: any, { rejectWithValue }) => {
    try {
      const response = await post(REGISTER_API(), userData);
      return response;
    } catch (error) {
      return rejectWithValue((error as any).response.data);
    }
  }
);