import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const safeParse = (value) => {
  try {
    return value ? JSON.parse(value) : {};
  } catch {
    return {};
  }
};

const initialState = {
  isLoggedIn: localStorage.getItem("isLoggedIn") === "true",
  role: localStorage.getItem("role") || "",
  data: safeParse(localStorage.getItem("data")),
};

// ⭐ CREATE ACCOUNT
export const createAccount = createAsyncThunk(
  "auth/createAccount",
  async (data, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.post("/users", data);

      toast.promise(promise, {
        loading: "Creating account...",
        success: "Account created!",
        error: "Something went wrong",
      });

      const response = await promise;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ⭐ LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.post("/auth/login", data);

      toast.promise(promise, {
        loading: "Logging in...",
        success: "Login successful!",
        error: "Login failed",
      });

      const response = await promise;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

// ⭐ LOGOUT
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.post("/auth/logout");

      toast.promise(promise, {
        loading: "Logging out...",
        success: "Logged out",
        error: "Logout failed",
      });

      const response = await promise;
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder

      // ================= LOGIN =================
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload?.data?.user;
        const token = action.payload?.data?.token;

        state.isLoggedIn = true;
        state.data = user;
        state.role = user?.role || "USER";

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("data", JSON.stringify(user));
        localStorage.setItem("role", state.role);
        if (token) localStorage.setItem("authToken", token);
      })

      // ================= LOGOUT =================
      .addCase(logout.fulfilled, (state) => {
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};

        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem("role", "");
        localStorage.setItem("data", JSON.stringify({}));
        localStorage.removeItem("authToken");
      })

      // ================= CREATE ACCOUNT =================
      .addCase(createAccount.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
