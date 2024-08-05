import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { createBrand } from "../features/brands/brandsSlice";
import { toast ,Bounce} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";

function AddBrand() {
  const [brand , setBrand] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { brands, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.brands
  );
  const addNewBrand = ()=>{
    if(!brand){
      alert("field is empty")
      return
    }

    const uploadPromise = dispatch(createBrand({brand})).unwrap();

    toast.promise(
      uploadPromise,
      {
        pending: 'Uploading brand...',
        success: 'Upload successful!',
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
        navigate('/admin/brands')
      }, 2500);
    })
  }

  
  return (
    <div className="relative">
      <h1 className="text-4xl font-semibold">Add Brand</h1>
      
      <form className="grid gap-8 mt-8">
        <div className="w-full">
          <Input label="Enter Brand" value={brand} onChange={(e)=>setBrand(e.target.value)}/>
        </div>
        <div>
        <Button onClick={addNewBrand} className="min-w-32 flex justify-center" disabled={isLoading ? true : false}>{isLoading ? <ButtonLoader/> :  "Add Brand"}</Button>
        </div>
      </form>

      {isLoading && (
        <div className="absolute top-0 left-0 w-full flex justify-center items-center bg-gray-200 bg-opacity-50 min-h-screen">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default AddBrand;
