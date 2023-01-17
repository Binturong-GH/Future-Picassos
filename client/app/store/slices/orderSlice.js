import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewOrderAsync = createAsyncThunk(
  "order/addOrder",
  async (newOrder) => {
    try {
      const { data } = await axios.post("/api/order", newOrder);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: { isLoading: false, order: [], errorOfCreate: null },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addNewOrderAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.errorOfCreate = null;
      state.order.push(action.payload);
    });
  },
});

export const orderReducer = orderSlice.reducer;
