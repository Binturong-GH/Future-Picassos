import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';

// auth slice
import { authReducer, getMe, signup, login } from './slices/authSlice';

const store = configureStore({
  reducer: {
    cart: cartReducer,

    auth: authReducer,
  },
});

export default store;

// export auth slice
export { getMe, signup, login };
