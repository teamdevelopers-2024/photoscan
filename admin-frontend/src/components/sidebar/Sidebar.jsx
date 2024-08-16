import React, { useState } from "react";
import "./Sidebar.css";
import dash from "../../assets/images/dashboard_2329087.png";
import user from "../../assets/images/person_13924070.png";
import agent from "../../assets/images/customer-service_2706907.png";
import property from "../../assets/images/godown_17082603.png";
import order from "../../assets/images/shopping-bag_1008010.png";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [activeButton, setActiveButton] = useState(null);
  const location = useLocation();

  // Set the active button based on the current path
  React.useEffect(() => {
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
      path: "/admin/user",
      display: "User",
      img: user,
    },
    {
      path: "/admin/agent",
      display: "Agent",
      img: agent,
    },
    {
      path: "/admin/property",
      display: "Property",
      img: property,
    },
    {
      path: "/admin/order",
      display: "Order",
      img: order,
    },
  ];

  return (
    <div className="left-component">
      {navigation.map((item, index) => (
        <div
          key={item.path}
          className="list-1"
          style={{
            backgroundColor: activeButton === index ? "#ccc7c4" : "",
          }}
        >
          <Link to={item.path} onClick={() => handleClick(index)}>
            <div className="left-component-content">
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
