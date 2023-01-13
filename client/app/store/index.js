import { configureStore } from "@reduxjs/toolkit";
import { productReducer, fetchAllProductsAsync } from "./slices/productsSlice";
import {
  singleProductReducer,
  fetchOneProductAsync,
} from './slices/singleProductSlice';
import cartReducer from './slices/cartSlice';
import { fetchUserCart } from './slices/cartSlice';

// auth slice
import { authReducer, getMe, signup, login, logout } from './slices/authSlice';


const store = configureStore({
  reducer: {
    products: productReducer,
    product: singleProductReducer,
    cart: cartReducer,

    auth: authReducer,
  },
});

export default store;

// export auth slice
export { getMe, signup, login, logout };

export { fetchAllProductsAsync, fetchOneProductAsync, fetchUserCart };
