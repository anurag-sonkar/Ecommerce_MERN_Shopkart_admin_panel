import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { Link, useParams } from "react-router-dom";
import HelmetTitle from "../../components/HelmetTitle";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/auth/authSlice";
function ResetPassword() {
  const {token} = useParams()
  const dispatch = useDispatch()
  const [password , setPassword] = useState("")
  const [cPassword , setCpassword] = useState("")

  const handleResetPassword = ()=>{
    if(password !== cPassword){
      alert("confirm your password again")
      return
    }
    dispatch(resetPassword({token , password}))
  }

  console.log(token)

  return (
    <main className="grid min-h-full place-items-center bg-gray-200 px-6 py-10 sm:py-16 lg:px-8">
    <HelmetTitle title="Reset Password" />
        
      <div className="text-center bg-white p-5 rounded-sm">
        <div className="flex flex-col gap-2">
        <h1 className="capitalize text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          reset your password <span className="text-4xl font-extrabold">?</span>
        </h1>
        {/* <p className="capitalize text-base text-gray-600">
          we will send you an email to reset your password
        </p> */}
        </div>
        {/* foam */}
        {/* <div className="flex-col grid place-items-center w-full mt-3">
          <Input size="md" label="Enter Your Old  Password" />
        </div> */}
        <div className="flex-col grid place-items-center w-full mt-3">
          <Input size="md" label="Enter Your New Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <div className="flex-col grid place-items-center w-full mt-3">
          <Input size="md" label="Confirm New Password" value={cPassword} onChange={(e)=>setCpassword(e.target.value)}/>
        </div>
        {/* error */}
        {/* <p className="text-left text-xs text-red-800 px-1">eoor</p> */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={handleResetPassword}
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

export default ResetPassword;
