import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { createProductsCategory } from "../features/productCategory/productCategorySlice";
import { toast ,Bounce} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";

function AddProductCategory() {
  const [productCategory, setProductCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { productCategories, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.productCategory);

  const addNewProductCategory = () => {
    if (!productCategory) {
      alert("field is empty");
      return;
    }
    const uploadPromise = dispatch(createProductsCategory({ productCategory })).unwrap();
    toast.promise(
      uploadPromise,
      {
        pending: 'Uploading product category...',
        success: 'Upload successfull!',
        error: `Upload failed!`
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

    uploadPromise.then(()=>{
      setTimeout(() => {
        navigate('/admin/products-category-list')
      }, 2500);
    })
  };

  return (
    <div className="relative">
      <h1 className="text-4xl font-semibold">Add Product Category</h1>
      <form className="grid gap-8 mt-8">
        <div className="w-full">
          <Input
            label="Enter Product Category"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
          />
        </div>
        <div>
        <Button onClick={addNewProductCategory} className="min-w-32 flex justify-center" disabled={isLoading ? true : false}>{isLoading ? <ButtonLoader/> :  "Add Product Category"}</Button>
        </div>
      </form>
      {isLoading && (
        <div className="absolute top-0 left-0 w-full min-h-screen h-full flex justify-center items-center bg-gray-200 bg-opacity-50">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default AddProductCategory;
