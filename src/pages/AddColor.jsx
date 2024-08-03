import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { createColor } from "../features/color/colorSlice";

function AddColor() {
  const [color, setColor] = useState("#000000"); // Default color

  const handleChange = (color) => {
    setColor(color.target.value);
  };

  const dispatch = useDispatch()
  const { colors, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.brands
  );

  
  const addNewColor = ()=>{
    if(!color){
      alert("field is empty")
      return
    }
    
    dispatch(createColor({color}))
  }
  
  // console.log({ colors, isLoading, isError, isSuccess, message })
  
  return (
    <div className="">
      <h1 className="text-4xl font-semibold">Add Color</h1>
      <form className="grid gap-8 mt-8">
        <div className="flex justify-between items-start w-96">
          <div className="font-semibold text-2xl">Color Selected :</div>
          <div>
          <input type="color" value={color} onChange={handleChange} className="w-24 h-12"/>
          </div>
          <div className="text-gray-600 text-xl font-semibold">{color}</div>
        </div>
        <div>
          <Button onClick={addNewColor}>Add color</Button>
        </div>
      </form>
    </div>
  );
}

export default AddColor;
