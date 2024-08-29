import React from 'react';
import { FaUser, FaLock, FaCog, FaBox, FaWallet, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import api from '../../../services/api';

const ProfileSidebar = ({ setActiveSection }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogout = async () => {
    try {
      const response = await api.logout()

      if (!response.error) {
        navigate('/login');
      } else {
        console.error('Logout failed');
        alert('logout error')
        // Optionally handle error here
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <aside className="w-64 bg-white fixed  h-[90vh] p-6 shadow-md hidden md:flex flex-col">
      <div className='relative top-5'>
        <h2 className="text-lg font-bold top-4 mb-6">Profile Menu</h2>
        <ul className="space-y-4">
          <li>
            <a
              href="#profile"
              onClick={() => setActiveSection('profile')}
              className="flex items-center text-blue-500 hover:underline"
            >
              <FaUser className="mr-2" /> Profile Overview
            </a>
          </li>
          <li>
            <a
              href="#change-password"
              onClick={() => setActiveSection('change-password')}
              className="flex items-center text-blue-500 hover:underline"
            >
              <FaLock className="mr-2" /> Change Password
            </a>
          </li>
          <li>
            <a
              href="#account-settings"
              onClick={() => setActiveSection('account-settings')}
              className="flex items-center text-blue-500 hover:underline"
            >
              <FaCog className="mr-2" /> Account Settings
            </a>
          </li>
          <li>
            <a
              href="#my-orders"
              onClick={() => setActiveSection('my-orders')}
              className="flex items-center text-blue-500 hover:underline"
            >
              <FaBox className="mr-2" /> My Orders
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-auto">
        <button
          onClick={handleLogout} // Call the logout function on click
          className="flex items-center text-red-500 hover:underline mt-6"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
