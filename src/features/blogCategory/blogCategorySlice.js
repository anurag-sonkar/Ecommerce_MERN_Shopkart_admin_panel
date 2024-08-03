import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import blogCategoryService from "./blogCategoryService";

const initialState = {
  blogsCategories: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const getAllBlogsCategory = createAsyncThunk(
  "blogsCategory/getAllBlogsCategory",
  async (_, thunkAPI) => {
    try {
      return await blogCategoryService.getAllBlogsCategory();
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createBlogsCategory = createAsyncThunk(
  "blogsCategory/createBlogsCategory",
  async (blogCategory, thunkAPI) => {
    try {
      return await blogCategoryService.createBlogsCategory(blogCategory.blogCategory);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteBlogsCategory = createAsyncThunk(
  "blogsCategory/deleteBlogsCategory",
  async (id, thunkAPI) => {
    try {
      return await blogCategoryService.deleteBlogsCategory(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateBlogsCategory = createAsyncThunk(
  "blogsCategory/updateBlogsCategory",
  async (update, thunkAPI) => {
    try {
      return  await blogCategoryService.updateBlogsCategory(
        update.updateBlogCategory,
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

const blogCategory = createSlice({
  name: "brands",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
        state.blogsCategories = action.payload.response;
      })
      .addCase(getAllBlogsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
        state.blogsCategories = [];
      })
      .addCase(createBlogsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlogsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload.message;
      })
      .addCase(createBlogsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload.message;
      })
      .addCase(deleteBlogsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBlogsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogsCategories = action.payload.response;
        state.message = action.payload.message;
      })
      .addCase(deleteBlogsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      })
      .addCase(updateBlogsCategory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateBlogsCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogsCategories = action.payload.response;
        state.message = action.payload.message;
      })
      .addCase(updateBlogsCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload.message;
      });
  },
});

export default blogCategory.reducer;