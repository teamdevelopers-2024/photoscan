import React from 'react'
import './AdminFrame.css'
import Header from '../../header/Header'
import Sidebar from '../../sidebar/Sidebar'
import MainFrame from '../../mainComponents/mainFrame/MainFrame'

function AdminFrame() {
  return (
    <>
    <Header/>
    <div className="bodymain">
        <Sidebar/>
        <div className="main-main">
            <MainFrame/>
        </div>
      </div>
    </>
  )
}

export default AdminFrame