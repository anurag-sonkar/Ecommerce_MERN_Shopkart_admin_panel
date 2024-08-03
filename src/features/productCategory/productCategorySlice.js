import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import productCategoryService from "./productCategoryService";

const initialState = {
  productsCategory: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllProductsCategory = createAsyncThunk(
  "productsCategory/getProductsCategory",
  async (_, thunkAPI) => {
    try {
      return await productCategoryService.getAllProductsCategory();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createProductsCategory = createAsyncThunk(
  "productsCategory/createProductsCategory",
  async (productCategory, thunkAPI) => {
    try {
      return await productCategoryService.createProductsCategory(productCategory.productCategory);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteProductsCategory = createAsyncThunk(
  "productsCategory/deleteProductsCategory",
  async (id, thunkAPI) => {
    try {
      return await productCategoryService.deleteProductsCategory(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProductsCategory = createAsyncThunk(
  "productsCategory/updateProductsCategory",
  async (update, thunkAPI) => {
    try {
      return  await productCategoryService.updateProductsCategory(
        update.updateProductCategory,
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

const productCategory = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProductsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProductsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.productsCategory = action.payload.response;
      })
      .addCase(getAllProductsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.productsCategory = [];
        state.message = action.payload.message;
      })
      .addCase(createProductsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createProductsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(createProductsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(deleteProductsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteProductsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productsCategory = action.payload.response;
        state.message = action.payload.message;
      })
      .addCase(deleteProductsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(updateProductsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.productsCategory = action.payload.response;
        state.message = action.payload.message;
      })
      .addCase(updateProductsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export default productCategory.reducer;