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
  <div className="flex w-4/5 justify-center border border-gray-300 bg-white items-start space-x-4 py-4">
    <div className="relative cursor-pointer">
      <div className="font-bold text-sm ml-6">MOMENTOS</div>
      <div className="mt-2 bg-white shadow-lg text-xs">
        <div className="px-7 py-1 hover:bg-gray-100 cursor-pointer">Mini Moments</div>
        <div className="px-7 py-1 hover:bg-gray-100 cursor-pointer">Digital Moments</div>
      </div>
    </div>
    <div className="relative cursor-pointer">
      <div className="font-bold text-sm">JEWELLERY</div>
      <div className="mt-2 bg-white shadow-lg text-xs">
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Necklaces</div>
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Bracelets</div>
      </div>
    </div>
    <div className="relative cursor-pointer">
      <div className="font-bold text-sm">KEY CHAIN</div>
      <div className="mt-2 bg-white shadow-lg text-xs">
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Metal Keychains</div>
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Plastic Keychains</div>
      </div>
    </div>
    <div className="relative cursor-pointer">
      <div className="font-bold text-sm">BED SHEET & PILLOW</div>
      <div className="mt-2 bg-white shadow-lg text-xs">
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Cotton Sheets</div>
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Silk Sheets</div>
      </div>
    </div>
    <div className="relative cursor-pointer">
      <div className="font-bold text-sm">LAMP</div>
      <div className="mt-2 bg-white shadow-lg text-xs">
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Table Lamps</div>
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Ceiling Lamps</div>
      </div>
    </div>
    <div className="relative cursor-pointer">
      <div className="font-bold text-sm">BOTTLE</div>
      <div className="mt-2 bg-white shadow-lg text-xs">
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Plastic Bottles</div>
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Metal Bottles</div>
      </div>
    </div>
    <div className="relative cursor-pointer">
      <div className="font-bold text-sm">WALLET</div>
      <div className="mt-2 bg-white shadow-lg text-xs">
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Leather Wallets</div>
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Fabric Wallets</div>
      </div>

    </div>
    <div className="relative cursor-pointer">
      <div className="font-bold text-sm">MUG</div>
      <div className="mt-2 bg-white shadow-lg text-xs">
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Ceramic Mugs</div>
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Glass Mugs</div>
      </div>
    </div>
    <div className="relative cursor-pointer">
      <div className="font-bold text-sm">DAIRY</div>
      <div className="mt-2 bg-white shadow-lg text-xs">
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Personal Diaries</div>
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Office Diaries</div>
      </div>
    </div>
    <div className="relative cursor-pointer">
      <div className="font-bold text-sm">CARD HOLDER</div>
      <div className="mt-2 bg-white shadow-lg text-xs">
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Leather Holders</div>
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Plastic Holders</div>
      </div>
    </div>
    <div className="relative cursor-pointer">
      <div className="font-bold text-sm">PEN</div>
      <div className="mt-2 bg-white shadow-lg text-xs">
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Ball Pens</div>
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Fountain Pens</div>
      </div>
    </div>
    <div className="relative cursor-pointer">
      <div className="font-bold text-sm">COMBO GIFT SET</div>
      <div className="mt-2 bg-white shadow-lg text-xs">
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Gift Set 1</div>
        <div className="px-2 py-1 hover:bg-gray-100 cursor-pointer">Gift Set 2</div>
      </div>
    </div>
  </div>
</div>

    </>
  );
};

export default Header;
