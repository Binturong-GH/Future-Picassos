import { configureStore } from '@reduxjs/toolkit';

// auth slice
import { authReducer, getMe, signup, login } from './slices/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;

// export auth slice
export { getMe, signup, login };
