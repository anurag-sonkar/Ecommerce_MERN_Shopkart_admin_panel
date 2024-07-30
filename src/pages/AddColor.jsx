import React from 'react'
import ColorPicker from '@rc-component/color-picker';
import { Button } from "@material-tailwind/react";

import '@rc-component/color-picker/assets/index.css';
function AddColor() {
  return (
    <div className=''>
        <h1 className='text-4xl font-semibold'>Add Color</h1>
        <form className='grid gap-8 mt-8'>
        <div>
        <ColorPicker className='' />
        </div>
    <div>
    <Button>Add color</Button>
    </div>
        </form>
    </div>
  )
}

export default AddColor