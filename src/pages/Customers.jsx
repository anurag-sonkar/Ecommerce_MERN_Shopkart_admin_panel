import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/customers/customersSlice";
import { Table } from "antd";
import { toast ,Bounce} from 'react-toastify';
import Loader from "../components/Loader";

function Customers() {
  const dispatch = useDispatch();
  const { customers, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.customers
  );

  useEffect(() => {
    const fetchPromise =  dispatch(getAllUsers()).unwrap();
    toast.promise(
      fetchPromise,
      {
        pending: 'Fetching... customers',
        success: 'Fetching customers successfully!',
        error: `Fetching customers failed!`
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
        title: 'SNo',
        dataIndex: 'sno',
        key: 'sno',
        sorter: (a, b) => a.sno - b.sno,
      },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: 'Mobile',
      dataIndex: 'mobile',
      key: 'mobile',
      sorter: (a, b) => a.mobile.localeCompare(b.mobile),
    },
  ];

  const dataSource = customers.map((customer, index) => ({
    key: customer._id,
    sno:index+1,
    name: customer.name,
    email: customer.email,
    mobile: customer.mobile,
  }));

  return (
    <section className='mt-4 relative'>
      <h1 className='text-3xl font-bold my-4'>Recent Orders</h1>
      {isError && <p>Error: {message}</p>}
      <Table dataSource={dataSource} columns={columns} />
      {isLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen h-full flex justify-center items-center bg-gray-200 bg-opacity-50">
          <Loader />
        </div>
      )}
    </section>
  );
}

export default Customers;
