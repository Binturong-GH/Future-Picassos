import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProductsAsync = createAsyncThunk(
  "products/fetchAll",
  async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      return response.data;
    } catch (error) {
      console.log(error);
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
  initialState: [],
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    // builder.addCase(addNewProductAsync.fulfilled, (state, action) => {
    //   state.push(action.payload);
    // });
  },
});

export const productReducer = productsSlice.reducer;
