import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Input } from "antd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import Loader from "../components/Loader";
import { deleteCoupon, getAllCoupons, updateCoupon } from "../features/coupons/couponsSlice";
import { SiNamecheap } from "react-icons/si";
import { BsCalendarDateFill } from "react-icons/bs";
import { RiDiscountPercentFill } from "react-icons/ri";
import { format, parseISO } from "date-fns";

function Coupons() {
  const dispatch = useDispatch();
  const { coupons, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.coupons
  );
  // console.log({ coupons, isLoading, isError, isSuccess, message })

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log(name, expiry, discount);

  const iconStyle = {
    marginRight: "16px",
  };

  const showModal = (id, name, expiry, discount) => {
    const formattedDate = format(parseISO(expiry), "yyyy-MM-dd");
    setId(id);
    setName(name);
    setExpiry(formattedDate);
    setDiscount(discount);
    setIsModalOpen(true);
  };

  

  const handleUpdateCoupon = () => {
    const updatePromise = dispatch(
      updateCoupon({id, name, expiry , discount })
    ).unwrap();
    setIsModalOpen(false);
    toast.promise(
      updatePromise,
      {
        pending: "Updating...",
        success: "Updated successfully!",
        error: `Update failed!`,
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

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    const deletePromise = dispatch(deleteCoupon(id)).unwrap();
    toast.promise(
      deletePromise,
      {
        pending: "Deleting...",
        success: "Deleted successfully!",
        error: `Deletion failed!`,
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
    const uploadPromise = dispatch(getAllCoupons()).unwrap();
    toast.promise(
      uploadPromise,
      {
        pending: "Fetching coupons...",
        // success: "Fetched success!",
        error: `Fetching failed!`,
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
      title: "Expiry",
      dataIndex: "expiry",
      key: "expiry",
      sorter: (a, b) => a.expiry.localeCompare(b.expiry),
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      sorter: (a, b) => a.discount - b.discount,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSource = coupons.map((coupon, index) => ({
    key: coupon._id,
    sno: index + 1,
    name: coupon.name,
    expiry: new Date(coupon.expiry).toLocaleDateString(),
    discount: coupon.discount,
    action: (
      <div className="flex items-center gap-5">
        <Link>
          <FaEdit
            size={20}
            onClick={() =>
              showModal(coupon._id, coupon.name, coupon.expiry, coupon.discount)
            }
          />
        </Link>
        <Link>
          <MdDelete
            size={22}
            color="crimson"
            onClick={() => handleDelete(coupon._id)}
          />
        </Link>
      </div>
    ),
  }));

  return (
    <section className="mt-4 relative">
      <h1 className="text-3xl font-bold my-4">Coupons List</h1>
      {isError && <p>Error: {message}</p>}
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Update Coupon"
        open={isModalOpen}
        onOk={handleUpdateCoupon}
        onCancel={handleCancel}
      >
        <form className="grid gap-5">
          <Input
            size="large"
            placeholder="Enter Coupon Name"
            prefix={<SiNamecheap style={iconStyle} />}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            size="large"
            type="date"
            placeholder="Enter Expiry Date"
            prefix={<BsCalendarDateFill style={iconStyle} />}
            value={expiry}
            onChange={(e)=>setExpiry(e.target.value)}
          />
          <Input
            size="large"
            type="datenumber"
            placeholder="Enter Discount"
            prefix={<RiDiscountPercentFill style={iconStyle} />}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
          />
        </form>
      </Modal>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full flex justify-center items-center bg-gray-200 bg-opacity-50 min-h-screen h-full">
          <Loader />
        </div>
      )}
    </section>
  );
}

export default Coupons;
