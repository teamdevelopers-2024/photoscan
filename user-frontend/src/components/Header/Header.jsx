import React, { useState } from 'react';
import { FaUser, FaShoppingBag, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import logo from "../../assets/images/logo.png";
import CartDropdown from '../cartDropdown/CardDropdown';

const Header = () => {
  const menus = ["Home", "Products", "About Us", "Contact Us"];
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartDropdownOpen, setIsCartDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleCartDropdown = () => setIsCartDropdownOpen(!isCartDropdownOpen);
  const toggleProductsDropdown = () => setIsProductsDropdownOpen(!isProductsDropdownOpen);

  return (
    <>
      <header className="relative flex justify-between items-center shadow-2xl w-full p-2 md:p-4 bg-white z-40">
        <div className="w-[8rem] md:w-[12rem]">
          <img className="p-2 md:ml-3" src={logo} alt="logo" />
        </div>

        <div className="hidden md:grid text-[#666666] text-sm font-[600] p-2 md:p-4 tracking-tight relative">
          <ul className="flex justify-center items-center gap-4 md:gap-5 relative">
            {menus.map((menu, index) => (
              <li 
                key={index} 
                className={`cursor-pointer hover:text-[#4d4d4d] ${menu === 'Products' ? 'relative' : ''}`}
                onClick={menu === 'Products' ? toggleProductsDropdown : undefined}
              >
                {menu.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex justify-center items-center gap-4 md:gap-5 w-[12rem] md:w-[16rem] p-2 md:p-4 text-[1rem] md:text-[1.2rem]">
          <FaUser className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110" />
          <FaShoppingBag className="hover:text-[#4d4d4d] transition-transform duration-300 cursor-pointer transform scale-100 hover:scale-110" />
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
          className={`fixed top-0 left-0 bg-white z-50 transform transition-transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'} md:hidden w-full`}
          style={{ maxWidth: '100%' }}
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
                <li key={index} className="cursor-pointer hover:text-[#4d4d4d] text-xl">
                  {menu.toUpperCase()}
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

      {isProductsDropdownOpen && (
        <div
          className={`fixed left-0 w-full bg-white shadow-lg border border-gray-200 z-30 transition-transform duration-[10s] ease-in-out`}
          style={{ top: '8%' }}
        >
          <ul className="flex justify-center">
            <li className="p-4 cursor-pointer hover:bg-gray-100">Momentos</li>
            <li className="p-4 cursor-pointer hover:bg-gray-100">Frames</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default Header;
