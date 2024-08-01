import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import customersReducers from "../features/customers/customersSlice";
import productsReducers from "../features/products/productSlice";
import brandsReducers from "../features/brands/brandsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    customers: customersReducers,
    products: productsReducers,
    brands : brandsReducers
  },
});