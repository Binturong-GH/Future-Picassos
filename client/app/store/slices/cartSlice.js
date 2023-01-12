import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// const catchAsync = (fn) => {
//   return (req, res, next) => fn(req, res, next).catch(next);
// };
// use this instead of try catch ?

export const fetchUserCart = createAsyncThunk('/cart', async (id) => {
  try {
    const { data } = await axios.get(`/api/cart`);
    return data;
  } catch (err) {
    console.error(err);
  }
});

export const addToCartDB = createAsyncThunk('/cart', async (newCartEntry) => {
  try {
    const { data } = await axios.post('/api/cart', newCartEntry);
    return data;
  } catch (err) {
    console.error(err);
  }
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [] },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.cartItems.push(...action.payload);
    });
    builder.addCase(addToCartDB.fulfilled, (state, action) => {
      state.cartItems.push(action.payload);
    });
  },
});

export const selectCart = (state) => state.cart;
export default cartSlice.reducer;
