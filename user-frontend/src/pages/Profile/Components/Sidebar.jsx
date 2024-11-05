import React, { useState } from 'react';
import {
  FaUser, FaLock, FaCog, FaBox, FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/api';

const menuItems = [
  { id: 'profile', label: 'Profile Overview', icon: FaUser },
  { id: 'change-password', label: 'Change Password', icon: FaLock },
  { id: 'account-settings', label: 'Account Settings', icon: FaCog },
  { id: 'my-orders', label: 'My Orders', icon: FaBox },
];

const ProfileSidebar = ({ setActiveSection, activeSection }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogout = async () => {
    try {
      const response = await api.logout();
      if (!response.error) {
        navigate('/login');
      } else {
        setErrorMessage('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      setErrorMessage('An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <aside className={`w-64 h-[90vh] p-6 shadow-lg transition-colors duration-300 rounded-lg flex flex-col`}>
      <div className="relative top-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Profile Menu</h2>
          
        </div>
        <ul className="space-y-4">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setActiveSection(id)}
                className={`flex items-center p-2 rounded-lg transition-all duration-200 ${activeSection === id ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-md' : 'hover:bg-gray-200 dark:hover:bg-gray-200'} `}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                <Icon className="mr-3" size={20} /> {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center p-2 mt-6 text-red-500 hover:text-red-600 dark:text-red-400 transition-colors duration-200"
          aria-label="Logout"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
        {errorMessage && <p className="text-red-500 dark:text-red-400 mt-2">{errorMessage}</p>}
      </div>
    </aside>
  );
};

export default ProfileSidebar;
