import React, { useState, useEffect, useRef } from "react";
import {
  FaUser,
  FaShoppingBag,
  FaShoppingCart,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import logo from "../../assets/images/logo.png";
import CartDropdown from "../cartDropdown/CardDropdown";
import { useNavigate ,Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const menus = [
    {
      name:"Home",
      route:'/'
    }, 
    {
      name:"Products",
      route:''
    }, 
    {
      name:"About Us",
      route:'/about'
    }, 
    {
      name:"Contact Us",
      route:'/contact'
    }];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isProductsClicked, setIsProductsClicked] = useState("a"); // State for handling Products click
  const navigate = useNavigate();
  const headerRef = useRef(null);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCartDropdown = () => setIsCartDropdownOpen(!isCartDropdownOpen);
 
  const handleProductClick = () =>{
    if(isProductsClicked==="a"){
      setIsProductsClicked(true); 
    }else{
    setIsProductsClicked(!isProductsClicked)
    }
  
  }
  useEffect(() => {
    // Handle outside click for cartDropdown
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsCartDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (

    <>
      <header
        ref={headerRef}
        className="flex fixed justify-between items-center shadow-2xl w-full h-[72px] p-2 md:p-4 bg-white z-50"
      >
        <Link to='/'>
        
        <div className="w-[8rem] md:w-[12rem]">
          <img
            
            className="p-2 md:ml-3 cursor-pointer"
            src={logo}
            alt="logo"
          />
        </div>
        </Link>
        <div className="hidden md:grid text-[#666666] text-sm font-[600] p-2 md:p-4 tracking-tight">
          <ul className="flex justify-center items-center gap-4 md:gap-5">
            {menus.map((menu, index) => (
              <li
                key={index}
                className="cursor-pointer hover:text-[#4d4d4d]"
                onClick={menu.name === "Products" ? handleProductClick : undefined}
              >
                <Link to={menu.route}>
                
                {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex justify-center items-center gap-4 md:gap-5 w-[12rem] md:w-[16rem] p-2 md:p-4 text-[1rem] md:text-[1.2rem]">
          <Link to='/login'>
          <FaUser
          
            className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110"
          />
          </Link>
          <Link to=''>
          <FaShoppingBag className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110" />
          </Link>
          {/* Cart Icon with Dropdown */}
          <div className="relative h-auto" onClick={toggleCartDropdown}>

            <FaShoppingCart className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110" />

            {/* Dropdown Menu */}
            {isCartDropdownOpen && <CartDropdown />}
          </div>
        </div>

        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-lg hover:text-[#4d4d4d] transition-all duration-300"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div
          className={`fixed top-0 left-0 bg-white z-50 transform transition-transform ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden w-full`}
          style={{ maxWidth: "100%" }}
        >
          <div className="relative p-4">
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-2xl hover:text-[#4d4d4d] transition-all duration-300"
            >
              <FaTimes />
            </button>
            <div className="flex justify-center mb-8">
              <img className="w-[8rem] md:w-[12rem]" src={logo} alt="logo" />
            </div>
            <ul className="flex flex-col items-center space-y-4">
              {menus.map((menu, index) => (
                <li
                  key={index}
                  className="cursor-pointer hover:text-[#4d4d4d] text-xl"
                >
                  {menu.name.toUpperCase()}
                </li>
              ))}
            </ul>
            <div className="flex justify-center items-center gap-4 p-4 text-[1rem] mt-auto">
              <FaUser className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110" />
              <FaShoppingBag className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110" />
              <div className="relative" onClick={toggleCartDropdown}>
                <FaShoppingCart className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Conditionally render the "MOMENTOS" and "FRAMES" div */}
      {/* {isProductsClicked && ( */}
      <div
        className={`w-full  text-[#666666] text-sm font-[600] h-[72px] bg-white flex justify-center items-center border border-gray-300 fixed top-[0px] left-0 z-30 
          ${
            isProductsClicked==true ? "animate" :
            isProductsClicked==false ? "nanimate" :
            ""
          }
          `}
      >
        <div className="flex space-x-4">
          <Link to='/momentos'><div className="cursor-pointer" >MOMENTOS</div></Link>
          <Link to='/frames'><div className="cursor-pointer">FRAMES</div></Link>
          
        </div>
      </div>
          <div className="w-full h-[72px]"></div>
    </>
  );
};

export default Header;
