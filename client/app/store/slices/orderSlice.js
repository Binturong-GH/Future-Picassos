import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewOrderAsync = createAsyncThunk(
  "order/addOrder",
  async ({
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    isPaid,
  }) => {
    try {
      const { data } = await axios.post("/api/order", {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid,
      });
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: { isLoading: false, order: null, errorOfCreate: null },
  reducers: {
    clearOrder(state, action) {
      state.order = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(addNewOrderAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorOfCreate = null;
      state.order = action.payload.order;
    });
  },
});

export const orderReducer = orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
