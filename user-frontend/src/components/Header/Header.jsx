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
import { useNavigate, Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const menus = [
    { name: "Home", route: "/" },
    { name: "Products", route: "#" },
    { name: "About Us", route: "/about" },
    { name: "Contact Us", route: "/contact" },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isproducthover, setIsproducthover] = useState(false);
  const navigate = useNavigate();
  const headerRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCartDropdown = () => setIsCartDropdownOpen(!isCartDropdownOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (headerRef.current && !headerRef.current.contains(event.target)) {
        setIsCartDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = async (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  return (
    <>
      <header
        ref={headerRef}
        className="flex  justify-between items-center shadow-2xl w-full h-[72px] p-2 md:p-4 bg-white z-50"
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
                  menu.name === "Products" && setIsproducthover(true)
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

      <div
        className={`w-full text-[#666666] text-xs font-[600] h-auto flex justify-center items-center fixed top-[72px] left-0 z-30 transition-transform duration-300
    ${isproducthover ? "" : "hidden"}
  `}
        onMouseEnter={() => setIsproducthover(true)}
        onMouseLeave={() => setIsproducthover(false)}
      >
<div className="flex w-4/5 justify-center border border-gray-300 bg-white items-start space-x-4 py-4 px-5">
  {[
    { title: `MOMENTOS`, items: ["Mini Moments", "Digital Moments"] },
    { title: `JEWELLERY`, items: ["Necklaces", "Bracelets"] },
    { title: `KEY CHAIN`, items: ["Metal Keychains", "Plastic Keychains"] },
    { title: `BED SHEET & PILLOW`, items: ["Cotton Sheets", "Silk Sheets"] },
    { title: `LAMP`, items: ["Table Lamps", "Ceiling Lamps"] },
    { title: `BOTTLE`, items: ["Plastic Bottles", "Metal Bottles"] },
    { title: `WALLET`, items: ["Leather Wallets", "Fabric Wallets"] },
    { title: `MUG`, items: ["Ceramic Mugs", "Glass Mugs"] },
    { title: `DAIRY`, items: ["Personal Diaries", "Office Diaries"] },
    { title: `CARD HOLDER`, items: ["Leather Holders", "Plastic Holders"] },
    { title: `PEN`, items: ["Ball Pens", "Fountain Pens"] },
    { title: `COMBO GIFT SET`, items: ["Gift Set 1", "Gift Set 2"] }
  ].map((category, index) => (
    <div key={index} className="relative cursor-pointer">
      <div className="font-bold text-[12px]">{category.title}</div> {/* Main title slightly smaller */}
      <div className="mt-2 bg-white text-[10px]"> {/* Item text slightly smaller */}
        {category.items.map((item, idx) => (
          <div key={idx} className="px-2 py-1 hover:bg-gray-100 cursor-pointer relative group">
            {item}
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-[80%]"></span>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>



      </div>
      <div className="w-full h-[72px]"></div>
    </>
  );
};

export default Header;
