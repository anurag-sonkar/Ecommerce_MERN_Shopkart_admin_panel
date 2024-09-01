import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateCustomerStatus } from "../features/customers/customersSlice";
import { Table, Select, Space } from "antd";
import { toast ,Bounce} from 'react-toastify';
import Loader from "../components/Loader";
import { useLocation } from "react-router-dom";

function Customers() {
  const dispatch = useDispatch();
  const {pathname} = useLocation()

  const { customers, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.customers
  );

  const {user} = useSelector(state=>state.auth)
  console.log(customers)

 

  /* update order status */
  const handleChange = (value, id) => {
    console.log(value , id)
    const updatePromise = dispatch(
      updateCustomerStatus({ status: value, id: id })
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
      // sorter: (a, b) => a.mobile.localeCompare(b.mobile),
    },
    {
      title: 'Profile',
      dataIndex: 'profile',
      key: 'profile',
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
              { value: "true", label: "Blocked" },
              { value: "false", label: "Unblocked" },
            ]}
          />
        </Space>
      ),
    },
  ];

  
  const dataSource =  customers?.map((customer, index) => ({
    key: customer?._id,
    sno:index+1,
    name: customer?.name,
    email: customer?.email,
    mobile: customer?.mobile,
    profile : <img src={customer?.imgpath?.url || "../../public/assets/profile.png"} className="w-9 h-9 rounded-full object-cover border-2 border-blue-100 p-[0.5px]" />,
    statusValue : customer?.isBlocked ? "Blocked" : "Unblocked" 
  }));
  
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
  
  

  return (
    <section className='mt-4 relative roboto-regular'>
      <div className="flex justify-between items-center">
      <h1 className="text-4xl mb-3 roboto-black">Customers</h1>
      <div className="flex gap-2">
        <div className="flex items-center gap-1">
          <div className="order-status unblocked"></div>
          <div>Unblocked</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="order-status blocked"></div>
          <div>Blocked</div>
        </div>
       
      </div>
      </div>
      {/* {isError && <p>Error: {message}</p>} */}
      <Table dataSource={dataSource} columns={columns} scroll={{ x: 1000 }} 
      rowClassName={(record) => {
          switch (record.statusValue) {
    case 'Unblocked':
      return 'unblocked'; 
    case 'Blocked':
      return 'blocked'; 
    
    default:
      return '';
  }
}}
      />
      {isLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen h-full flex justify-center items-center bg-gray-200 bg-opacity-50">
          <Loader />
        </div>
      )}
    </section>
  );
}

export default Customers;
