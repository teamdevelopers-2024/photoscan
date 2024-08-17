import React from 'react'
import './AdminBanner.css'
import MainBanner from '../../mainComponents/mainBanner/MainBanner'
import Header from '../../header/Header'
import Sidebar from '../../sidebar/Sidebar'

function AdminBanner() {
    return (
        <>
        <Header/>
        <div className="bodymain">
            <Sidebar/>
            <div className="main-main">
                <MainBanner/>
            </div>
          </div>
        </>
      )
}

export default AdminBanner