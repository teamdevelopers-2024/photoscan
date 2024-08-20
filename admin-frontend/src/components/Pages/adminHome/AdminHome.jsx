import React from 'react'
import './AdminHome.css'
import Header from '../../header/Header'
import Sidebar from '../../sidebar/Sidebar'
import { Outlet } from 'react-router-dom'

function AdminHome() {
  return (
    <>
    <Header/>
    <div className="bodymain">
        <Sidebar/>
        <div className="main-main">
            <Outlet/>
        </div>
      </div>
    </>
  )
}

export default AdminHome