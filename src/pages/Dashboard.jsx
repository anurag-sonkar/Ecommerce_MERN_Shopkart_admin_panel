import React, { PureComponent, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getMonthWiseOrderStats } from "../features/auth/authSlice";
import { Select, Space } from "antd";
import CurrentYearIncomeRevenueCard from "../components/CurrentYearIncomeRevenueCard";
import CardMonthIncomeCard from "../components/CurrentMonthIncomeCard";
import CardMonthSalesCard from "../components/CurrentMonthSalesCard";
// const data = [
//     {
//       month: 'Jan',
//       sales : 20,
//     },
//     {
//       month: 'Feb',
//       sales : 62,
//     },
//     {
//       month: 'March',
//       sales : 40,
//     },
//     {
//       month: 'April',
//       sales : 26
//     },
//     {
//       month: 'May',
//       sales : 68
//     },
//     {
//       month: 'June',
//       sales : 62
//     },
//     {
//       month: 'July',
//       sales : 62
//     },
//     {
//       month: 'August',
//       sales : 69
//     },
//     {
//       month: 'September',
//       sales : 62
//     },
//     {
//       month: 'October',
//       sales : 30
//     },
//     {
//       month: 'November',
//       sales : 60
//     },
//     {
//     month : "December",
//       sales : 62
//     },
//   ];

const dataSource = [
  {
    key: "1",
    name: "Mike",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "John",
    age: 42,
    address: "10 Downing Street",
  },
];

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];
function Dashboard() {
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
  const dispatch = useDispatch();
  const { monthWiseOrderStats } = useSelector((state) => state.auth);
  // console.log(monthWiseOrderStats);
  const [gridCount, setGridCount] = useState(2);
  const [barColor, setBarColor] = useState("#8884d8");
  const colorArray = [
    "#8884d8",
    "crimson",
    "#FF9100",
    "#00712D",
    "#F6E96B",
    "#180161",
  ];

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setBarColor(value);
  };

  const salesData = monthNames.map((ele) => {
    const filterData = monthWiseOrderStats.filter((data) => data.month === ele);
    // console.log("filterData", filterData)
    if (filterData.length > 0) {
      return {
        month: ele,
        sales: filterData[0].orderCount,
      };
    } else {
      return {
        month: ele,
        sales: 0,
      };
    }
  });

  const incomeData = monthNames.map((ele) => {
    const filterData = monthWiseOrderStats.filter((data) => data.month === ele);
    // console.log("filterData", filterData)
    if (filterData.length > 0) {
      return {
        month: ele,
        income: filterData[0].amount,
      };
    } else {
      return {
        month: ele,
        income: 0,
      };
    }
  });

  useEffect(() => {
    dispatch(getMonthWiseOrderStats());
  }, []);

  return (
    <main className="roboto-regular">
      <h1 className="text-3xl font-bold my-4">Dashboard</h1>
      {/* grid container - cards*/}
      <section className="grid sm:grid-cols-3 gap-3">
        {/* card-1 */}
        <CurrentYearIncomeRevenueCard />
        {/* card-2 */}
        <CardMonthIncomeCard />
        {/* card-3  - current month data*/}
        <CardMonthSalesCard />
      </section>

      {/* sales stats */}
      <section className="mt-8 grid grid-cols-4 w-full">
        <div className="col-span-4 w-full flex gap-1 justify-end">
          <div>
            <Select
              defaultValue="#8884d8"
              style={{
                width: 60,
              }}
              onChange={handleChange}
              options={colorArray.map((ele) => {
                return {
                  value: ele,
                  label: (
                    <div
                      className="w-5 h-5 rounded-full"
                      style={{ backgroundColor: ele }}
                    ></div>
                  ),
                };
              })}
            />
          </div>
          <div onClick={() => setGridCount(2)}>
            <img
              src="../src/assets/horizontal-tile.png"
              className="w-8 h-8 border-2 rounded-md cursor-pointer px-1 py-1"
              style={{ border: gridCount === 2 ? "2px solid blue" : "" }}
            />
          </div>
          <div onClick={() => setGridCount(4)}>
            <img
              src="../src/assets/vertical-tile.png"
              className="w-8 h-8 border-2 rounded-md cursor-pointer px-1 py-1"
              style={{ border: gridCount === 4 ? "2px solid blue" : "" }}
            />
          </div>
        </div>
        
        <div className={`col-span-${gridCount}`}>
          <h1 className="text-3xl font-bold my-4">Income Statics</h1>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={incomeData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="income" fill={barColor} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`col-span-${gridCount}`}>
          <h1 className="text-3xl font-bold my-4">Sales Statics</h1>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="sales" fill={barColor} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="mt-8">
        <h1 className="text-3xl font-bold my-4">Recent Orders</h1>
        <Table dataSource={dataSource} columns={columns} />
      </section>
    </main>
  );
}

export default Dashboard;
