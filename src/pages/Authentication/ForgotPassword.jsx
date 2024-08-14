import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import HelmetTitle from "../../components/HelmetTitle";
import { useDispatch } from "react-redux";
import { forgotPassword } from "../../features/auth/authSlice";
function ForgotPassword() {

  const [email , setEmail] = useState("")
  const dispatch = useDispatch()

  const handleForgotPassword = ()=>{
    if(!email) alert('email is required to reset password')
    dispatch(forgotPassword({email}))
  }

  return (
    <main className="grid min-h-full place-items-center bg-gray-200 px-6 py-16 sm:py-32 lg:px-8">
    <HelmetTitle title="Reset Password" />
        
      <div className="text-center bg-white p-5 rounded-sm">
        <div className="flex flex-col gap-2">
        <h1 className="capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          forgot your password <span className="text-4xl font-extrabold">?</span>
        </h1>
        <p className="capitalize text-base text-gray-600">
          we will send you an email to reset your password
        </p>
        </div>
        {/* foam */}
        <div className="flex-col grid place-items-center w-full mt-3">
          <Input size="md" label="Enter Your Email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        {/* error */}
        {/* <p className="text-left text-xs text-red-800 px-1">eoor</p> */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={handleForgotPassword}
            className="rounded-full bg-indigo-600 px-3.5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
          <Link to="/contact" className="text-sm font-semibold text-gray-900">
            Contact support <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default ForgotPassword;
