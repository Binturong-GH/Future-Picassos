import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOneProductAsync = createAsyncThunk(
  "singleProduct/fetchOneProduct",
  async (productId) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      return response.data;
    } catch (error) {
      const errMsg = error.response.data;
      throw new Error(errMsg);
    }
  }
);

const singleProductSlice = createSlice({
  name: "product",
  initialState: {
    isLoading: false,
    product: {},
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOneProductAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOneProductAsync.fulfilled, (state, action) => {
      state.isLoading = false;

      state.product = action.payload;
    });
    builder.addCase(fetchOneProductAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const singleProductReducer = singleProductSlice.reducer;
