import { configureStore } from "@reduxjs/toolkit";
import { productReducer, fetchAllProductsAsync } from "./slices/productsSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
  },
});

export { fetchAllProductsAsync };
