import React, { useEffect, useState } from 'react'
import './Header.css'
import image from '../../assets/images/logo.png'
import icon1 from '../../assets/images/bell_3387325.png'
import icon2 from '../../assets/images/person_13924070.png'
import icon3 from '../../assets/images/log-out_10024508.png'
import icon4 from '../../assets/images/icons8-search-50.png'
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function Header() {
  const navigate = useNavigate();
  const location = useLocation()
  const [path , setPath] = useState('')
  const logout=()=>{
    navigate('/')
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Loged Out Successfully"
    });
  }
  useEffect(()=>{
    const pathMapping = {
      '/admin/home': 'Dashboard',
      '/admin/user': 'User',
      '/admin/frame': 'Frames',
      '/admin/momento': 'Momento',
      '/admin/order': 'Order',
      '/admin/expense': 'Expense Tracker',
      '/admin/banner': 'Banner Management',
    };
    
    setPath(pathMapping[location.pathname] || '');
  },[])
  return (
    <>
    <div className="nav">
        <div className="l-con">
            <img className='logo' src={image} alt="" />
        </div>
        <div className="m-con">
        <p className="text-2xl font-bold text-gray-800">{path}</p>
        <div className="search-container">
      <div className="search-bar">
      </div>
      <ul>
      </ul>
    </div>
        </div>
        <div className="r-con">
            <div className="inside-r">
            <img className='img-icon' src={icon1} alt="" />
            <img className='img-icon' src={icon2} alt="" />
            <img onClick={logout} className='img-icon' src={icon3} alt="" />
            </div>
        </div>
    </div>
    </>
  )
}

export default Header