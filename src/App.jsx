import React, { useEffect, useState } from 'react'
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MyAccount from './pages/MyAccount'
import ProtectedRoutes from './pages/routing/ProtectedRoutes'
import { useSelector } from 'react-redux'
import { Button } from 'antd';

const useDesktopViewportForAdmin = () => {
  const location = useLocation();

  useEffect(() => {
    const adminPaths = [
      '/admin',
      '/admin/enquires',
      '/admin/add-blog',
      '/admin/add-blog-category',
      '/admin/add-product-category',
      '/admin/add-brand',
      '/admin/add-color',
      '/admin/add-product',
      '/admin/products',
      '/admin/product/view',
      '/admin/profile',
      '/admin/customers',
      '/admin/brands',
      '/admin/products-category-list',
      '/admin/blogs-category-list',
      '/admin/color-list',
      '/admin/orders',
      '/admin/add-coupon',
      '/admin/coupons-list',
    ];

    const isAdminRoute = adminPaths.some((path) => location.pathname.startsWith(path));

    if (isAdminRoute) {
      // Set viewport for desktop
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=1024');
      } else {
        const meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=1024';
        document.head.appendChild(meta);
      }
    } else {
      // Reset viewport to default
      const metaViewport = document.querySelector('meta[name="viewport"]');
      if (metaViewport) {
        metaViewport.setAttribute('content', 'width=device-width, initial-scale=1');
      }
    }
  }, [location]);
};


function App() {
  useDesktopViewportForAdmin() // always on desktop mode when on mobile browser
  const {pathname} = useLocation()
  const {user} = useSelector(state=>state.auth)
  const navigate = useNavigate()
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(
    ()=>{
      if(user){
        
          navigate(pathname)
      }
    },[user]
  )


  const checkNetworkStatus = () =>{
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () =>setIsOnline(false);

    
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);


  }
  
  useEffect(() => {
    checkNetworkStatus()
    // const handleOnline = () => setIsOnline(true);
    // const handleOffline = () =>setIsOnline(false);

    
    // window.addEventListener("online", handleOnline);
    // window.addEventListener("offline", handleOffline);

    // // Cleanup the event listeners on component unmount
    // return () => {
    //   window.removeEventListener("online", handleOnline);
    //   window.removeEventListener("offline", handleOffline);
    // };
  }, []);


  useEffect(
    ()=>{
      const savedImage = localStorage.getItem("offline-image");
        if (savedImage) {
          setImageSrc(savedImage);
        }

    }
    ,[isOnline]
  )

  if(isOnline){
    return (
      <>
        <ToastContainer
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
            />
      <Routes>
        <Route path='/' element={<AuthenticationForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/reset-password/:token' element={<ResetPassword />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
  
        <Route path='/admin' element={<ProtectedRoutes><MainLayout /></ProtectedRoutes>}>
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


  else{
    return (
        <div className="w-full h-[100vh] flex justify-center items-center bg-white">
            <div className="flex flex-col justify-center items-center gap-4">
              <img src={imageSrc} className="object-contain w-64 h-auto"/>
              <p className="text-lg font-medium">You appear to be offline</p>
              <p className="text-xs text-gray-500">You can't use Shopkart until you're connected to the internet</p>
              <Button type="primary" onClick={checkNetworkStatus} className="min-w-24">Retry</Button>
            </div>
        </div>
    )
  }

}

export default App