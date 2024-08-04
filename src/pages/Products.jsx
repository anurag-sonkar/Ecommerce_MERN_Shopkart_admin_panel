import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Modal, Button, Input, Select, Space } from "antd";
import Loader from "../components/Loader";
import {
  deleteProduct,
  getAllProducts,
} from "../features/products/productSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function Products() {
  const dispatch = useDispatch();
  const { products, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.products
  );
  /* modal */
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };
  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };
  /* select - option - catgeory*/
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };
  const onSearch = (value) => {
    console.log("search:", value);
  };


  useEffect(() => {
    console.log("getAll")
    dispatch(getAllProducts());
  }, [dispatch]);

  console.log({ products, isLoading, isError, isSuccess, message });

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
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    // {
    //   title: "Color",
    //   dataIndex: "color",
    //   key: "color",
    // },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const dataSource = products.map((product, index) => ({
    key: product._id,
    sno: index + 1,
    title: product.title,
    brand: product.brand,
    category: product.category,
    // color: "",
    price: product.price,
    action: (
      <div className="flex items-center gap-5">
        <Link>
          <FaEdit size={20} onClick={() => console.log(product._id)} />
        </Link>
        <Link>
          <MdDelete
            size={22}
            color="crimson"
            onClick={() => dispatch(deleteProduct(product._id))}
          />
        </Link>
      </div>
    ),
  }));

  return (
    <section className="mt-4">
      <h1 className="text-3xl font-bold my-4">Products</h1>
      {isLoading && <Loader />}
      {isError && <p>Error: {message}</p>}
      {isSuccess && <Table columns={columns} dataSource={dataSource} />}
      <>
        <Button type="primary" onClick={showModal}>
          Open Modal with async logic
        </Button>
        <Modal
          title="Update Product"
          open={open}
          onOk={handleOk}
          confirmLoading={confirmLoading}
          onCancel={handleCancel}
        >
          <div className="grid gap-2">
            <Input placeholder="Title" />
            <Input placeholder="Brand" />
            <Select
              showSearch
              placeholder="Category"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={[
                {
                  value: "jack",
                  label: "Jack",
                },
                {
                  value: "lucy",
                  label: "Lucy",
                },
                {
                  value: "tom",
                  label: "Tom",
                },
              ]}
            />
            {/* color-select */}
            {/* <Select
              mode="multiple"
              allowClear
              style={{
                width: "100%",
              }}
              placeholder="Please select"
              defaultValue={["a10", "c12"]}
              onChange={handleChange}
              options={options}
            /> */}
            <Input placeholder="Price" />
          </div>
        </Modal>
      </>
    </section>
  );
}

export default Products;
