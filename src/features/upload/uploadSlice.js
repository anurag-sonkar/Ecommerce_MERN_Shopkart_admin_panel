import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import uploadService from "./uploadService";

const initialState = {
  uploads: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const uploadImages = createAsyncThunk(
  "uploads/uploadImage",
  async (data, thunkAPI) => {
    try {
        const formData = new FormData()
        for(let i=0 ; i< data.length ; i++){
            formData.append('images',data[i])
        }
      return await uploadService.uploadImages(formData);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteImages = createAsyncThunk(
  "deletes/deleteImage",
  async (id, thunkAPI) => {
    try {
        
      return await uploadService.deleteImages(id);
    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.error) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);
// export const getAllProducts = createAsyncThunk(
//   "uploads/getAllProducts",
//   async (_, thunkAPI) => {
//     try {
//       return await productsService.getAllProducts();
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.error) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

// export const deleteProduct = createAsyncThunk(
//   "uploads/deleteProduct",
//   async (id, thunkAPI) => {
//     try {
//       return await productsService.deleteProduct(id);
//     } catch (error) {
//       const message =
//         (error.response && error.response.data && error.response.data.error) ||
//         error.message ||
//         error.toString();
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

const uploadImagesSlice = createSlice({
  name: "uploads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //   .addCase(getAllProducts.pending, (state) => {
    //     state.isLoading = true;
    //   })
    //   .addCase(getAllProducts.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.isSuccess = true;
    //     state.uploads = action.payload.response;
    //     state.message = action.payload.message;
    //   })
    //   .addCase(getAllProducts.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.isError = true;
    //     state.isSuccess = false;
    //     state.message = action.payload.message;
    //   })
      .addCase(deleteImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.uploads = [];
        state.message = action.payload;
      })
      .addCase(deleteImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.uploads = [];
        state.message = action.payload;
      })
      .addCase(uploadImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(uploadImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.uploads = action.payload;
      })
      .addCase(uploadImages.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.uploads = [];
        // state.message = action.payload.;
      });
  },
});

export default uploadImagesSlice.reducer;
