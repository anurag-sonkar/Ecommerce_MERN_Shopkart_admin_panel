import React, { useEffect, useState,useRef } from "react";
import { EllipsisOutlined } from '@ant-design/icons';
import { Select, Space, Table,Button, Divider, Tour } from "antd";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import CurrentYearIncomeRevenueCard from "../components/CurrentYearIncomeRevenueCard";
import CardMonthIncomeCard from "../components/CurrentMonthIncomeCard";
import CardMonthSalesCard from "../components/CurrentMonthSalesCard";
import { getAllOrders, getMonthWiseOrderStats, updateOrders } from "../features/orders/ordersSlice";


function Dashboard() {
  const [orderStateFirst, setOrderStateFirst] = useState("Ordered");
  const [orderStateSecond, setOrderStateSecond] = useState("Processing");
  const [orderStateThird, setOrderStateThird] = useState("Dispatched");
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
  const { orders,monthWiseOrderStats, isError, isSuccess, message } = useSelector(
    (state) => state.orders
  );
  


  console.log(monthWiseOrderStats);
  // const [gridCount, setGridCount] = useState(4);

  /* Using React.useMemo to memoize salesData and incomeData. This ensures that these values are recalculated only when monthWiseOrderStats changes, optimizing performance and avoiding unnecessary recalculations */

  const salesData = React.useMemo(() => monthNames.map((ele) => {
    const filterData = monthWiseOrderStats?.filter((data) => data.month === ele);
    return {
      month: ele,
      sales: filterData?.length > 0 ? filterData[0].orderCount : 0,
    };
  }), [monthWiseOrderStats]);
  
  const incomeData = React.useMemo(() => monthNames.map((ele) => {
    const filterData = monthWiseOrderStats?.filter((data) => data.month === ele);
    return {
      month: ele,
      income: filterData?.length > 0 ? filterData[0].amount : 0,
    };
  }), [monthWiseOrderStats]);

  const [dashboardThemeState, setDashboardThemeState] = useState(() => {
    const savedState = localStorage.getItem("dashboardThemeState");
    console.log(JSON.parse(savedState))
    return savedState
      ? JSON.parse(savedState)
      : {
          barColor: "#8884d8",
          gridCount: 4,
        };
  });

  const colorArray = [
    "#8884d8",
    "crimson",
    "#FF9100",
    "#00712D",
    "#F6E96B",
    "#180161",
  ];

  const handleChange = (value) => {
    setDashboardThemeState({
      ...dashboardThemeState,
      barColor: value,
    });
    // localStorage.setItem("barColor" , value)
  };

  const handleGridChange = (count) => {
    setDashboardThemeState({
      ...dashboardThemeState,
      gridCount: count,
    });
  };

  // console.log(dashboardThemeState)

  /* update staus order */
  const handleOrderStatus = (value, id) => {
    const updatePromise = dispatch(
      updateOrders({ order: value, orderId: id })
    ).unwrap();
    toast.promise(
      updatePromise,
      {
        pending: "Updating...",
        success: "Status updated successfully!",
        error: `Status Update failed!`,
      },
      {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      }
    );
  };

  useEffect(() => {
    localStorage.setItem(
      "dashboardThemeState",
      JSON.stringify(dashboardThemeState)
    );
  }, [dashboardThemeState]);

 

  const columns = [
    {
      title: "SNo",
      dataIndex: "sno",
      key: "sno",
      sorter: (a, b) => a.sno - b.sno,
      responsive: ["lg"],
    },
    {
      title: "OrderId",
      dataIndex: "orderid",
      key: "orderid",
      sorter: (a, b) => a.orderid - b.orderid,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Discounted Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: "Paid At",
      dataIndex: "paidat",
      key: "paidat",
      sorter: (a, b) => a.paidat.localeCompare(b.paidat),
    },
    {
      title: "Status",
      dataIndex: "statusValue", // Use the string value for sorting
      key: "statusValue",
      sorter: (a, b) => a.statusValue.localeCompare(b.statusValue),
      render: (text, record) => (
        <Space wrap>
          <Select
            defaultValue={record.statusValue}
            style={{ width: 120 }}
            onChange={(value) => handleOrderStatus(value, record.key)}
            options={[
              // { value: 'Cash on Delivery', label: 'Cash on Delivery' },
              { value: "Ordered", label: "Ordered" },
              { value: "Processing", label: "Processing" },
              { value: "Dispatched", label: "Dispatched" },
              { value: "Cancelled", label: "Cancelled" },
              { value: "Delivered", label: "Delivered" },
              { value: "Rejected", label: "Rejected" },
            ]}
          />
        </Space>
      ),
    },
    // {
    //   title: "Action",
    //   dataIndex: "action",
    //   key: "action",
    // },
  ];

  const dataSource =
    orders && orders.length > 0
      ? orders
          .filter(
            (order) =>
              order.orderStatus === orderStateFirst ||
              order.orderStatus === orderStateSecond ||
              order.orderStatus === orderStateThird
          ) // Filter orders based on status
          .map((order, index) => ({
            key: order._id,
            sno: index + 1,
            orderid: order._id,
            name:
              order.shippingInfo?.firstname +
                " " +
                order.shippingInfo?.lastname || "N/A", // Add a fallback
            price: order.totalPriceAfterDiscount,
            paidat: new Date(order.paidAt).toLocaleString(),
            statusValue: order.orderStatus,

            shippingInfo: order.shippingInfo,
            orderItems: order.orderItems,
            paymentInfo: order.paymentInfo,
            totalPrice: order.totalPrice,
            totalPriceAfterDiscount: order.totalPriceAfterDiscount,
            userAccountInfo: order.user,
          }))
      : [];

  const expandedRowRender = (record) => (
    <div className="grid grid-cols-4 gap-2">
      <div className="shadow-2xl px-4 py-6 rounded-lg">
        <p>
          <strong
            className="text-xl underline
    "
          >
            Shipping Info
          </strong>
        </p>
        <p>
          <strong>Address:</strong> {record.shippingInfo.address.line}
        </p>
        <p>
          <strong>City:</strong> {record.shippingInfo.address.city}
        </p>
        <p>
          <strong>State:</strong> {record.shippingInfo.address.state}
        </p>
        <p>
          <strong>Zipcode:</strong> {record.shippingInfo.address.zipcode}
        </p>
        <p>
          <strong>Name :</strong>{" "}
          {record.shippingInfo.firstname + " " + record.shippingInfo.lastname}
        </p>
        <p>
          <strong>Phone No. : </strong>
          {record.shippingInfo.phone}
        </p>
      </div>

      <div className="shadow-2xl px-4 py-6 rounded-lg">
        <p>
          <strong
            className="text-xl underline
    "
          >
            Payment Info:
          </strong>
        </p>
        <p>
          <strong>Razorpay Order ID :</strong>{" "}
          {record.paymentInfo.razaorpayOrderId}
        </p>
        <p>
          <strong>Razorpay Payment ID :</strong>{" "}
          {record.paymentInfo.razaorpayPaymentId}
        </p>
        <p>
          <strong>Payment : </strong>₹{record.totalPriceAfterDiscount}
        </p>
      </div>

      <div className="shadow-2xl px-4 py-6 rounded-lg">
        <p>
          <strong
            className="text-xl underline
    "
          >
            Order Info:
          </strong>
        </p>
        <p>
          <strong>Total Price : </strong>₹{record.totalPrice}
        </p>
        <p>
          <strong>Total Price After Discount : </strong>₹
          {record.totalPriceAfterDiscount}
        </p>
        <p>
          <strong>Products : </strong>{" "}
          <ul className="list-disc pl-8">
            {record.orderItems.map((item, index) => (
              <li key={index}>
                {item.product.title} - Quantity: {item.count}, Color:{" "}
                <span
                  className="h-2 w-2 rounded-full inline-block"
                  style={{ backgroundColor: item.color }}
                ></span>{" "}
                , Price :₹{item.price}
              </li>
            ))}
          </ul>
        </p>
      </div>

      <div className="shadow-2xl px-4 py-6 rounded-lg">
        <p>
          <strong
            className="text-xl underline
    "
          >
            UserAccountInfo :
          </strong>
        </p>
        <p>
          <strong>Name :</strong> {record.userAccountInfo.name}
        </p>
        <p>
          <strong>Email :</strong> {record.userAccountInfo.email}
        </p>
      </div>
    </div>
  );

  const handleOrderStateFirstChange = (value) => {
    setOrderStateFirst(value);
  };
  const handleOrderStateSecondChange = (value) => {
    setOrderStateSecond(value);
  };
  const handleOrderStateThirdChange = (value) => {
    setOrderStateThird(value);
  };


  /* tour setup */
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);
  const ref7 = useRef(null);
  const [open, setOpen] = useState(false);
  const steps = [
    {
      title: 'Current Year Total Income',
      description: 'Track your current year revenue and growth.',
      cover: (
        <img
          alt="tour.png"
          src="https://user-images.githubusercontent.com/5378891/197385811-55df8480-7ff4-44bd-9d43-a7dade598d70.png"
        />
      ),
      target: () => ref1.current,
    },
    {
      title: 'Current Month Revenue',
      description: 'Compare growth rate with the previous month.',
      cover: (
        <img
          alt="tour.png"
          src="../src/assets/growth-2.png"
          className="w-24 h-24 object-contain"
        />
      ),
      target: () => ref2.current,
    },
    {
      title: 'Current Month Sales',
      description: 'Compare sales with the previous month.',
      cover: (
        <img
          alt="tour.png"
          src="../src/assets/growth-1.png"
          className="w-24 h-24 object-contain"
        />
      ),
      target: () => ref3.current,
    },
    {
      title: 'Horizontal Grid Visualization',
      description: 'View the current month sales in a horizontal grid.',
      cover: (
        <img
          alt="tour.png"
          src="../src/assets/hori-grid.png"
          className="w-24 h-24 object-contain"
        />
      ),
      target: () => ref4.current,
    },
    {
      title: 'Change Grid Orientation',
      description: 'Switch between horizontal and vertical grid views.',
      cover: (
        <img
          alt="tour.png"
          src="../src/assets/veri-grid.png"
          className="w-24 h-24 object-contain"
        />
      ),
      target: () => ref5.current,
    },
    {
      title: 'Current Month Income Statistics',
      description: 'Visualize the current month income statistics.',
      cover: (
        <img
          alt="tour.png"
          src="../src/assets/sales.png"
          className="w-24 h-24 object-contain"
        />
      ),
      target: () => ref6.current,
    },
    {
      title: 'Current Month Sales Statistics',
      description: 'Visualize the current month sales statistics.',
      cover: (
        <img
          alt="tour.png"
          src="../src/assets/bargraph.png"
          className="w-28 h-28 object-contain"
        />
      ),
      target: () => ref7.current,
    },
  ];


  const handleStepChange = (currentStep) => {
    if (currentStep === 3) {
      document.querySelector('.step4-button').click();
    }
    if (currentStep === 4) {
      document.querySelector('.step5-button').click();
    }
};


  useEffect(() => {
    const tourState = JSON.parse(localStorage.getItem("tour"));
    if (tourState) {
      setOpen(true);
    }
    localStorage.setItem('tour', JSON.stringify(false)); // update tour state to false after use
  }, []);
  
  useEffect(
    ()=>{
      dispatch(getMonthWiseOrderStats())
      dispatch(getAllOrders())
    },[dispatch]
  )

  return (
    <div className="overflow-x-auto">
      <Space>
        <Divider />
      <main className="roboto-regular w-full">
      <h1 className="text-3xl font-bold my-4">Dashboard</h1>
      {/* grid container - cards*/}
      <section className="grid lg:grid-cols-3 md:grid-cols-1 gap-3">
        <div className="max-w-[19rem]" ref={ref1}>
        <CurrentYearIncomeRevenueCard />
        </div>
        <div className="max-w-[19rem]" ref={ref2}>
        <CardMonthIncomeCard />
        </div>
        <div className="max-w-[19rem]" ref={ref3}>
        <CardMonthSalesCard />
        </div>
      </section>
        

      {/* sales stats */}
      <section className="mt-8 grid grid-cols-2">
        <div className="col-span-8 w-full flex gap-1 justify-end">
          <div>
            <Select
              // defaultValue="#8884d8"
              value={dashboardThemeState.barColor}
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
          <div onClick={() => handleGridChange(4)} ref={ref4} className="step4-button">
            <img
              src="../src/assets/horizontal-tile.png"
              className="w-8 h-8 border-2 rounded-md cursor-pointer px-1 py-1"
              style={{
                border:
                  dashboardThemeState.gridCount === 4 ? "2px solid blue" : "",
              }}
            />
          </div>
          <div onClick={() => handleGridChange(8)} ref={ref5} className="step5-button">
            <img
              src="../src/assets/vertical-tile.png"
              className="w-8 h-8 border-2 rounded-md cursor-pointer px-1 py-1"
              style={{
                border:
                  dashboardThemeState.gridCount === 8 ? "2px solid blue" : "",
              }}
            />
          </div>
        </div>

        <div className={`col-span-${dashboardThemeState.gridCount}`} >
              

          <h1 className="text-3xl font-bold my-4" ><span ref={ref6}>Income Statics</span></h1>
              
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={incomeData}>
              <XAxis dataKey="month" />
              <YAxis />
              {incomeData.map((data, index) => (
                <ReferenceLine
                  key={index}
                  y={data.income}
                  stroke="#ccc"
                  strokeDasharray="1 1"
                  label={{ value: data.income, position: "right" }} // Label showing income value
                />
              ))}
              <Tooltip />
              <Bar dataKey="income" fill={dashboardThemeState.barColor} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className={`col-span-${dashboardThemeState.gridCount}`}>
          <h1 className="text-3xl font-bold my-4"><span ref={ref7}>Sales Statics</span></h1>

          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              {salesData.map((data, index) => (
                <ReferenceLine
                  key={index}
                  y={data.sales}
                  stroke="#ccc"
                  strokeDasharray="1 1"
                  label={{ value: data.sales, position: "right" }} // Label showing income value
                />
              ))}
              <Tooltip />
              <Bar dataKey="sales" fill={dashboardThemeState.barColor} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* recent orders */}
      <section className="mt-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold my-4">Recent Orders</h1>
          <div className="flex gap-1">
          <div>
            <Select
              defaultValue={orderStateFirst}
              style={{
                width: 120,
              }}
              onChange={handleOrderStateFirstChange}
              options={[
                {
                  value: "Ordered",
                  label: "Ordered",
                },
                {
                  value: "Processing",
                  label: "Processing",
                },
                {
                  value: "Dispatched",
                  label: "Dispatched",
                },
                {
                  value: "Cancelled",
                  label: "Cancelled",
                },
                {
                  value: "Delivered",
                  label: "Delivered",
                },
                {
                  value: "Rejected",
                  label: "Rejected",
                },
              ]}
            />
          </div>
          <div>
            <Select
              defaultValue={orderStateSecond}
              style={{
                width: 120,
              }}
              onChange={handleOrderStateSecondChange}
              options={[
                {
                  value: "Ordered",
                  label: "Ordered",
                },
                {
                  value: "Processing",
                  label: "Processing",
                },
                {
                  value: "Dispatched",
                  label: "Dispatched",
                },
                {
                  value: "Cancelled",
                  label: "Cancelled",
                },
                {
                  value: "Delivered",
                  label: "Delivered",
                },
                {
                  value: "Rejected",
                  label: "Rejected",
                },
              ]}
            />
          </div>
          <div>
            <Select
              defaultValue={orderStateThird}
              style={{
                width: 120,
              }}
              onChange={handleOrderStateThirdChange}
              options={[
                {
                  value: "Ordered",
                  label: "Ordered",
                },
                {
                  value: "Processing",
                  label: "Processing",
                },
                {
                  value: "Dispatched",
                  label: "Dispatched",
                },
                {
                  value: "Cancelled",
                  label: "Cancelled",
                },
                {
                  value: "Delivered",
                  label: "Delivered",
                },
                {
                  value: "Rejected",
                  label: "Rejected",
                },
              ]}
            />
          </div>
          </div>
        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          expandable={{ expandedRowRender }}
          scroll={{ x: 1000 }} 
        />
      </section>
    </main>
    </Space>
        <Tour open={open} onClose={() => setOpen(false)} steps={steps} onChange={handleStepChange}/>
    
    </div>
  );
}

export default Dashboard;
