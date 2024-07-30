import React from 'react'
import { Button, Input } from "@material-tailwind/react";
function AddBlogCategory() {
  return (
    <div className=''>
        <h1 className='text-4xl font-semibold'>Add Blog Category</h1>
        <form className='grid gap-8 mt-8'>
        <div className="w-full">
      <Input label="Enter Blog Category" />
    </div>
    <div>
    <Button>Add Category</Button>
    </div>
        </form>
    </div>
  )
}

export default AddBlogCategory