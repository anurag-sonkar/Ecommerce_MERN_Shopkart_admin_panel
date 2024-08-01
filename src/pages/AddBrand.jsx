import React from "react";
import { Button, Input } from "@material-tailwind/react";
function AddBrand() {
  return (
    <div className="">
      <h1 className="text-4xl font-semibold">Add Brand</h1>
      <form className="grid gap-8 mt-8">
        <div className="w-full">
          <Input label="Enter Brand" />
        </div>
        <div>
          <Button>Add Brand</Button>
        </div>
      </form>
    </div>
  );
}

export default AddBrand;
