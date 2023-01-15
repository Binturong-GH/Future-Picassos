import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAll",
  async () => {
    try {
      const response = await axios.get("/api/products");
      return response.data;
    } catch (error) {
      const errMsg = error.response.data;
      throw new Error(errMsg);
    }
  }
);

// export const addNewProductAsync = createAsyncThunk(
//   "products/add",
//   async (product) => {
//     const response = await axios.post(
//       "http://localhost:1337/api/products",
//       product
//     );
//     return response.data;
//   }
// );

const productsSlice = createSlice({
  name: "products",
  initialState: {
    isLoading: false,
    products: [],
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    // get all products
    builder.addCase(fetchAllProductsAsync.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload.products;
    });
    builder.addCase(fetchAllProductsAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.messsage;
    });
    // builder.addCase(addNewProductAsync.fulfilled, (state, action) => {
    //   state.push(action.payload);
    // });
  },
});

export const productReducer = productsSlice.reducer;
