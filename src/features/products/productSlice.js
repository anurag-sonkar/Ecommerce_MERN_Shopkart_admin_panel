import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productsService from './productsService';

const initialState = {
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
};

export const getAllProducts = createAsyncThunk('products/getAllProducts', async (_, thunkAPI) => {
  try {
    return await productsService.getAllProducts();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});
export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id, thunkAPI) => {
  try {
    return await productsService.deleteProduct(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.products;
        state.message = action.payload.message;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.products = action.payload.response;
        state.message = action.payload.message;

      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.products = [];
        state.message = action.payload.message;
      })
  }
});

export default productsSlice.reducer;
