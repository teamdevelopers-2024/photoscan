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
import { useNavigate, Link, useLocation } from "react-router-dom";
import "./Header.css";
import api from "../../services/api.js";

const Header = () => {
  const menus = [
    { name: "Home", route: "/" },
    { name: "Products", route: "#" },
    { name: "About Us", route: "/about" },
    { name: "Contact Us", route: "/contact" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isProductHover, setIsProductHover] = useState(false);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const headerRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCartDropdown = () => setIsCartDropdownOpen(!isCartDropdownOpen);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories(true);
        // Limit categories to four and each category's subcategories to ten
        const limitedCategories = data.data.slice(0, 4).map((category) => ({
          ...category,
          subcategories: category.subcategories.slice(0, 10),
        }));
        setCategories(limitedCategories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();

    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsCartDropdownOpen(false);
        setIsProductHover(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleCatClick = (catName) => {
    navigate(`/products?catName=${catName}`);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="flex justify-between items-center fixed shadow-2xl w-full h-[72px] p-2 md:p-4 bg-white bg-opacity-5 z-50"
      >
        <Link to="/">
          <div className="w-[8rem] md:w-[12rem]">
            <img className="p-2 md:ml-3 cursor-pointer" src={logo} alt="logo" />
          </div>
        </Link>
        <div className="hidden md:grid text-[#666666] text-sm font-[600] p-2 md:p-4 tracking-tight">
          <ul className="flex justify-center items-center gap-4 md:gap-5 relative">
            {menus.map((menu, index) => (
              <li
                key={index}
                className="relative cursor-pointer hover:text-[#4d4d4d]"
                onMouseEnter={() =>
                  menu.name === "Products" && setIsProductHover(true)
                }
              >
                <Link to={menu.route} className="block">
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex justify-center items-center gap-4 md:gap-5 w-[12rem] md:w-[16rem] p-2 md:p-4 text-[1rem] md:text-[1.2rem]">
          <FaUser
            onClick={handleUserClick}
            className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110"
          />
          <Link to="">
            <FaShoppingBag className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110" />
          </Link>
          <div className="relative h-auto" onClick={toggleCartDropdown}>
            <FaShoppingCart className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110" />
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
          className={`fixed top-0 left-0 bg-white z-50 transform transition-transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
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
      <header
        ref={headerRef}
        style={{visibility:"hidden"}}
        className="flex justify-between items-center shadow-2xl w-full h-[72px] p-2 md:p-4 bg-white z-50"
      >
        <Link to="/">
          <div className="w-[8rem] md:w-[12rem]">
            <img className="p-2 md:ml-3 cursor-pointer" src={logo} alt="logo" />
          </div>
        </Link>
        <div className="hidden md:grid text-[#666666] text-sm font-[600] p-2 md:p-4 tracking-tight">
          <ul className="flex justify-center items-center gap-4 md:gap-5 relative">
            {menus.map((menu, index) => (
              <li
                key={index}
                className="relative cursor-pointer hover:text-[#4d4d4d]"
                onMouseEnter={() =>
                  menu.name === "Products" && setIsProductHover(true)
                }
              >
                <Link to={menu.route} className="block">
                  {menu.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex justify-center items-center gap-4 md:gap-5 w-[12rem] md:w-[16rem] p-2 md:p-4 text-[1rem] md:text-[1.2rem]">
          <FaUser
            onClick={handleUserClick}
            className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110"
          />
          <Link to="">
            <FaShoppingBag className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110" />
          </Link>
          <div className="relative h-auto" onClick={toggleCartDropdown}>
            <FaShoppingCart className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110" />
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
          className={`fixed top-0 left-0 bg-white z-50 transform transition-transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
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

            <ul className="flex justify-center items-center gap-4 md:gap-5 relative">
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

      {/* Responsive Product Categories Dropdown */}
      <div
        className={`w-full text-[#666666] text-xs font-[600] h-auto flex justify-center items-center fixed top-[72px] left-0 z-30 transition-transform duration-300 ${isProductHover ? "" : "hidden"
          }`}
        onMouseEnter={() => setIsProductHover(true)}
        onMouseLeave={() => setIsProductHover(false)}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-screen-md border border-gray-300 bg-white py-4 px-5">
          {categories.map((category) => (
            <div
              key={category.id}
              className="flex flex-col items-start cursor-pointer hover:text-[#4d4d4d] text-left"
              onMouseDown={() => handleCatClick(category.category)} // Updated event to ensure click is detected
            >
              <span className="font-bold text-[12px]">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Header;
