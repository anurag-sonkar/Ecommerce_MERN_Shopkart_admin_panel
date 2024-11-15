import React, { useEffect, useState ,lazy , Suspense} from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const AuthenticationForm = React.lazy(() => import('./pages/Authentication/Auth/Auth'));
const ResetPassword = React.lazy(() => import('./pages/Authentication/ResetPassword'));
const ForgotPassword = React.lazy(() => import('./pages/Authentication/ForgotPassword'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const MainLayout = React.lazy(() => import('./components/MainLayout'));
const Enquires = React.lazy(() => import('./pages/Enquires'));
const AddBlog = React.lazy(() => import('./pages/AddBlog'));
const AddBlogCategory = React.lazy(() => import('./pages/AddBlogCategory'));
const AddColor = React.lazy(() => import('./pages/AddColor'));
const AddBrand = React.lazy(() => import('./pages/AddBrand'));
const AddProduct = React.lazy(() => import('./pages/AddProduct'));
const SignupForm = React.lazy(() => import('./pages/Authentication/Signup/Signup'));
const LoginForm = React.lazy(() => import('./pages/Authentication/Login/Login'));
const Customers = React.lazy(() => import('./pages/Customers'));
const Products = React.lazy(() => import('./pages/Products'));
const Brands = React.lazy(() => import('./pages/Brands'));
const Error = React.lazy(() => import('./pages/Error'));
const AddProductCategory = React.lazy(() => import('./pages/AddProductCategory'));
const ProductsCategory = React.lazy(() => import('./pages/ProductsCategory'));
const BlogsCategory = React.lazy(() => import('./pages/BlogsCategory'));
const Colors = React.lazy(() => import('./pages/Colors'));
const Orders = React.lazy(() => import('./pages/Orders'));
const AddCoupon = React.lazy(() => import('./pages/AddCoupon'));
const Coupons = React.lazy(() => import('./pages/Coupons'));
const ViewProduct = React.lazy(() => import('./pages/ViewProduct'));
const MyAccount = React.lazy(() => import('./pages/MyAccount'));

import ProtectedRoutes from './pages/routing/ProtectedRoutes'
import { useSelector } from 'react-redux'
import { Button } from 'antd';
import LoadingPage from './components/LoadingPage';

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
      <Suspense fallback={<LoadingPage />}>
          <Routes>
            <Route path='/' element={<AuthenticationForm />} />
            <Route path='/signup' element={<SignupForm />} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/reset-password/:token' element={<ResetPassword />} />
            <Route path='/forgot-password' element={<ForgotPassword />} />

            <Route path='/admin' element={<ProtectedRoutes><MainLayout /></ProtectedRoutes>}>
              <Route index element={<Dashboard />} />
              <Route path='enquires' element={<Enquires />} />
              <Route path='add-blog' element={<AddBlog />} />
              <Route path='add-blog-category' element={<AddBlogCategory />} />
              <Route path='add-product-category' element={<AddProductCategory />} />
              <Route path='add-brand' element={<AddBrand />} />
              <Route path='add-color' element={<AddColor />} />
              <Route path='add-product' element={<AddProduct />} />
              <Route path='products' element={<Products />} />
              <Route path='/admin/product/view/:id' element={<ViewProduct />} />
              <Route path='/admin/profile' element={<MyAccount />} />
              <Route path='customers' element={<Customers />} />
              <Route path='brands' element={<Brands />} />
              <Route path='products-category-list' element={<ProductsCategory />} />
              <Route path='blogs-category-list' element={<BlogsCategory />} />
              <Route path='color-list' element={<Colors />} />
              <Route path='orders' element={<Orders />} />
              <Route path='add-coupon' element={<AddCoupon />} />
              <Route path='coupons-list' element={<Coupons />} />


            </Route>
            <Route path='*' element={<Error />} />
          </Routes>
      </Suspense>
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