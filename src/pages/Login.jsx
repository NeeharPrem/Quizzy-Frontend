import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Login from '../components/Login'
import Navbar from '../components/common/Navbar';

function LoginPage() {
    const location = useLocation();
  return (
      <div className='p-3 overflow-hidden h-screen w-screen'>
        <Navbar/>
          <Login/>
      </div>
  )
}

export default LoginPage
