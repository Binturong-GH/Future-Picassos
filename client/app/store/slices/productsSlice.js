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

export const createNewProduct = createAsyncThunk(
  "products/create",
  async (product) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.post("/api/products", product, config);
      return res.data;
    } catch (error) {
      const errMsg = error.response.data;
      throw new Error(errMsg);
    }
  }
);

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
      state.error = action.error.message;
    });

    // create new products
    builder.addCase(createNewProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createNewProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products.push(action.payload.products);
    });
    builder.addCase(createNewProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const productReducer = productsSlice.reducer;
