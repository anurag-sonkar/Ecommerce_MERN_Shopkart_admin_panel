import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Input, Select, Space } from "antd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteEnquires, getAllEnquires, updateEnquires } from "../features/enquires/enquiresSlice";
import { toast ,Bounce} from 'react-toastify';
import Loader from "../components/Loader";

function Enquires() {
  const dispatch = useDispatch();
  const { enquires, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.enquries
  );
  console.log({ enquires, isLoading, isError, isSuccess, message });

  const handleChange = (value, id) => {
    const updateEnqStatus =  dispatch(updateEnquires({ enquiry: value, enquiryId: id })).unwrap();

    toast.promise(
      updateEnqStatus,
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
    const enquiryPromise =  dispatch(getAllEnquires()).unwrap();

    toast.promise(
      enquiryPromise,
      {
        pending: 'Fetching... enquries',
        success: 'Fetching enquries successfully!',
        error: `Fetching enquries failed!`
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


  const handleDelete = (id)=>{
    const deletePromise =  dispatch(deleteEnquires(id)).unwrap()
    toast.promise(
      deletePromise,
      {
        pending: 'Deleting...',
        success: 'Deleted successfully!',
        error: `Deletion failed!`
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
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Mobile",
      dataIndex: "mobile",
      key: "mobile",
      sorter: (a, b) => a.mobile.localeCompare(b.mobile),
    },
    {
      title: "Comment",
      dataIndex: "comment",
      key: "comment",
      sorter: (a, b) => a.comment.localeCompare(b.comment),
    },
    {
      title: "Status",
      dataIndex: "statusValue",  // Use the string value for sorting
      key: "statusValue",
      sorter: (a, b) => a.statusValue.localeCompare(b.statusValue),
      render: (text, record) => (
        <Space wrap>
          <Select
            defaultValue={record.statusValue}
            style={{ width: 120 }}
            onChange={(value) => handleChange(value, record.key)}
            options={[
              { value: 'Pending', label: 'Pending' },
              { value: 'Contacted', label: 'Contacted' },
            ]}
          />
        </Space>
      ),
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
    },
  ];

  const dataSource = enquires.map((enq, index) => ({
    key: enq._id,
    sno: index + 1,
    name: enq.name,
    email: <Link to={`mailto:${enq.email}`} className="text-blue-600" >{enq.email}</Link>,
    mobile: <Link to={`tel:${enq.mobile}`} className="text-blue-600" >{enq.mobile}</Link>,
    comment: enq.comment,
    statusValue: enq.status,  // Add status value for sorting
    delete: (
      <div className="grid place-items-center">
        <Link>
          <MdDelete
            size={22}
            color="crimson"
            onClick={()=>handleDelete(enq._id)}
          />
        </Link>
      </div>
    ),
  }));

  return (
    <section className="mt-4 relative">
      <h1 className="text-3xl font-bold my-4">Enquires</h1>
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

export default Enquires;
