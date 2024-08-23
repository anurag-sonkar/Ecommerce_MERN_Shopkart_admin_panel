import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Input, Select, Space } from "antd";
import {
  deleteOrders,
  getAllOrders,
  updateOrders,
} from "../features/orders/ordersSlice";
import { toast, Bounce } from "react-toastify";
import Loader from "../components/Loader";

function Orders() {
  const dispatch = useDispatch();
  const { orders, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.orders
  );
  // console.log({ orders, isLoading, isError, isSuccess, message });

  /* update order status */
  const handleChange = (value, id) => {
    const updatePromise = dispatch(
      updateOrders({ order: value, orderId: id })
    ).unwrap();
    toast.promise(
      updatePromise,
      {
        pending: "Updating...",
        success: "Status updated successfully!",
        error: `Status Update failed!`,
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

  const columns = [
    {
      title: "SNo",
      dataIndex: "sno",
      key: "sno",
      sorter: (a, b) => a.sno - b.sno,
      responsive: ["lg"],
    },
    {
      title: "OrderId",
      dataIndex: "orderid",
      key: "orderid",
      sorter: (a, b) => a.orderid - b.orderid,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Discounted Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Paid At",
      dataIndex: "paidat",
      key: "paidat",
      sorter: (a, b) => a.paidat.localeCompare(b.paidat),
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
              // { value: 'Cash on Delivery', label: 'Cash on Delivery' },
              { value: "Ordered", label: "Ordered" },
              { value: "Processing", label: "Processing" },
              { value: "Dispatched", label: "Dispatched" },
              { value: "Cancelled", label: "Cancelled" },
              { value: "Delivered", label: "Delivered" },
              { value: "Rejected", label: "Rejected" },
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

  const dataSource =
    orders && orders.length > 0
      ? orders.map((order, index) => ({
          key: order._id,
          sno: index + 1,
          orderid: order._id,
          name:
            order.shippingInfo?.firstname +
              " " +
              order.shippingInfo?.lastname || "N/A", // Add a fallback
          price: order.totalPriceAfterDiscount,
          paidat: new Date(order.paidAt).toLocaleString(),
          statusValue: order.orderStatus,

          shippingInfo: order.shippingInfo,
          orderItems: order.orderItems,
          paymentInfo: order.paymentInfo,
          totalPrice: order.totalPrice,
          totalPriceAfterDiscount: order.totalPriceAfterDiscount,
          userAccountInfo: order.user,
        }))
      : [];

  const expandedRowRender = (record) => (
    <div className="grid grid-cols-4 gap-2">
      <div className="shadow-2xl px-4 py-6 rounded-lg">
        <p>
          <strong
            className="text-xl underline
    "
          >
            Shipping Info
          </strong>
        </p>
        <p>
          <strong>Address:</strong> {record.shippingInfo.address.line}
        </p>
        <p>
          <strong>City:</strong> {record.shippingInfo.address.city}
        </p>
        <p>
          <strong>State:</strong> {record.shippingInfo.address.state}
        </p>
        <p>
          <strong>Zipcode:</strong> {record.shippingInfo.address.zipcode}
        </p>
        <p>
          <strong>Name :</strong>{" "}
          {record.shippingInfo.firstname + " " + record.shippingInfo.lastname}
        </p>
        <p>
          <strong>Phone No. : </strong>
          {record.shippingInfo.phone}
        </p>
      </div>

      <div className="shadow-2xl px-4 py-6 rounded-lg">
        <p>
          <strong
            className="text-xl underline
    "
          >
            Payment Info:
          </strong>
        </p>
        <p>
          <strong>Razorpay Order ID :</strong>{" "}
          {record.paymentInfo.razaorpayOrderId}
        </p>
        <p>
          <strong>Razorpay Payment ID :</strong>{" "}
          {record.paymentInfo.razaorpayPaymentId}
        </p>
        <p>
          <strong>Payment : </strong>₹{record.totalPriceAfterDiscount}
        </p>
      </div>

      <div className="shadow-2xl px-4 py-6 rounded-lg">
        <p>
          <strong
            className="text-xl underline
    "
          >
            Order Info:
          </strong>
        </p>
        <p>
          <strong>Total Price : </strong>₹{record.totalPrice}
        </p>
        <p>
          <strong>Total Price After Discount : </strong>₹
          {record.totalPriceAfterDiscount}
        </p>
        <p>
          <strong>Products : </strong>{" "}
          <ul className="list-disc pl-8">
            {record.orderItems.map((item, index) => (
              <li key={index}>
                {item.product.title} - Quantity: {item.count}, Color:{" "}
                <span
                  className="h-2 w-2 rounded-full inline-block"
                  style={{ backgroundColor: item.color }}
                ></span>{" "}
                , Price :₹{item.price}
              </li>
            ))}
          </ul>
        </p>
      </div>

      <div className="shadow-2xl px-4 py-6 rounded-lg">
        <p>
          <strong
            className="text-xl underline
    "
          >
            UserAccountInfo :
          </strong>
        </p>
        <p>
          <strong>Name :</strong> {record.userAccountInfo.name}
        </p>
        <p>
          <strong>Email :</strong> {record.userAccountInfo.email}
        </p>
      </div>
    </div>
  );

  /* initial dispatch getAllOrders method */
  useEffect(() => {
    const orderPromise = dispatch(getAllOrders()).unwrap();

    toast.promise(
      orderPromise,
      {
        pending: "Fetching... orders",
        success: "Fetching orders successfully!",
        error: `Fetching orders failed!`,
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

  return (
    <section className="mt-4 relative">
      <h1 className="text-3xl font-bold my-4">Orders</h1>
      {/* {isError && <p>Error: {message}</p>} */}
      <Table
        columns={columns}
        dataSource={dataSource}
        expandable={{ expandedRowRender }}
        scroll={{ x: 1000 }}
      />
      {isLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen h-full flex justify-center items-center bg-gray-200 bg-opacity-50">
          <Loader />
        </div>
      )}
    </section>
  );
}

export default Orders;
