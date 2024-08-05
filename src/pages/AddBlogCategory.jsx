import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { createBlogsCategory } from "../features/blogCategory/blogCategorySlice";
import { toast ,Bounce} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";

function AddBlogCategory() {
  const [blogCategory, setblogCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const { blogsCategories, isLoading, isError, isSuccess, message } =
    useSelector((state) => state.blogCategory);

  const addNewblogCategory = () => {
    if (!blogCategory) {
      alert("field is empty");
      return;
    }
    const uploadPromise = dispatch(createBlogsCategory({ blogCategory })).unwrap();
    toast.promise(
      uploadPromise,
      {
        pending: 'Uploading blog category...',
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
        navigate('/admin/blogs-category-list')
      }, 2500);
    })
  };
  console.log({ blogsCategories, isLoading, isError, isSuccess, message });

  return (
    <div className="relative">
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
        <Button onClick={addNewblogCategory} className="min-w-32 flex justify-center" disabled={isLoading ? true : false}>{isLoading ? <ButtonLoader/> :  "Add Blog Category"}</Button>
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

export default AddBlogCategory;
