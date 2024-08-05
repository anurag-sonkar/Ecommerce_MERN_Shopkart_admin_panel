import React, { useState } from "react";
import { Input } from "antd";
import { SiNamecheap } from "react-icons/si";
import { BsCalendarDateFill } from "react-icons/bs";
import { RiDiscountPercentFill } from "react-icons/ri";
import { format, parseISO } from "date-fns";
import { Button } from "@material-tailwind/react";
import { toast, Bounce } from "react-toastify";
import Loader from "../components/Loader";
import ButtonLoader from "../components/ButtonLoader";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCoupon } from "../features/coupons/couponsSlice";

function AddCoupon() {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [expDate, setExpDate] = useState(""); // for ui only
  console.log(name, expiry, discount);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { coupons, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.coupons
  );

  const iconStyle = {
    marginRight: "16px", // Adjust the margin as needed
  };

  const handleDateChange = (event) => {
    const value = event.target.value;
    setExpDate(value);
    const formattedDate = format(parseISO(value), "dd-MM-yyyy");
    setExpiry(formattedDate);
  };

  const handleAddCoupon = ()=>{
    const addCouponPromise =  dispatch(createCoupon({
        name : name,
        expiry : expiry,
        discount:discount
    })).unwrap()

    toast.promise(
        addCouponPromise,
        {
          pending: "Generating coupon...",
          success: "Coupon generated successful!",
          error: `Coupon generation failed!`,
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
  
      addCouponPromise.then(() => {
        setTimeout(() => {
          navigate("/admin/coupons-list");
        }, 2500);
      });
  }

  return (
    <div className="roboto-regular py-5 grid gap-8">
      <h1 className="text-4xl font-semibold roboto-medium">Add Coupon</h1>
      <form className="grid gap-5">
        <Input
          size="large"
          placeholder="Enter Coupon Name"
          prefix={<SiNamecheap style={iconStyle} />}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          size="large"
          type="date"
          placeholder="Enter Expiry Date"
          prefix={<BsCalendarDateFill style={iconStyle} />}
          value={expDate}
          onChange={handleDateChange}
        />
        <Input
          size="large"
          type="datenumber"
          placeholder="Enter Discount"
          prefix={<RiDiscountPercentFill style={iconStyle} />}
          value={discount}
          onChange={(e) => setDiscount(e.target.value)}
        />
      </form>
      <div className="">
          <Button
            onClick={handleAddCoupon}
            className="min-w-32 flex justify-center"
            disabled={isLoading ? true : false}
            
          >
            {isLoading ? <ButtonLoader /> : "Add Coupon"}
          </Button>
        </div>

        {isLoading && (
        <div className="absolute top-0 left-0 w-full flex justify-center items-center bg-gray-200 bg-opacity-50 min-h-screen">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default AddCoupon;
