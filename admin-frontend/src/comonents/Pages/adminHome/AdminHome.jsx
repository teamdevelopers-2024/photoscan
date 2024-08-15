import React from 'react'
import './AdminHome.css'
import Header from '../../header/Header'
import Sidebar from '../../sidebar/Sidebar'
import MainDashbord from '../../mainComponents/mainDashbord/MainDashbord'

function AdminHome() {
  return (
    <>
    <Header/>
    <div className="bodymain">
        <Sidebar/>
        <div className="main-main">
            <MainDashbord/>
        </div>
      </div>
    </>
  )
}

export default AdminHome