import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ordersService from './ordersService';

const initialState = {
  orders: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: ""
};

export const getAllOrders = createAsyncThunk('orders/getAllOrders', async (_, thunkAPI) => {
  try {
    return await ordersService.getAllOrders();
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// export const createEnquires = createAsyncThunk('orders/createEnquires', async (enquiry, thunkAPI) => {
//     try {
//     return await ordersService.createEnquires(enquiry.enquiry);
//   } catch (error) {
//     const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
//     return thunkAPI.rejectWithValue(message);
//   }
// });

export const deleteOrders = createAsyncThunk('orders/deleteOrders', async (id, thunkAPI) => {
  try {
    return await ordersService.deleteOrders(id);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const updateOrders = createAsyncThunk('orders/updateOrders', async (update, thunkAPI) => {
  try {
    return await ordersService.updateOrders(update.order, update.orderId);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.error) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload.response;
        state.message = action.payload.message;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.orders = [];
        state.message = action.payload.message;
      })
      // .addCase(createEnquires.pending, (state) => {
      //   state.isLoading = true;
      // })
      // .addCase(createEnquires.fulfilled, (state, action) => {
      //   state.isLoading = false;
      //   state.isSuccess = true;
      //   state.message = action.payload.message
      // })
      // .addCase(createEnquires.rejected, (state, action) => {
      //   state.isLoading = false;
      //   state.isError = true;
      //   state.isSuccess = false;
      //   state.message = action.payload.message;
      // })
      .addCase(deleteOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload.response; 
        state.message = action.payload.message;
      })
      .addCase(deleteOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(updateOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.orders = action.payload.response; 
        state.message = action.payload.message;
        console.log("Updated Orders in State:", state.orders); // Add this log
      })      
      .addCase(updateOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  }
});

export default ordersSlice.reducer;
