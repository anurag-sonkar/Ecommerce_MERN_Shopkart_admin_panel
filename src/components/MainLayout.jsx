import React, { useState, useEffect } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
const { Header, Sider, Content } = Layout;
import { RiDashboardFill } from "react-icons/ri";
import { RiCustomerService2Line } from "react-icons/ri";
import { IoCartOutline } from "react-icons/io5";
import { FaProductHunt } from "react-icons/fa";
import { CiCircleList } from "react-icons/ci";
import { SiBrandfolder } from "react-icons/si";
import { MdOutlineCategory } from "react-icons/md";
import { IoIosColorPalette } from "react-icons/io";
import { AiOutlineDropbox } from "react-icons/ai";
import { RiBloggerLine } from "react-icons/ri";
import { BiLogoBlogger } from "react-icons/bi";
import { RiCoupon3Line } from "react-icons/ri";
import { SiGooglemarketingplatform } from "react-icons/si";

import logo from "../assets/logo.svg";
import { Outlet, Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Menu as TailwindMenu,
  MenuButton as TailwindMenuButton,
  MenuItems as TailwindMenuItems,
  MenuItem as TailwindMenuItem,
} from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../features/auth/authSlice";
import { toast, Bounce } from "react-toastify";
import Loader from "../components/Loader";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");
  const dispatch = useDispatch();
  const {user,isLoading} = useSelector(state=>state.auth)
  const [profile , setProfile] = useState( user?.imgpath?.url || '../src/assets/profile.png')

  const handleSignOut =  (e)=>{
    e.preventDefault();
    const signOutPromise = dispatch(signOut()).unwrap()
    toast.promise(
      signOutPromise,
      {
        pending: "Sigining out...",
        success: "Sigining out successfully!",
        error: `Signout failed!`,
      },
      {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );

  }


  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    const storedSelectedKey = localStorage.getItem("selectedKey");
    const storedCollapsedState = localStorage.getItem("collapsed");

    if (storedSelectedKey) {
      setSelectedKey(storedSelectedKey);
    }
    if (storedCollapsedState) {
      setCollapsed(storedCollapsedState === "true");
    }
  }, []);

  

  const handleMenuClick = ({ key }) => {
    setSelectedKey(key);
    localStorage.setItem("selectedKey", key);
  };

  const toggleCollapsed = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    localStorage.setItem("collapsed", newCollapsedState);
  };



  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo roboto-bold ">
          <span className="sm-logo">MD</span>
          <span className="lg-logo">Mern Dev </span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={[
            {
              key: "dashboard",
              icon: <RiDashboardFill />,
              label: <Link to="/admin">Dashboard</Link>,
            },
            {
              key: "customers",
              icon: <RiCustomerService2Line />,
              label: <Link to="/admin/customers">Customers</Link>,
            },
            {
              key: "catalog",
              icon: <IoCartOutline />,
              label: "Catalog",
              children: [
                {
                  key: "add-product",
                  icon: <FaProductHunt />,
                  label: <Link to="/admin/add-product">Add Product</Link>,
                },
                {
                  key: "product-list",
                  icon: <CiCircleList />,
                  label: <Link to="/admin/products">Products List</Link>,
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder />,
                  label: <Link to="/admin/add-brand">Add Brand</Link>,
                },
                {
                  key: "brand-list",
                  icon: <CiCircleList />,
                  label: <Link to="/admin/brands">Brand List</Link>,
                },
                {
                  key: "add-product-category",
                  icon: <MdOutlineCategory />,
                  label: (
                    <Link to="/admin/add-product-category">
                      Add Product Category
                    </Link>
                  ),
                },
                {
                  key: "products-category-list",
                  icon: <CiCircleList />,
                  label: (
                    <Link to="/admin/products-category-list">
                      Product Categories List
                    </Link>
                  ),
                },
                {
                  key: "color",
                  icon: <IoIosColorPalette />,
                  label: <Link to="/admin/add-color">Add Color</Link>,
                },
                {
                  key: "color-list",
                  icon: <CiCircleList />,
                  label: <Link to="/admin/color-list">Color List</Link>,
                },
              ],
            },
            {
              key: "orders",
              icon: <AiOutlineDropbox />,
              label: <Link to="/admin/orders">Orders</Link>,
            },
            {
              key: "marketing",
              icon: <SiGooglemarketingplatform />,

              label: "Marketing",
              children: [
                {
                  key: "add-coupon",
                  icon: <RiCoupon3Line />,
                  label: <Link to="/admin/add-coupon">Add coupon</Link>,
                },
                {
                  key: "coupon-list",
                  icon: <CiCircleList />,
                  label: <Link to="/admin/coupons-list">Coupons List</Link>,
                },
              ],
            },
            {
              key: "blogs",
              icon: <RiBloggerLine />,
              label: "Blogs",
              children: [
                {
                  key: "add-blog",
                  icon: <BiLogoBlogger />,
                  label: <Link to="/admin/add-blog">Add blog</Link>,
                },
                {
                  key: "blog-list",
                  icon: <CiCircleList />,
                  label: "Blog List",
                },
                {
                  key: "add-blog-category",
                  icon: <MdOutlineCategory />,
                  label: (
                    <Link to="/admin/add-blog-category">Add Blog Category</Link>
                  ),
                },
                {
                  key: "blogs-category-list",
                  icon: <CiCircleList />,
                  label: (
                    <Link to="/admin/blogs-category-list">Blog Category</Link>
                  ),
                },
              ],
            },
            {
              key: "enquires",
              icon: <CiCircleList />,
              label: <Link to="/admin/enquires">Enquires</Link>,
            },
            // {
            //   key: "demo",
            //   icon: <RiCustomerService2Line />,
            //   label: <Link to="/admin/product/view/:id">View</Link>,
            //   // style: {display : 'none'}
            // },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
          className="flex justify-between"
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleCollapsed}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <div>
            <TailwindMenu as="div" className="relative mt-2 mx-5">
              <div>
                <TailwindMenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={profile}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                </TailwindMenuButton>
              </div>
              <TailwindMenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <TailwindMenuItem>
                  <Link
                    to="/admin/profile"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    My MyAccount
                  </Link>
                </TailwindMenuItem>
                <TailwindMenuItem>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Sign out
                  </button>
                </TailwindMenuItem>
              </TailwindMenuItems>
            </TailwindMenu>
          </div>
        </Header>
        <Content
          style={{
            margin: "8px 16px",
            padding: 0,
            minHeight: 280,
            borderRadius: borderRadiusLG,
          }}
        >
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
          <div className="relative"><Outlet /> {/*content */} </div>
          {isLoading && (
        <div className="absolute top-0 left-0 w-full flex justify-center items-center bg-gray-200 bg-opacity-50 min-h-screen h-full">
          <Loader />
        </div>
      )}
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
