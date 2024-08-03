import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import enquiresService from './enquiresService';

const initialState = {
  enquires: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
};

export const getAllEnquires = createAsyncThunk('enquires/getAllEnquires', async (_, thunkAPI) => {
  try {
    return await enquiresService.getAllEnquires();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const createEnquires = createAsyncThunk('enquires/createEnquires', async (enquiry, thunkAPI) => {
    try {
    return await enquiresService.createEnquires(enquiry.enquiry);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deleteEnquires = createAsyncThunk('enquires/deleteEnquires', async (id, thunkAPI) => {
  try {
    return await enquiresService.deleteEnquires(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateEnquires = createAsyncThunk('enquires/updateEnquires', async (update, thunkAPI) => {
  try {
    return await enquiresService.updateEnquires(update.enquiry, update.enquiryId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const enquiresSlice = createSlice({
  name: 'enquires',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnquires.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllEnquires.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquires = action.payload.response;
        state.message = action.payload.message;
      })
      .addCase(getAllEnquires.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.enquires = [];
        state.message = action.payload.message;
      })
      .addCase(createEnquires.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createEnquires.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message
      })
      .addCase(createEnquires.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(deleteEnquires.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteEnquires.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquires = action.payload.response; 
        state.message = action.payload.message;
      })
      .addCase(deleteEnquires.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(updateEnquires.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateEnquires.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.enquires = action.payload.response; 
        state.message = action.payload.message
      })
      .addCase(updateEnquires.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  }
});

export default enquiresSlice.reducer;
