import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="w-full bg-[#d9d9d9]">
      <div className="w-full max-w-screen-xl mx-auto py-8 px-4 md:px-8">
        {/* Subscription Section */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-xl font-semibold text-[#666666] mb-2 text-center">Enter your email address</h2>
          <div className="flex flex-col md:flex-row w-full md:w-1/2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-[#c87065] rounded-t-lg md:rounded-l-lg md:rounded-r-none focus:outline-none"
            />
            <button className="bg-[#c87065] text-white px-6 py-3 rounded-b-lg md:rounded-r-lg md:rounded-l-none">
              Subscribe
            </button>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row justify-between">
          {/* Contact Section */}
          <div className="flex flex-col w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold text-[#5d5565] mb-2 hidden md:block">CONTACT US</h2>
            <div className="space-y-2 text-[#666666] text-base cursor-pointer hidden md:block">
              <p className="hover:text-[#c87065] transition-colors duration-300">
                Address: Photo Scan, MVM Haji Complex,<br />Kuttippuram Road, Edappal, Kerala
              </p>
              <p className="hover:text-[#c87065] transition-colors duration-300">
                Phone: +91 9876 543 210
              </p>
              <p className="hover:text-[#c87065] transition-colors duration-300">
                Email: photoscan@gmail.com
              </p>
            </div>
          </div>

          {/* Accounts Section */}
          <div className="hidden md:flex flex-col w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-xl font-semibold text-[#5d5565] mb-2">ACCOUNTS</h2>
            <div className="space-y-2 text-[#666666] text-base cursor-pointer">
              <p className="hover:text-[#c87065] transition-colors duration-300">My Account</p>
              <p className="hover:text-[#c87065] transition-colors duration-300">My Wishlist</p>
              <p className="hover:text-[#c87065] transition-colors duration-300">My Cart</p>
            </div>
          </div>

          {/* Social Media Icons */}
          <div className="flex flex-col w-full md:w-1/3 items-center md:items-start">
            <h2 className="text-xl font-semibold text-[#5d5565] mb-2">CONNECT US</h2>
            <div className="flex space-x-4 mb-4">
              <FaFacebookF className="text-[#666666] text-xl cursor-pointer hover:text-[#c87065] transition-colors duration-300" />
              <FaTwitter className="text-[#666666] text-xl cursor-pointer hover:text-[#c87065] transition-colors duration-300" />
              <FaInstagram className="text-[#666666] text-xl cursor-pointer hover:text-[#c87065] transition-colors duration-300" />
              <FaLinkedinIn className="text-[#666666] text-xl cursor-pointer hover:text-[#c87065] transition-colors duration-300" />
              <FaPinterestP className="text-[#666666] text-xl cursor-pointer hover:text-[#c87065] transition-colors duration-300" />
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="text-center text-[#666666] text-sm font-semibold mt-8">
          © Photo Scan 2024. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
