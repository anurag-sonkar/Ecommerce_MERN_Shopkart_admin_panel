import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Input } from "antd";
import Loader from "../components/Loader";
import { deleteBrand, getAllBrands, updateBrand } from "../features/brands/brandsSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function Brands() {
  const dispatch = useDispatch();
  const { brands, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.brands
  );

  const [updatedBrand, setUpdatedBrand] = useState("");
  const [updateId, setUpdateId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (id, title) => {
    setUpdateId(id);
    setUpdatedBrand(title);
    setIsModalOpen(true);
  };

  const handleUpdateBrand = () => {
    dispatch(updateBrand({ updatedBrand , updateId }))
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    dispatch(getAllBrands());
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
    <section className="mt-4">
      <h1 className="text-3xl font-bold my-4">Brands List</h1>
      {isLoading && <Loader />}
      {isError && <p>Error: {message}</p>}
      {isSuccess && <Table dataSource={dataSource} columns={columns} />}
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
    </section>
  );
}

export default Brands;
