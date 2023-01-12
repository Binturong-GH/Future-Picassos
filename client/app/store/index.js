import { configureStore } from '@reduxjs/toolkit';
import { productReducer, fetchAllProductsAsync } from './slices/productsSlice';
import {
  singleProductReducer,
  fetchOneProductAsync,
} from './slices/singleProductSlice';
import cartReducer from './slices/cartSlice';
import {
  fetchUserCart,
  addToCartDB,
  deleteFromCartDB,
} from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    product: singleProductReducer,
    cart: cartReducer,
  },
});

export {
  fetchAllProductsAsync,
  fetchOneProductAsync,
  fetchUserCart,
  addToCartDB,
  deleteFromCartDB,
};
