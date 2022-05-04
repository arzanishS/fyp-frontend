import React from 'react'
import { Redirect, useLocation } from 'react-router-dom'

const ProtectedRoute = ({ children }) => {
  const location = useLocation()
  const userAuth = localStorage.getItem('token')
  if (!userAuth) {
    return <Redirect to={{ pathname: '/login', state: { from: location } }} />
  }

  return children;
}

export default ProtectedRoute
