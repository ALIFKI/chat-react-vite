import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import Http from "../../../lib/Http";

// Define the shape of your auth state
interface AuthState {
  user: User | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  isLogin: boolean;
}

// Define a User type
interface User {
  id: number;
  name: string;
  email: string;
  token: string;
}

interface UserResponse {
  data: User;
}

// Initial state for the auth slice
const initialState: AuthState = {
  user: null,
  status: "idle",
  error: null,
  isLogin: false,
};

// Define an async thunk for login
export const login = createAsyncThunk<
  User, // The type of the returned data
  { email: string; password: string }, // The type of the argument to the thunk
  { rejectValue: string } // The type of error message (optional)
>("auth/login", async (credentials, { rejectWithValue }) => {
  console.log(credentials);
  try {
    const http = new Http(import.meta.env.VITE_BASE_URL);
    const response: {
      data: UserResponse;
    } = await http.post("/api/v1/auth/login", {
      email: credentials.email,
      password: credentials.password,
    });

    return response.data.data;
  } catch (error: unknown) {
    return rejectWithValue("Invalid credentials : " + error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
      state.isLogin = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.isLogin = true;
      })
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.status = "failed";
          state.error = action.payload ?? "Something went wrong";
        }
      );
  },
});

export const { logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
