import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import customersService from './customersService';

const initialState = {
  customers: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
};

export const getAllUsers = createAsyncThunk('customers/getAllUsers', async (_, thunkAPI) => {
  try {
    return await customersService.getAllUsers();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.customers = [];
        state.message = action.payload;
      });
  }
});

export default customersSlice.reducer;
