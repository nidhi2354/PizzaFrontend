import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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

// ⭐ Create Account Thunk
export const createAccount = createAsyncThunk(
  "auth/createAccount",
  async (data, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.post("/users", data);

      toast.promise(promise, {
        loading: "Hold on... we are registering your account 🕒",
        success: (res) => res?.data?.message || "Account created!",
        error: "Something went wrong. Try again later ❌",
      });

      const response = await promise;
      return response.data; // server response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server Error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(createAccount.fulfilled, (state, action) => {
        const user = action.payload.data;

        state.isLoggedIn = true;
        state.data = user;
        state.role = user?.role || "USER";

        // ⭐ Save in localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("data", JSON.stringify(user));
        localStorage.setItem("role", state.role);
      })
      .addCase(createAccount.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
