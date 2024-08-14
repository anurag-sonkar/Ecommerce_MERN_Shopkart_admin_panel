import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input, Switch , Button} from "antd";
import { SiNamecheap } from "react-icons/si";
import { MdMarkEmailRead } from "react-icons/md";
import { FaPhone } from "react-icons/fa";

function Profile() {
  const { user } = useSelector((state) => state.auth);
  const [profile, setProfile] = useState(
    user?.imgpath?.url || "../src/assets/profile-fallback.svg"
  );
  
  const [isDisabled, setIsDisabled] = useState(true); // State to control the disabled state

  console.log(user)

  return (
    <div className="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0  ">
      {/* Profile Image */}
      <div className="flex justify-center">
        <img
          src={profile}
          className="h-40 w-40 rounded-full object-cover border-2 p-1 border-blue-500"
        />
      </div>

      <div>
        <div className="flex justify-between pt-12">
          <div className="text-3xl font-bold capitalize">
            Personal Information
          </div>
          <div>
            <Switch
              checked={!isDisabled}
              checkedChildren="Enable"
              unCheckedChildren="Disable"
              onChange={() => {
                setIsDisabled(!isDisabled);
              }}
            />
          </div>
        </div>


        <form className="grid gap-5 py-5">
          {/* Name */}
          <Input
            size="large"
            value={user?.name}
            placeholder="Name"
            prefix={<SiNamecheap size={24} style={{ marginRight: "14px" }} />}
            disabled={isDisabled} 
          />
          {/* Email Address */}
          <Input
            size="large"
            value={user?.email}
            placeholder="Email"
            prefix={<MdMarkEmailRead size={24} style={{ marginRight: "14px" }} />}
            disabled={isDisabled} 
          />
          {/* Mobile Number */}
          <Input
            size="large"
            placeholder="Mobile no."
            prefix={<FaPhone size={24} style={{ marginRight: "14px" }} />}
            disabled={isDisabled}
          />

           {!isDisabled && <Button type="primary" className="w-fit mt-5">Save</Button>}
        </form>
      </div>
    </div>
  );
}

export default Profile;
