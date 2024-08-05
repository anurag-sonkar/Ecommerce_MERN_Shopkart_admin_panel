import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Input } from "antd";
import { deleteBrand, getAllBrands, updateBrand } from "../features/brands/brandsSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import Loader from "../components/Loader";

function Brands() {
  const dispatch = useDispatch();
  const { brands, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.brands
  );
  // console.log({ brands, isLoading, isError, isSuccess, message })

  const [updatedBrand, setUpdatedBrand] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id, title) => {
    setUpdateId(id);
    setUpdatedBrand(title);
    setIsModalOpen(true);
  };

  const handleUpdateBrand = () => {
    const updatePromise =  dispatch(updateBrand({ updatedBrand , updateId })).unwrap()
    setIsModalOpen(false);

    toast.promise(
      updatePromise,
      {
        pending: 'Updating...',
        success: 'Updated successfully!',
        error: `Update failed!`
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

  useEffect(() => {
    const uploadPromise = dispatch(getAllBrands()).unwrap()
    toast.promise(
      uploadPromise,
      {
        pending: "Fetching brands...",
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
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSource = brands.map((brand, index) => ({
    key: brand._id,
    sno: index + 1,
    title: brand.title,
    action: (
      <div className="flex items-center gap-5">
        <Link>
          <FaEdit size={20} onClick={() => showModal(brand._id, brand.title)} />
        </Link>
        <Link>
          <MdDelete
            size={22}
            color="crimson"
            onClick={() => dispatch(deleteBrand(brand._id))}
          />
        </Link>
      </div>
    ),
  }));
  

  return (
    <section className="mt-4 relative">
      <h1 className="text-3xl font-bold my-4">Brands List</h1>
      {isError && <p>Error: {message}</p>}
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Update Brand Name"
        open={isModalOpen}
        onOk={handleUpdateBrand}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter Updated Brand Title"
          value={updatedBrand}
          onChange={(e) => setUpdatedBrand(e.target.value)}
        />
      </Modal>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full flex justify-center items-center bg-gray-200 bg-opacity-50 min-h-screen h-full">
          <Loader />
        </div>
      )}
    </section>
  );
}

export default Brands;
