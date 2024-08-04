import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customersReducers from "../features/customers/customersSlice";
import productsReducers from "../features/products/productSlice";
import brandsReducers from "../features/brands/brandsSlice";
import productCategoryReducers from "../features/productCategory/productCategorySlice"
import blogCategoryReducers from "../features/blogCategory/blogCategorySlice"
import colorsReducers from "../features/color/colorSlice"
import enquriesReducers from "../features/enquires/enquiresSlice"
import ordersReducers from "../features/orders/ordersSlice"
import uploadImagesReducers from "../features/upload/uploadSlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducers,
    products: productsReducers,
    brands : brandsReducers,
    productCategory:productCategoryReducers,
    blogCategory:blogCategoryReducers,
    colors:colorsReducers,
    enquries:enquriesReducers,
    orders : ordersReducers,
    imageUpload : uploadImagesReducers
  },
});
