import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthenticationForm from './pages/Authentication/Auth/Auth'

import ResetPassword from './pages/Authentication/ResetPassword'
import ForgotPassword from './pages/Authentication/ForgotPassword'
import Dashboard from './pages/Dashboard'
import MainLayout from './components/MainLayout'


function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthenticationForm />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />

      <Route path='/admin' element={<MainLayout />}>
        <Route index element={<Dashboard/>} />

      </Route>
    </Routes>
  )
}

export default App