import React from 'react'
import './AdminMomento.css'
import Header from '../../header/Header'
import Sidebar from '../../sidebar/Sidebar'
import MainMomento from '../../mainComponents/mainMomento/MainMomento'


function AdminMomento() {
  return (
    <>
    <Header/>
    <div className="bodymain">
        <Sidebar/>
        <div className="main-main">
            <MainMomento/>
        </div>
      </div>
    </>
  )
}

export default AdminMomento