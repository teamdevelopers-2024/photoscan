import React from 'react'
import './Lheader.css'
import image from '../../assets/images/logo.jpeg'
function Lheader() {
  return (
    <>
    <div className="nav1">
        <div className="l-con">
            <img className='logo' src={image} alt="" />
        </div>
        <div className="m-con">
        </div>
        <div className="r-con">
        </div>
    </div>
    </>
  )
}

export default Lheader