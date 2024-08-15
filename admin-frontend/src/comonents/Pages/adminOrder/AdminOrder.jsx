import React from 'react'
import './AdminOrder.css'
import Header from '../../header/Header'
import Sidebar from '../../sidebar/Sidebar'
import MainOrder from '../../mainComponents/mainOrder/MainOrder'

function AdminOrder() {
  return (
    <>
    <Header/>
    <div className="bodymain">
        <Sidebar/>
        <div className="main-main">
            <MainOrder/>
        </div>
      </div>
    </>
  )
}

export default AdminOrder