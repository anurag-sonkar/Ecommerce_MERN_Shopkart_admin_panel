import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Input, Select, Space } from "antd";
import Loader from "../components/Loader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteOrders, getAllOrders, updateOrders } from "../features/orders/ordersSlice";

function Orders() {
  const dispatch = useDispatch();
  const { orders, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.orders
  );
  console.log({ orders, isLoading, isError, isSuccess, message });

  const handleChange = (value, id) => {
    dispatch(updateOrders({ order: value, orderId: id }));
  };

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    // Extract the date components
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-indexed
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Format the date and time as DD-MM-YYYY HH:MM:SS
    const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }

  useEffect(() => {
    dispatch(getAllOrders());
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

  const dataSource = orders.map((order, index) => ({
    key: order._id,
    sno: index + 1,
    name: order.orderby.name,
    product: order.products.map((element) => element.product.title + ",").join(" "), // Join product titles with space
    amount: order.paymentIntent.amount,
    // date: formatTimestamp(order.paymentIntent.created),
    date: new Date(order.createdAt).toLocaleString(),
    statusValue: order.orderStatus,
    // action: (
    //   <div className="flex items-center gap-5">
    //     <Link>
    //       <FaEdit size={20} onClick={() => showModal(color._id, color.color)} />
    //       <FaEdit size={20} />
    //     </Link>
    //     <Link>
    //       <MdDelete
    //         size={22}
    //         color="crimson"
    //         onClick={() => dispatch(deleteOrders(order._id))}
    //       />
    //     </Link>
    //   </div>
    // ),
  }));

  return (
    <section className="mt-4">
      <h1 className="text-3xl font-bold my-4">Orders</h1>
      {isLoading && <Loader />}
      {isError && <p>Error: {message}</p>}
      {isSuccess && <Table columns={columns} dataSource={dataSource} />}
    </section>
  );
}

export default Orders;
