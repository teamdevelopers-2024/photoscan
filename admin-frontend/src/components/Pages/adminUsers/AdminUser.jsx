import React from 'react'
import './AdminUser.css'
import Header from '../../header/Header'
import Sidebar from '../../sidebar/Sidebar'
import MainUser from '../../mainComponents/mainUser/MainUser'

function AdminUser() {
  return (
    <>
    <Header/>
    <div className="bodymain">
        <Sidebar/>
        <div className="main-main">
            <MainUser/>
        </div>
      </div>
    </>
  )
}

export default AdminUser