import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import dash from "../../assets/images/dashboard_2329087.png";
import user from "../../assets/images/person_13924070.png";
import frame from "../../assets/images/frame.png";
import momento from "../../assets/images/trophy.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import expense from "../../assets/images/expence.png";
import banner from "../../assets/images/banner.png";
import order from "../../assets/images/shopping-bag_1008010.png";

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
      path: "/admin/home/product",
      display: "Products",
      img: frame,
    },
    {
      path: "/admin/home/category",
      display: "Category",
      icon: <FontAwesomeIcon icon={faTable} />, // Directly use the FontAwesomeIcon component
    },
    {
      path: "/admin/home/order",
      display: "Order",
      img: order,
    },
    {
      path: "/admin/home/banner",
      display: "Banner",
      img: banner,
    },
  ];
  

  return (
    <div className="w-1/6 h-full p-2 flex flex-col justify-start">
      {navigation.map((item, index) => (
        <div key={item.path} className="mb-4 mx-2">
          <Link to={item.path} onClick={() => handleClick(index)}>
            <div
              className={`flex items-center p-2 font-bold text-[#292f46] transition-all duration-300
                ${activeButton === index ? "text-blue-700 scale-105" : ""} 
                hover:scale-105 hover:text-[#1f2937]`}
            >
              {item.img ? (
                <img
                  className={`h-8 w-8 mr-4 transition-all ${activeButton === index ? "h-9 w-9" : ""}`}
                  src={item.img}
                  alt={item.display}
                />
              ) : (
                <div className="h-8 w-8 mr-4 flex items-center justify-center text-xl">
                  {item.icon}
                </div>
              )}
              <p className={`ml-4 ${activeButton === index ? "text-blue-700" : ""}`}>
                {item.display}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
  
}

export default Sidebar;
