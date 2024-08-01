import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "antd";
import Loader from "../components/Loader";
import { getAllProducts } from "../features/products/productSlice";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";


function Products() {
    const dispatch = useDispatch();
  const { products, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllProducts());
}, [dispatch]);

console.log({ products, isLoading, isError, isSuccess, message })

const columns = [
    {
        title: 'SNo',
        dataIndex: 'sno',
        key: 'sno',
        sorter: (a, b) => a.sno - b.sno,
      },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a, b) => a.title.localeCompare(b.title),
    },
    {
      title: 'Brand',
      dataIndex: 'brand',
      key: 'brand',
      sorter: (a, b) => a.brand.localeCompare(b.brand),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: (a, b) => a.category.localeCompare(b.category),
    },
    {
      title: 'Color',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
  ];

  const dataSource = products.map((product, index) => ({
    key: product._id,
    sno:index+1,
    title: product.title,
    brand: product.brand,
    category: product.category,
    color: product.color,
    price: product.price,
    action:(<div className="flex items-center gap-5">
    <Link>
        <FaEdit size={20} onClick={()=>console.log(product._id)}/>
    </Link>
    <Link>
        <MdDelete size={22} color="crimson" onClick={()=>console.log(product._id)}/>
    </Link>

    </div>)
  }));


  return (
    <section className='mt-4'>
      <h1 className='text-3xl font-bold my-4'>Products</h1>
      {isLoading && <Loader/>}
      {isError && <p>Error: {message}</p>}
      {isSuccess && <Table columns={columns} dataSource={dataSource}/>}
    </section>
  )
}

export default Products