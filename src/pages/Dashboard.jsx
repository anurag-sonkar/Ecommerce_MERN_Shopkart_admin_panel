import React, { PureComponent } from 'react';
import CardDashboard from '../components/CardDashboard'
import { BarChart, Bar,XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Table } from "antd";

const data = [
    {
      month: 'Jan',
      sales : 20,
    },
    {
      month: 'Feb',
      sales : 62,
    },
    {
      month: 'March',
      sales : 40,
    },
    {
      month: 'April',
      sales : 26
    },
    {
      month: 'May',
      sales : 68
    },
    {
      month: 'June',
      sales : 62
    },
    {
      month: 'July',
      sales : 62
    },
    {
      month: 'August',
      sales : 69
    },
    {
      month: 'September',
      sales : 62
    },
    {
      month: 'October',
      sales : 30
    },
    {
      month: 'November',
      sales : 60
    },
    {
    month : "December",
      sales : 62
    },
  ];

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];
  
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];
function Dashboard() {
      
  return (
    <main className='roboto-regular'>
        <h1 className='text-3xl font-bold my-4'>Dashboard</h1>
        {/* grid container - cards*/}
        <section className='grid sm:grid-cols-3 gap-3'>
        {/* card-1 */}
            <CardDashboard/>
        {/* card-2 */}
            <CardDashboard/>
        {/* card-3 */}
            <CardDashboard/>

        </section>

        <section className='mt-8'>
        <h1 className='text-3xl font-bold my-4'>Income Statics</h1>

        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </section>


      <section className='mt-8'>
      <h1 className='text-3xl font-bold my-4'>Recent Orders</h1>
      <Table dataSource={dataSource} columns={columns} />
      </section>


     


    </main>
  )
}

export default Dashboard