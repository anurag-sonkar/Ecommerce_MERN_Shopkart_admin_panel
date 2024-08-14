import React, { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import AuthenticationForm from './pages/Authentication/Auth/Auth'

import ResetPassword from './pages/Authentication/ResetPassword'
import ForgotPassword from './pages/Authentication/ForgotPassword'
import Dashboard from './pages/Dashboard'
import MainLayout from './components/MainLayout'
import Enquires from './pages/Enquires'
import AddBlog from './pages/AddBlog'
import AddBlogCategory from './pages/AddBlogCategory'
import AddColor from './pages/AddColor'
import AddBrand from './pages/AddBrand'
import AddProduct from './pages/AddProduct'
import SignupForm from './pages/Authentication/Signup/Signup'
import LoginForm from './pages/Authentication/Login/Login'
import Customers from './pages/Customers'
import Products from './pages/Products'
import Brands from './pages/Brands'
import Error from './pages/Error'
import AddProductCategory from './pages/AddProductCategory'
import ProductsCategory from './pages/ProductsCategory'
import BlogsCategory from './pages/BlogsCategory'
import Colors from './pages/Colors'
import Orders from './pages/Orders'
import AddCoupon from './pages/AddCoupon'
import Coupons from './pages/Coupons'
import ViewProduct from './pages/ViewProduct'
import { useDispatch, useSelector } from 'react-redux'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast, Bounce } from "react-toastify";
import Profile from './pages/MyAccount'
import MyAccount from './pages/MyAccount'

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {pathname} = useLocation()
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // console.log( user, isLoading, isError, isSuccess, message )
    if (user) {
      navigate(pathname);
    } else {
      navigate("/");
    }
  }, [dispatch,user]);
  return (
    <>
      {/* <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
            transition:Bounce
          /> */}
    <Routes>
      <Route path='/' element={<AuthenticationForm />} />
      <Route path='/signup' element={<SignupForm />} />
      <Route path='/login' element={<LoginForm />} />

      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />

      <Route path='/admin' element={<MainLayout />}>
        <Route index element={<Dashboard/>} />
        <Route path='enquires' element={<Enquires/>} />
        <Route path='add-blog' element={<AddBlog/>} />
        <Route path='add-blog-category' element={<AddBlogCategory/>} />
        <Route path='add-product-category' element={<AddProductCategory/>} />
        <Route path='add-brand' element={<AddBrand/>} />
        <Route path='add-color' element={<AddColor/>} />
        <Route path='add-product' element={<AddProduct/>} />
        <Route path='products' element={<Products/>} />
        <Route path='/admin/product/view/:id' element={<ViewProduct/>} />
        <Route path='/admin/profile' element={<MyAccount/>} />
        <Route path='customers' element={<Customers/>} />
        <Route path='brands' element={<Brands/>} />
        <Route path='products-category-list' element={<ProductsCategory/>} />
        <Route path='blogs-category-list' element={<BlogsCategory/>} />
        <Route path='color-list' element={<Colors/>} />
        <Route path='orders' element={<Orders/>} />
        <Route path='add-coupon' element={<AddCoupon/>} />
        <Route path='coupons-list' element={<Coupons/>} />


      </Route>
      <Route path='*' element={<Error/>} />
    </Routes>
    </>
  )
}

export default App