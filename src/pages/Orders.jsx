import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Input, Select, Space } from "antd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteOrders, getAllOrders, updateOrders } from "../features/orders/ordersSlice";
import { toast ,Bounce} from 'react-toastify';
import Loader from "../components/Loader";

function Orders() {
  const dispatch = useDispatch();
  const { orders, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.orders
  );
  // console.log({ orders, isLoading, isError, isSuccess, message });

  const handleChange = (value, id) => {
    const updatePromise = dispatch(updateOrders({ order: value, orderId: id })).unwrap();
    toast.promise(
      updatePromise,
      {
        pending: 'Updating...',
        success: 'Status updated successfully!',
        error: `Status Update failed!`
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
  };

  useEffect(() => {
    const orderPromise = dispatch(getAllOrders()).unwrap();

    toast.promise(
      orderPromise,
      {
        pending: 'Fetching... orders',
        success: 'Fetching orders successfully!',
        error: `Fetching orders failed!`
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
  }, [dispatch]);

  const columns = [
    {
      title: "SNo",
      dataIndex: "sno",
      key: "sno",
      sorter: (a, b) => a.sno - b.sno,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Product",
      dataIndex: "product",
      key: "product",
      sorter: (a, b) => a.product.localeCompare(b.product),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      sorter: (a, b) => a.date.localeCompare(b.date),
    },
    {
      title: "Status",
      dataIndex: "statusValue", // Use the string value for sorting
      key: "statusValue",
      sorter: (a, b) => a.statusValue.localeCompare(b.statusValue),
      render: (text, record) => (
        <Space wrap>
          <Select
            defaultValue={record.statusValue}
            style={{ width: 120 }}
            onChange={(value) => handleChange(value, record.key)}
            options={[
              { value: 'Not Processed', label: 'Not Processed' },
              { value: 'Cash on Delivery', label: 'Cash on Delivery' },
              { value: 'Processing', label: 'Processing' },
              { value: 'Dispatched', label: 'Dispatched' },
              { value: 'Cancelled', label: 'Cancelled' },
              { value: 'Delivered', label: 'Delivered' },
            ]}
          />
        </Space>
      ),
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    // },
  ];

  const dataSource = orders && orders.length > 0 ? orders.map((order, index) => ({
    key: order._id,
    sno: index + 1,
    name: order.orderby?.name || "N/A", // Add a fallback
    product: order.products && order.products.length !== 0 ? order.products.map((element) => element.product.title).join(", ") : "N/A", // Add a fallback
    amount: order.paymentIntent.amount,
    date: new Date(order.createdAt).toLocaleString(),
    statusValue: order.orderStatus,
  })) : [];
  
  

  return (
    <section className="mt-4 relative">
      <h1 className="text-3xl font-bold my-4">Orders</h1>
      {isError && <p>Error: {message}</p>}
      <Table columns={columns} dataSource={dataSource} />
      {isLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen h-full flex justify-center items-center bg-gray-200 bg-opacity-50">
          <Loader />
        </div>
      )}
    </section>
  );
}

export default Orders;
