import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { createProductsCategory } from "../features/productCategory/productCategorySlice";

function AddProductCategory() {
  const [productCategory, setProductCategory] = useState("");
  const dispatch = useDispatch();
  const { productCategories, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.productCategory);

  const addNewProductCategory = () => {
    if (!productCategory) {
      alert("field is empty");
      return;
    }
    dispatch(createProductsCategory({ productCategory }));
  };
  console.log({ productCategories, isLoading, isError, isSuccess, message });

  return (
    <div className="">
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
          <Button onClick={addNewProductCategory}>Add Product Category</Button>
        </div>
      </form>
    </div>
  );
}

export default AddProductCategory;
