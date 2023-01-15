import { configureStore } from "@reduxjs/toolkit";

// all products slice
import {
  productReducer,
  fetchAllProductsAsync,
  createNewProduct,
  deleteExisedProduct,
} from "./slices/productsSlice";

// single product slice
import {
  singleProductReducer,
  fetchOneProductAsync,
} from "./slices/singleProductSlice";

//cart slice
import cartReducer from "./slices/cartSlice";
import {
  fetchUserCart,
  addToCartDB,
  deleteFromCartDB,
  editCartDB,
  addToCart,
  deleteProduct,
  incrementOne,
  subtractOne,
} from "./slices/cartSlice";

// auth slice
import { authReducer, getMe, signup, login, logout } from "./slices/authSlice";

// users slice
import { usersReducer, getAllUsers, deleteUser } from "./slices/usersSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    product: singleProductReducer,
    cart: cartReducer,
    auth: authReducer,
    users: usersReducer,
  },
});

export default store;

// export auth slice
export { getMe, signup, login, logout };

//export all products slice
export { fetchAllProductsAsync, createNewProduct, deleteExisedProduct };

//export single product slice
export { fetchOneProductAsync };

//export cart slice
export {
  fetchUserCart,
  addToCartDB,
  deleteFromCartDB,
  editCartDB,
  addToCart,
  deleteProduct,
  incrementOne,
  subtractOne,
};

// export users slice
export { getAllUsers, deleteUser };
