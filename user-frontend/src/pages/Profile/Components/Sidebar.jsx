import React, { useState } from 'react';
import { FaUser, FaLock, FaCog, FaBox, FaSignOutAlt } from 'react-icons/fa';
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
    <aside className="w-64 h-auto p-6 shadow-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100  flex flex-col transition-all duration-300">
      <div className="relative top-5">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold">Profile Menu</h2>
        </div>
        <ul className="space-y-4">
          {menuItems.map(({ id, label, icon: Icon }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={() => setActiveSection(id)}
                className={`flex items-center p-3 rounded-lg transition-all duration-200 shadow-sm ${
                  activeSection === id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                aria-current={activeSection === id ? 'page' : undefined}
              >
                <Icon className="mr-3" size={20} /> 
                <span className="font-medium">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center p-3 mt-6 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800"
          aria-label="Logout"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
        {errorMessage && (
          <p className="text-sm text-red-500 dark:text-red-400 mt-3 bg-red-100 dark:bg-red-900 p-2 rounded-md">
            {errorMessage}
          </p>
        )}
      </div>
    </aside>
  );
};

export default ProfileSidebar;
