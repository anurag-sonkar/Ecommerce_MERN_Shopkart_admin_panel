import React, { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { GoArrowDownRight } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { getMonthWiseOrderStats } from "../features/orders/ordersSlice";

function CardMonthIncomeCard() {
  const dispatch =  useDispatch()

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  const { monthWiseOrderStats } = useSelector((state) => state.orders);
  const [currentMonthData, setCurrentMonthData] = useState(null);
  const [previousMonthData, setPreviousMonthData] = useState(null);
  const [growth, setGrowth] = useState(null);

  useEffect(() => {
    const currentMonthIndex = new Date().getMonth();
    const previousMonthIndex = currentMonthIndex - 1;

    const currentMonthName = monthNames[currentMonthIndex];
    const previousMonthName = monthNames[previousMonthIndex];

    const currentMonth = monthWiseOrderStats?.find(
      (ele) => ele.month === currentMonthName
    );
    const previousMonth = monthWiseOrderStats?.find(
      (ele) => ele.month === previousMonthName
    );

    setCurrentMonthData(currentMonth || {});
    setPreviousMonthData(previousMonth || {});

    const currentMonthRevenue = currentMonth?.amount || 0;
    const previousMonthRevenue = previousMonth?.amount || 0;

    const result =
      previousMonthRevenue > 0
        ? ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) *
          100
        : 0;

    setGrowth(result);
  }, [monthWiseOrderStats]);

  useEffect(() => {
    dispatch(getMonthWiseOrderStats());
  }, [dispatch]);

  // console.log("Current Month Data:", currentMonthData);
  // console.log("Previous Month Data:", previousMonthData);

  return (
    <div className="shadow-lg bg-gray-50 rounded-sm px-6 py-4 grid gap-4 w-full min-h-40">
      <p className="capitalize font-semibold text-3xl text-gray-600">
        Total Income <span className="text-sm text-black">({currentMonthData?.month})</span>
      </p>
      <div className="grid lg:grid-cols-3 grid-cols-2 grid-rows-2 items-center md:gap-4">
        <div className="row-span-2 col-span-1 text-3xl font-semibold mm:text-2xl sms:text-[1.5rem] ">
            ₹{currentMonthData?.amount}
          
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
            Compare to {previousMonthData && previousMonthData?.month + " " + previousMonthData?.year}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardMonthIncomeCard;
