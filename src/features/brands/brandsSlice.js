import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import brandsService from './brandsService';

const initialState = {
  brands: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
};

export const getAllBrands = createAsyncThunk('brands/getAllBrands', async (_, thunkAPI) => {
  try {
    return await brandsService.getAllBrands();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createBrand = createAsyncThunk('brands/createBrand', async (brand, thunkAPI) => {
    try {
    return await brandsService.createBrand(brand.brand);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteBrand = createAsyncThunk('brands/deleteBrand', async (id, thunkAPI) => {
  try {
    await brandsService.deleteBrand(id);
    return await brandsService.getAllBrands(); // Fetch updated list of brands after deletion
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateBrand = createAsyncThunk('brands/updateBrand', async (update, thunkAPI) => {
  try {
    await brandsService.updateBrand(update.updatedBrand, update.updateId);
    return await brandsService.getAllBrands(); // Fetch updated list of brands after update
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const brandsSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload;
      })
      .addCase(getAllBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.brands = [];
        state.message = action.payload;
      })
      .addCase(createBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(deleteBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload; 
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(updateBrand.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.brands = action.payload; 
        state.message = action.payload.message
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  }
});

export default brandsSlice.reducer;
