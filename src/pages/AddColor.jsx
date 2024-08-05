import React, { useState } from "react";
import { Button } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { createColor } from "../features/color/colorSlice";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";

function AddColor() {
  const [color, setColor] = useState("#000000"); // Default color
  const navigate = useNavigate();

  const handleChange = (color) => {
    setColor(color.target.value);
  };

  const dispatch = useDispatch();
  const { colors, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.colors
  );

  const addNewColor = () => {
    if (!color) {
      alert("field is empty");
      return;
    }

    const uploadPromise = dispatch(createColor({ color })).unwrap();

    toast.promise(
      uploadPromise,
      {
        pending: "Uploading color...",
        success: "Upload successful!",
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
        navigate("/admin/color-list");
      }, 2500);
    });
  };

  // console.log({ colors, isLoading, isError, isSuccess, message })

  return (
    <div className="relative">
      <h1 className="text-4xl font-semibold">Add Color</h1>
      <form className="grid gap-8 mt-8">
        <div className="flex justify-between items-start w-96">
          <div className="font-semibold text-2xl">Color Selected :</div>
          <div>
            <input
              type="color"
              value={color}
              onChange={handleChange}
              className="w-24 h-12"
            />
          </div>
          <div className="text-gray-600 text-xl font-semibold">{color}</div>
        </div>
        <div>
          <Button
            onClick={addNewColor}
            className="min-w-32 flex justify-center"
            disabled={isLoading ? true : false}
          >
            {isLoading ? <ButtonLoader /> : "Add Color"}
          </Button>
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

export default AddColor;
