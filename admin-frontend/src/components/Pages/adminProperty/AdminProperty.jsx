import React from 'react'
import './AdminProperty.css'
import Header from '../../header/Header'
import Sidebar from '../../sidebar/Sidebar'
import MainProperty from '../../mainComponents/mainProperty/MainProperty'

function AdminProperty() {
  return (
    <>
    <Header/>
    <div className="bodymain">
        <Sidebar/>
        <div className="main-main">
            <MainProperty/>
        </div>
      </div>
    </>
  )
}

export default AdminProperty