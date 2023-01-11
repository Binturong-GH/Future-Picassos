import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const catchAsync = (fn) => {
//   return (req, res, next) => fn(req, res, next).catch(next);
// };
//use this instead of try catch ?

export const fetchUserCart = createAsyncThunk('users/:id/cart', async (id) => {
  try {
    const { response } = await axios.get(`/users/${id}/cart`);
    return response;
  } catch (err) {
    console.err(err);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [] },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCart = (state) => state.cart;
export const cartReducer = cartSlice.reducer;
