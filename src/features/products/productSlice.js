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
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.products = [];
        state.message = action.payload;
      });
  }
});

export default productsSlice.reducer;
