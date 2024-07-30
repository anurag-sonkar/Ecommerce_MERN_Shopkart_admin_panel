import React from 'react'
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";

// title
// numbers
// percentage up or down
// sub-title

function CardDashboard() {
  return (
    <div className='shadow-lg bg-gray-50 rounded-sm px-4 py-4 grid gap-4 w-full'>
                <p className='capitalize font-semibold text-xl text-gray-600'>total sells</p>
                <div className='grid lg:grid-cols-2 grid-cols-1 grid-rows-2 items-center md:gap-4'>
                    <div className='row-span-2 text-3xl font-semibold mm:text-2xl sms:text-[1.5rem] '>$3799.00</div>
                    <div className='row-span-2'>
                        <div className='flex lg:justify-end justify-start items-center text-green-500 font-semibold text-lg'>
                            <div><GoArrowUpRight/></div>
                            <div>34.4%</div>
                        </div>
                        <div className='lg:text-right text-left capitalize font-semibold text-gray-600'>compare to april 2021</div>
                    </div>
                </div>
            </div>
  )
}

export default CardDashboard