import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoutes({children}) {
    const getUserFromLocalStorage = JSON.parse(localStorage.getItem('user'))
    // console.log(getUserFromLocalStorage?.result?.token)

  return (
    getUserFromLocalStorage?.result?.token !== undefined ? children : <Navigate to="/" replace={true}/>
  )
}

export default ProtectedRoutes