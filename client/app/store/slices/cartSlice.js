import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import axios from 'axios';

// const catchAsync = (fn) => {
//   return (req, res, next) => fn(req, res, next).catch(next);
// };
// use this instead of try catch ?

export const fetchUserCart = createAsyncThunk(
  'cart/fetchUserCart',
  async (id) => {
    try {
      const { data } = await axios.get(`/api/cart`);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const addToCartDB = createAsyncThunk(
  'cart/addToCartDB',
  async (newCartEntry) => {
    try {
      const { data } = await axios.post('/api/cart', newCartEntry);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

export const deleteFromCartDB = createAsyncThunk(
  'cart/deleteFromCartDB',
  async (toDelete) => {
    try {
      await axios.delete('/api/cart', toDelete);
      return toDelete.productId;
    } catch (err) {
      console.error(err);
    }
  }
);

export const editCartDB = createAsyncThunk(
  '/cart/editCartDB',
  async (toEdit) => {
    try {
      const { data } = await axios.put('/api/cart', toEdit);
      return data;
    } catch (err) {
      console.error(err);
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState: { cartItems: [] },
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.cartItems.filter(
        (item) => item.id === action.payload.id
      );
      if (itemInCart.length > 0) {
        itemInCart[0].quantity++;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
    },
    deleteProduct: (state, action) => {
      const deleteProduct = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
      state.cartItems = deleteProduct;
    },
    incrementOne: (state, action) => {
      const product = state.cartItems.filter(
        (item) => item.id === action.payload
      )[0];
      product.quantity++;
    },
    subtractOne: (state, action) => {
      const product = state.cartItems.filter(
        (item) => item.id === action.payload
      )[0];
      if (product.quantity > 1) {
        product.quantity--;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserCart.fulfilled, (state, action) => {
      state.cartItems.push(...action.payload);
    });
    builder.addCase(addToCartDB.fulfilled, (state, action) => {
      state.cartItems.push(action.payload);
    });
    builder.addCase(deleteFromCartDB.fulfilled, (state, action) => {
      return state.filter((product) => product.productId !== action.payload);
    });
    builder.addCase(editCartDB.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectCart = (state) => state.cart;
export const { addToCart, deleteProduct, incrementOne, subtractOne } =
  cartSlice.actions;
export default cartSlice.reducer;
