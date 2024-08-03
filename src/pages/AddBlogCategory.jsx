import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { createBlogsCategory } from "../features/blogCategory/blogCategorySlice";

function AddBlogCategory() {
  const [blogCategory, setblogCategory] = useState("");
  const dispatch = useDispatch();
  const { blogsCategories, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.blogCategory);

  const addNewblogCategory = () => {
    if (!blogCategory) {
      alert("field is empty");
      return;
    }
    dispatch(createBlogsCategory({ blogCategory }));
  };
  console.log({ blogsCategories, isLoading, isError, isSuccess, message });

  return (
    <div className="">
      <h1 className="text-4xl font-semibold">Add Blog Category</h1>
      <form className="grid gap-8 mt-8">
        <div className="w-full">
          <Input
            label="Enter Product Category"
            value={blogCategory}
            onChange={(e) => setblogCategory(e.target.value)}
          />
        </div>
        <div>
          <Button onClick={addNewblogCategory}>Add Product Category</Button>
        </div>
      </form>
    </div>
  );
}

export default AddBlogCategory;
