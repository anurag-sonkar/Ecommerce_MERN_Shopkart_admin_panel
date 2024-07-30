import React from 'react'
import CardDashboard from '../components/CardDashboard'

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


    </main>
  )
}

export default Dashboard