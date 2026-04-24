import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  orders: [],
  loading: false,
  error: null,
};

export const createOrder = createAsyncThunk(
  "order/create",
  async ({ paymentMethod, address }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/orders", { paymentMethod, address });
      toast.success("Order placed successfully! 🎉");
      return response.data;
    } catch (error) {
      const msg = error?.response?.data?.message || "Failed to place order";
      toast.error(msg);
      return rejectWithValue(msg);
    }
  }
);

export const getOrders = createAsyncThunk(
  "order/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/orders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "order/cancel",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/orders/${orderId}/cancel`);
      toast.success("Order cancelled");
      return response.data;
    } catch (error) {
      toast.error("Failed to cancel order");
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload?.data || [];
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        const updated = action.payload?.data;
        if (updated) {
          state.orders = state.orders.map((o) =>
            o._id === updated._id ? updated : o
          );
        }
      });
  },
});

export default orderSlice.reducer;
