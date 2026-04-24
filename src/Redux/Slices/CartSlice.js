import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../Helpers/axiosInstance";
import { toast } from "react-hot-toast";

const initialState = {
  cartData: null,
  loading: false,
  error: null,
};

// ✅ ADD PRODUCT
export const addProductToCart = createAsyncThunk(
  "/cart/addProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/carts/add/${productId}`);

      toast.success("Product added to cart");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || "Add failed",
      );
    }
  },
);

// ✅ REMOVE PRODUCT
export const removeProductFromCart = createAsyncThunk(
  "/cart/removeProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/carts/remove/${productId}`);

      toast.success("Product removed from cart");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || "Remove failed",
      );
    }
  },
);

// ✅ GET CART
export const getCartDetails = createAsyncThunk(
  "/cart/getDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/carts`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data || error.message || "Fetch failed",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCartLocal: (state) => {
      if (state.cartData) state.cartData.items = [];
    },
  },

  extraReducers: (builder) => {
    builder

      // 👉 GET CART
      .addCase(getCartDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCartDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.cartData = action.payload?.data || null;
      })
      .addCase(getCartDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👉 ADD
      .addCase(addProductToCart.fulfilled, (state, action) => {
        state.cartData = action.payload?.data || state.cartData;
      })

      // 👉 REMOVE
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.cartData = action.payload?.data || state.cartData;
      });
  },
});

export const { clearCartLocal } = cartSlice.actions;
export default cartSlice.reducer;
