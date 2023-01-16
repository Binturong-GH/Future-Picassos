import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// @desc : get all products
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

// @desc : create a new products
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

// @desc : create a new products
export const editExistedProduct = createAsyncThunk(
  "products/update",
  async ({ id, product }) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.put(`/api/products/${id}`, product, config);
      return res.data;
    } catch (error) {
      const errMsg = error.response.data;
      throw new Error(errMsg);
    }
  }
);

// @desc : delete existed product
export const deleteExisedProduct = createAsyncThunk(
  "products/deleteOne",
  async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("jwt"));
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const res = await axios.delete(`/api/products/${id}`, config);
      return { id: id };
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

    // update product
    builder.addCase(editExistedProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editExistedProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      const updatedProducts = state.products.map((item) => {
        if (item.id !== action.payload.product.id) return item;
        return action.payload.product;
      });
      state.products = updatedProducts;
    });
    builder.addCase(editExistedProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    // delete product
    builder.addCase(deleteExisedProduct.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteExisedProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      const restedProducts = state.products.filter(
        (item) => item.id !== action.payload.id
      );
      state.products = restedProducts;
    });
    builder.addCase(deleteExisedProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const productReducer = productsSlice.reducer;
