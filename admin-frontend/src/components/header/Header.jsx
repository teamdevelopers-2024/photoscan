import React, { useEffect, useState } from 'react';
import './Header.css';
import image from '../../assets/images/logo.png';
import icon1 from '../../assets/images/bell_3387325.png';
import icon2 from '../../assets/images/person_13924070.png';
import icon3 from '../../assets/images/log-out_10024508.png';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import api from '../../services/api';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [path, setPath] = useState('');

  const logout = async() => {
    const result=await api.logout();
    if(result){
      navigate('/');
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
      title: "Logged Out Successfully"
    });
    }else{
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
        icon: "error",
        title: "Cannot logout"
      });
    }
    
  };

  useEffect(() => {
    const pathMapping = {
      '/admin/home': 'Dashboard',
      '/admin/home/user': 'User',
      '/admin/home/product': 'Products',
      '/admin/home/momento': 'Momento',
      '/admin/home/order': 'Order',
      '/admin/home/expense': 'Expense Tracker',
      '/admin/home/banner': 'Banner Management',
      '/admin/home/offer': 'Offer Management',
    };

    setPath(pathMapping[location.pathname] || '');
  }, [location.pathname]);

  return (
    <div className="nav">
      <div className="l-con">
        <img className='logo' src={image} alt="Logo" />
      </div>
      <div className="m-con">
        <p className="text-2xl font-bold text-gray-800">{path}</p>
        <div className="search-container">
          <div className="search-bar">
            {/* Add search bar content here */}
          </div>
          <ul>
            {/* Add search results here */}
          </ul>
        </div>
      </div>
      <div className="r-con">
        <div className="inside-r">
          <img className='img-icon' src={icon1} alt="Notifications" />
          <img className='img-icon' src={icon2} alt="Profile" />
          <img onClick={logout} className='img-icon' src={icon3} alt="Logout" />
        </div>
      </div>
    </div>
  );
}

export default Header;
