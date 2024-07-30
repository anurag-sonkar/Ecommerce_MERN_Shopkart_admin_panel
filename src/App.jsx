import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AuthenticationForm from './pages/Authentication/Auth/Auth'

import ResetPassword from './pages/Authentication/ResetPassword'
import ForgotPassword from './pages/Authentication/ForgotPassword'
import Dashboard from './pages/Dashboard'
import MainLayout from './components/MainLayout'
import Enquires from './pages/Enquires'
import AddBlog from './pages/AddBlog'
import AddBlogCategory from './pages/AddBlogCategory'
import AddColor from './pages/AddColor'
import AddBrand from './pages/AddBrand'


function App() {
  return (
    <Routes>
      <Route path='/' element={<AuthenticationForm />} />
      <Route path='/reset-password' element={<ResetPassword />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />

      <Route path='/admin' element={<MainLayout />}>
        <Route index element={<Dashboard/>} />
        <Route path='enquires' element={<Enquires/>} />
        <Route path='add-blog' element={<AddBlog/>} />
        <Route path='add-blog-category' element={<AddBlogCategory/>} />
        <Route path='add-brand' element={<AddBrand/>} />
        <Route path='add-color' element={<AddColor/>} />

      </Route>
    </Routes>
  )
}

export default App