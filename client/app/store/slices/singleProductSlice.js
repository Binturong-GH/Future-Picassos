import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOneProductAsync = createAsyncThunk(
  'singleProduct/fetchOneProduct',
  async (productId) => {
    try {
      const response = await axios.get(`/api/products/${productId}`);
      return response.data;
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
);

//TODO: Need to make back end for this

// export const addNewProductAsync = createAsyncThunk(
//   "product/addProduct",
//   async ({ title, price, imageUrl}) => {
//     try {
//       const { data } = await axios.post("/api/campuses", { title , price, imageUrl });
//       return data;
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   }
// );

// export const updateProductAsync = createAsyncThunk(
//   "product/update",
//   async (product) => {
//     try {
//       console.log(product);
//       const response = await axios.put(`/api/product/${product.id}`, product);
//       console.log(response.data);
//       return response.data;
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   }
// );

// export const deleteProductAsync = createAsyncThunk(
//   "product/delete",
//   async (productId) => {
//     try {
//       console.log(productId);
//       const { data } = await axios.delete(`/api/product/${productId}`);
//       return data;
//     } catch (error) {
//       console.log(error);
//       next(error);
//     }
//   }
// );

const singleProductSlice = createSlice({
  name: 'product',
  initialState: {},
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOneProductAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    //  .addCase(addNewProductAsync.fulfilled, (state, action) => {
    //     state.product.push(action.payload);
    //   })
    //   .addCase(deleteProductAsync.fulfilled, (state, action) => {
    //     state.product = state.product.filter((product) => {
    //       return product.id !== action.meta.arg;
    //     });
    //   })
    //   .addCase(updateProductAsync.fulfilled, (state, action) => {
    //     state.product = action.payload;
    //   });
  },
});

export const singleProductReducer = singleProductSlice.reducer;
