import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Input } from "antd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteProductsCategory, getAllProductsCategory, updateProductsCategory } from "../features/productCategory/productCategorySlice";
import { toast, Bounce } from "react-toastify";
import Loader from "../components/Loader";

function ProductsCategory() {
  const dispatch = useDispatch();
  const { productsCategory, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.productCategory
  );
  console.log({ productsCategory, isLoading, isError, isSuccess, message })
  const [updateProductCategory, setUpdateProductCategory] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id, title) => {
    setUpdateId(id);
    setUpdateProductCategory(title);
    setIsModalOpen(true);
  };

  const handleUpdateBrand = () => {
    const updatePromise =  dispatch(updateProductsCategory({ updateProductCategory, updateId })).unwrap();
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
    const uploadPromise = dispatch(getAllProductsCategory()).unwrap();
    toast.promise(
      uploadPromise,
      {
        pending: "Fetching category...",
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

  const dataSource = productsCategory.map((category, index) => ({
    key: category._id,
    sno: index + 1,
    title: category.title,
    action: (
      <div className="flex items-center gap-5">
        <Link>
          <FaEdit size={20} onClick={() => showModal(category._id, category.title)} />
        </Link>
        <Link>
          <MdDelete
            size={22}
            color="crimson"
            onClick={() => dispatch(deleteProductsCategory(category._id))}
          />
        </Link>
      </div>
    ),
  }));

  return (
    <section className="mt-4 relative">
      <h1 className="text-3xl font-bold my-4">Category List</h1>
      {isError && <p>Error: {message}</p>}
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title="Update Category Name"
        open={isModalOpen}
        onOk={handleUpdateBrand}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter Updated Category Title"
          value={updateProductCategory}
          onChange={(e) => setUpdateProductCategory(e.target.value)}
        />
      </Modal>

      {isLoading && (
        <div className="absolute top-0 left-0 w-full flex justify-center items-center bg-gray-200 bg-opacity-50 min-h-screen">
          <Loader />
        </div>
      )}
    </section>
  );
}

export default ProductsCategory;
