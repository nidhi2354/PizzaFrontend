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
  },
);

//login thunk
export const login = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const promise = axiosInstance.post("/auth/login", data);

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
  },
);
//logout thunk
export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    console.log("incoming  data to the thunk");
    try {
      const promise = axiosInstance.post("/auth/logout");

      toast.promise(promise, {
        loading: "Logging out...",
        success: (res) => res?.data?.message || "Account created!",
        error: "Something went wrong. Try again later ❌",
      });

      const response = await promise;
      return response.data; // server response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Server Error");
    }
  },
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      // .addCase(login.fulfilled, (state, action) => {
      //   // reducer which will execute when the login thunk is fulfilled
      //   const user = action.payload.data.user;

      //   state.isLoggedIn = true;

      //   (state.role = action?.payload?.data?.data?.userRole),
      //     (state.data = action?.payload?.data?.data.userData);

      //   // state.data = user;
      //   // state.role = user?.role || "USER";

      //   // ⭐ Save in localStorage
      //   localStorage.setItem("isLoggedIn", "true");
      //   localStorage.setItem(
      //     "data",
      //     JSON.stringify(action?.payload?.data?.data?.userData)
      //   );
      //   localStorage.setItem("role", action?.payload?.data?.data?.userRole);
      // })
      .addCase(login.fulfilled, (state, action) => {
        const user = action.payload?.data?.user;

        state.isLoggedIn = true;
        state.data = user;
        state.role = user?.role || "USER";

        // Save to localStorage
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("data", JSON.stringify(user));
        localStorage.setItem("role", state.role);
      })

      .addCase(logout.fulfilled, (state) => {
        // reducer which will execute when logout thunk is fulfilled

        // localStorage.setItem("isLoggedIn", false);
        localStorage.setItem("isLoggedIn", "false");

        localStorage.setItem("role", "");

        localStorage.setItem("data", JSON.stringify({}));
        state.isLoggedIn = false;
        state.role = "";
        state.data = {};
      })
      .addCase(createAccount.rejected, (state) => {
        state.isLoggedIn = false;
      });
  },
});

export default authSlice.reducer;
