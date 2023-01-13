import { configureStore } from '@reduxjs/toolkit';
import { productReducer, fetchAllProductsAsync } from './slices/productsSlice';
import {
  singleProductReducer,
  fetchOneProductAsync,
} from './slices/singleProductSlice';
import cartReducer from './slices/cartSlice';

// auth slice
import { authReducer, getMe, signup, login, logout } from './slices/authSlice';
import { fetchUserCart } from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    products: productReducer,
    product: singleProductReducer,
    cart: cartReducer,

    auth: authReducer,
  },
});

export { fetchAllProductsAsync, fetchOneProductAsync, fetchUserCart };

// export auth slice
export { getMe, signup, login, logout };
