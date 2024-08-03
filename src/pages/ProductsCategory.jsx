import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Input } from "antd";
import Loader from "../components/Loader";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteProductsCategory, getAllProductsCategory, updateProductsCategory } from "../features/productCategory/productCategorySlice";

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
    dispatch(updateProductsCategory({ updateProductCategory, updateId }));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getAllProductsCategory());
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
    <section className="mt-4">
      <h1 className="text-3xl font-bold my-4">Category List</h1>
      {isLoading && <Loader />}
      {isError && <p>Error: {message}</p>}
      {isSuccess && <Table dataSource={dataSource} columns={columns} />}
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
    </section>
  );
}

export default ProductsCategory;
