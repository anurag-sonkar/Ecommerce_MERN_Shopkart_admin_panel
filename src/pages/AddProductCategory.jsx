import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { createProductsCategory } from "../features/productCategory/productCategorySlice";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";
import { Select, Space } from "antd";

function AddProductCategory() {
  const [productCategory, setProductCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productCategories, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.productCategory);

  const handleChange = (value) => {
    setProductCategory(value)
  };

  const addNewProductCategory = () => {
    if (!productCategory) {
      alert("field is empty");
      return;
    }
    const uploadPromise = dispatch(
      createProductsCategory({ productCategory })
    ).unwrap();
    toast.promise(
      uploadPromise,
      {
        pending: "Uploading product category...",
        success: "Upload successfull!",
        error: `Upload failed!`,
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

    uploadPromise.then(() => {
      setTimeout(() => {
        navigate("/admin/products-category-list");
      }, 2500);
    });
  };

  return (
    <div className="relative">
      <h1 className="text-4xl font-semibold">Add Product Category</h1>
      <form className="grid gap-8 mt-8">
        <div className="w-full">
          <Select
            defaultValue="Select Product Category"
            style={{
              width: "50%",
              height:"2.6rem"
            }}
            onChange={handleChange}
            options={[
              {
                value: "Grocery",
                label: "Grocery",
              },
              {
                value: "Mobiles",
                label: "Mobiles",
              },
              {
                value: "Fashion",
                label: "Fashion",
              },
              {
                value: "Electronics",
              label: "Electronics",
              },
              {
                value: "Home-Furniture",
                label: "Home-Furniture",
              },
              {
                value: "Appliances",
                label: "Appliances",
              },
              {
                value: "Travel",
                label: "Travel",
              },
              {
                value: "Beauty-Toy",
                label: "Beauty-Toy",
              },
              {
                value: "Two-Wheelers",
                label: "Two-Wheelers",
              },
              // {
              //   value: "computers & laptop",
              //   label: "Computers & Laptop",
              // },
              // {
              //   value: "cameras & videos",
              //   label: "Cameras & Videos",
              // },
              // {
              //   value: "smart television",
              //   label: "Smart Television",
              // },
              // {
              //   value: "smart watches",
              //   label: "Smartwatches",
              // },
              // {
              //   value: "music & gaming",
              //   label: "Music & Gaming",
              // },
              // {
              //   value: "mobiles & tablets",
              //   label: "Mobiles & Tablets",
              // },
              // {
              //   value: "headphones",
              //   label: "Headphones",
              // },
              // {
              //   value: "accessories",
              //   label: "Accessories",
              // },
              // {
              //   value: "portable speakers",
              //   label: "Portable Speakers",
              // },
              // {
              //   value: "home appliances",
              //   label: "Home Appliances",
              // },
              
              
            ]}
          />
        </div>
        <div>
          <Button
            onClick={addNewProductCategory}
            className="min-w-32 flex justify-center"
            disabled={isLoading ? true : false}
          >
            {isLoading ? <ButtonLoader /> : "Add Product Category"}
          </Button>
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
