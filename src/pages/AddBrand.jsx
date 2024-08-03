import React, { useState } from "react";
import { Button, Input } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { createBrand } from "../features/brands/brandsSlice";
import Loader from "../components/Loader";
function AddBrand() {
  const [brand , setBrand] = useState("")
  const dispatch = useDispatch()
  const { brands, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.brands
  );
  const addNewBrand = ()=>{
    if(!brand){
      alert("field is empty")
      return
    }

    dispatch(createBrand({brand}))
  }

  
  return (
    <div className="">
      <h1 className="text-4xl font-semibold">Add Brand</h1>
      
      <form className="grid gap-8 mt-8">
        <div className="w-full">
          <Input label="Enter Brand" value={brand} onChange={(e)=>setBrand(e.target.value)}/>
        </div>
        <div>
          <Button onClick={addNewBrand}>Add Brand</Button>
        </div>
      </form>
    </div>
  );
}

export default AddBrand;
