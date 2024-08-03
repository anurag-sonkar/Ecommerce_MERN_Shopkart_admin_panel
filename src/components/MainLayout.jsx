import React, { useState,useEffect } from "react";
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

import logo from "../assets/logo.svg";
import { Outlet, Link } from "react-router-dom";

import {
  Menu as TailwindMenu,
  MenuButton as TailwindMenuButton,
  MenuItems as TailwindMenuItems,
  MenuItem as TailwindMenuItem,
} from "@headlessui/react";

function MainLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("dashboard");

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
                  label: <Link to='/admin/add-product'>Add Product</Link>,
                },
                {
                  key: "product-list",
                  icon: <CiCircleList />,
                  label: <Link to='/admin/products'>Products List</Link>,
                },
                {
                  key: "brand",
                  icon: <SiBrandfolder />,
                  label: <Link to="/admin/add-brand">Add Brand</Link>,
                },
                {
                  key: "brand-list",
                  icon: <CiCircleList />,
                  label: <Link to='/admin/brands'>Brand List</Link>,
                },
                {
                  key: "add-product-category",
                  icon: <MdOutlineCategory />,
                  label: <Link to='/admin/add-product-category'>Add Product Category</Link>
                },
                {
                  key: "products-category-list",
                  icon: <CiCircleList />,
                  label:  <Link to='/admin/products-category-list'>Product Categories List</Link>
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
              label: "Orders",
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
                  label:<Link to="/admin/add-blog-category">Add Blog Category</Link>
                },
                {
                  key: "blogs-category-list",
                  icon: <CiCircleList />,
                  label: <Link to="/admin/blogs-category-list">Blog Category</Link>
                },
              ],
            },
            {
              key: "enquires",
              icon: <CiCircleList />,
              label: <Link to="/admin/enquires">Enquires</Link>,
            },
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
                    src="../src/assets/photo.png"
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
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Your Profile
                  </Link>
                </TailwindMenuItem>
                <TailwindMenuItem>
                  <Link
                    to="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100"
                  >
                    Sign out
                  </Link>
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
          <Outlet /> {/* Content */}
        </Content>
      </Layout>
    </Layout>
  );
}

export default MainLayout;