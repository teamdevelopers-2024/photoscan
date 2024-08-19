import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import dash from "../../assets/images/dashboard_2329087.png";
import user from "../../assets/images/person_13924070.png";
import frame from "../../assets/images/frame.png";
import momento from "../../assets/images/trophy.png";
import expense from "../../assets/images/expence.png";
import banner from "../../assets/images/banner.png";
import order from "../../assets/images/shopping-bag_1008010.png";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [activeButton, setActiveButton] = useState(null);
  const location = useLocation();

  // Set the active button based on the current path
  useEffect(() => {
    const currentPath = navigation.findIndex((item) => item.path === location.pathname);
    setActiveButton(currentPath);
  }, [location.pathname]);

  const handleClick = (index) => {
    setActiveButton(index);
  };

  const navigation = [
    {
      path: "/admin/home",
      display: "Dashboard",
      img: dash,
    },
    {
      path: "/admin/home/user",
      display: "User",
      img: user,
    },
    {
      path: "/admin/home/frame",
      display: "Frames",
      img: frame,
    },
    {
      path: "/admin/home/momento",
      display: "Momento",
      img: momento,
    },
    {
      path: "/admin/home/order",
      display: "Order",
      img: order,
    },
    {
      path: "/admin/home/expense",
      display: "Expense",
      img: expense,
    },
    {
      path: "/admin/home/banner",
      display: "Banner",
      img: banner,
    },
  ];

  return (
    <div className="left-component">
      {navigation.map((item, index) => (
        <div
          key={item.path}
          className="list-1"
        >
          <Link to={item.path} onClick={() => handleClick(index)}>
            <div className={`left-component-content ${activeButton === index ? 'active' : ''}`}>
              <img className="l-c-icon" src={item.img} alt={item.display} />
              <p>{item.display}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
