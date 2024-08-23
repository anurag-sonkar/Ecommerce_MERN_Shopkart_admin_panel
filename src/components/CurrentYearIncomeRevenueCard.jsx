import React, { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { getYearWiseOrderStats } from "../features/orders/ordersSlice";

function CurrentYearIncomeRevenueCard() {
  const dispatch = useDispatch()
  const {yearWiseOrderStats} = useSelector(state=>state.orders)
  const [currentYearData, setCurrentYearData] = useState(null);
  const [previousYearData, setPreviousYearData] = useState(null);
  const [growth, setGrowth] = useState(null);

 

  useEffect(
    ()=>{
      const currentYear = new Date().getFullYear()
      const previousYear = new Date().getFullYear() - 1
      
      const currentYearData = yearWiseOrderStats?.find((ele)=>ele.year === currentYear)
      const previousYearData = yearWiseOrderStats?.find((ele)=>ele.year === previousYear)


      setCurrentYearData(currentYearData || {});
    setPreviousYearData(previousYearData || {});

    const currentyearRevenue = currentYearData?.totalAmount || 0;
    const previousYearRevenue = previousYearData?.totalAmount || 0;

      const result =
      previousYearRevenue > 0
        ? ((currentyearRevenue - previousYearRevenue) / previousYearRevenue) *
          100
        : 0;

    setGrowth(result);

    },[yearWiseOrderStats]
  )

  useEffect(
    ()=>{
      dispatch(getYearWiseOrderStats())
    },[dispatch]
  )
  // console.log(currentYearData , previousYearData , growth)
  
 
  return (
    <div className="shadow-lg bg-gray-50 rounded-sm px-6 py-4 grid gap-4 w-full min-h-40">
      <p className="capitalize font-semibold text-3xl text-gray-600">
        Total Income <span className="text-sm text-black">({currentYearData?.year || ""})</span>
      </p>
      <div className="grid lg:grid-cols-3 grid-cols-2 grid-rows-2 items-center gap-4">
        <div className="row-span-2 col-span-1 text-3xl font-semibold mm:text-2xl sms:text-[1.5rem] ">
            ₹{currentYearData?.totalAmount || ""}
          
        </div>
        <div className="row-span-2 lg:col-span-2 col-span-1">
        <div
            className={`flex lg:justify-end justify-start items-center font-semibold text-lg ${
              growth >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
          <div>
              {growth >= 0 ? <GoArrowUpRight /> : <GoArrowDownRight />}
            </div>
            <div>{growth?.toFixed(2)}%</div>
          </div>
          <div className="lg:text-right text-left capitalize font-semibold text-gray-600">
            Compare to {previousYearData && previousYearData?.year}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CurrentYearIncomeRevenueCard;
