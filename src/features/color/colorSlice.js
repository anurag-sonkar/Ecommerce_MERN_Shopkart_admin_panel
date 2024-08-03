import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import colorsService from "./colorService";

const initialState = {
  colors: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllColors = createAsyncThunk(
  "colors/getAllColors",
  async (_, thunkAPI) => {
    try {
      return await colorsService.getAllColors();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createColor = createAsyncThunk(
  "colors/createColor",
  async (color, thunkAPI) => {
    try {
      return await colorsService.createColor(color.color);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteColor = createAsyncThunk(
  "colors/deleteColor",
  async (id, thunkAPI) => {
    try {
      return await colorsService.deleteColor(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateColor = createAsyncThunk(
  "colors/updateColor",
  async (update, thunkAPI) => {
    // console.log(update.updatedColor,update.updateId)
    try {
      return await colorsService.updateColor(
        update.updatedColor,
        update.updateId
      );
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const colorsSlice = createSlice({
  name: "colors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllColors.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllColors.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload.response;
        state.message = action.payload.message;
      })
      .addCase(getAllColors.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.colors = [];
        state.message = action.payload.message;
      })
      .addCase(createColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(createColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(deleteColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload.response;
        state.message = action.payload.message;
      })
      .addCase(deleteColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(updateColor.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateColor.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.colors = action.payload.response;
        state.message = action.payload.message;
      })
      .addCase(updateColor.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export default colorsSlice.reducer;
