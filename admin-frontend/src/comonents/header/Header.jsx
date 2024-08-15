import React from 'react'
import './Header.css'
import image from '../../assets/images/logo.jpeg'
import icon1 from '../../assets/images/bell_3387325.png'
import icon2 from '../../assets/images/person_13924070.png'
import icon3 from '../../assets/images/log-out_10024508.png'
import icon4 from '../../assets/images/icons8-search-50.png'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
function Header() {
  const navigate = useNavigate();
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
  return (
    <>
    <div className="nav">
        <div className="l-con">
            <img className='logo' src={image} alt="" />
        </div>
        <div className="m-con">
        <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."></input>
        <span className="search-icon"><img style={{width:20,height:20}} className='logo' src={icon4} alt="" /></span>
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