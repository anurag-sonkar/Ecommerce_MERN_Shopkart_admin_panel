import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/customers/customersSlice";
import { Table } from "antd";
import Loader from "../components/Loader";

function Customers() {
  const dispatch = useDispatch();
  const { customers, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.customers
  );

  useEffect(() => {
    dispatch(getAllUsers());
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
    <section className='mt-4'>
      <h1 className='text-3xl font-bold my-4'>Recent Orders</h1>
      {isLoading && <Loader/>}
      {isError && <p>Error: {message}</p>}
      {isSuccess && <Table dataSource={dataSource} columns={columns} />}
    </section>
  );
}

export default Customers;
