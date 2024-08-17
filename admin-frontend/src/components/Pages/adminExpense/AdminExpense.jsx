import React from 'react'
import './AdminExpense.css'
import MainExpense from '../../mainComponents/mainExpense/MainExpense'
import Header from '../../header/Header'
import Sidebar from '../../sidebar/Sidebar'

function AdminExpense() {
    return (
        <>
        <Header/>
        <div className="bodymain">
            <Sidebar/>
            <div className="main-main">
                <MainExpense/>
            </div>
          </div>
        </>
      )
}

export default AdminExpense