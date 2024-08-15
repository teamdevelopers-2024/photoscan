import React from 'react'
import './AdminAgent.css'
import Header from '../../header/Header'
import Sidebar from '../../sidebar/Sidebar'
import MainAgent from '../../mainComponents/mainAgent/MainAgent'

function AdminAgent() {
  return (
    <>
    <Header/>
    <div className="bodymain">
        <Sidebar/>
        <div className="main-main">
            <MainAgent/>
        </div>
      </div>
    </>
  )
}

export default AdminAgent