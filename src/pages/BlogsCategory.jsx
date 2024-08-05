import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Input } from "antd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import { deleteBlogsCategory, getAllBlogsCategory, updateBlogsCategory } from "../features/blogCategory/blogCategorySlice";
import { toast ,Bounce} from 'react-toastify';
import Loader from "../components/Loader";

function BlogsCategory() {
  const dispatch = useDispatch();
  const { blogsCategories, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.blogCategory
  );
  const [updateBlogCategory, setUpdateBlogCategory] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id, title) => {
    setUpdateId(id);
    setUpdateBlogCategory(title);
    setIsModalOpen(true);
  };

  const handleUpdateBrand = () => {
    dispatch(updateBlogsCategory({ updateBlogCategory, updateId }));
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchPromise =  dispatch(getAllBlogsCategory()).unwrap();
    toast.promise(
      fetchPromise,
      {
        pending: 'Fetching... category',
        // success: 'Upload successfull!',
        error: `Fetching failed!`
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

  const dataSource = blogsCategories.map((category, index) => ({
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
            onClick={() => dispatch(deleteBlogsCategory(category._id))}
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
          value={updateBlogCategory}
          onChange={(e) => setUpdateBlogCategory(e.target.value)}
        />
      </Modal>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen h-full flex justify-center items-center bg-gray-200 bg-opacity-50">
          <Loader />
        </div>
      )}
    </section>
  );
}

export default BlogsCategory;
