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

const SideBarMobile = ({ setActiveSection, activeSection }) => {
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
        <>
            <div className="w-full flex justify-center mb-6">
                {/* Mobile: Centered grid for ProfileSidebar */}
                <div className="grid w-full grid-cols-1 gap-4 p-6 shadow-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
                    <h2 className="text-2xl font-semibold text-center mb-4">Profile Menu</h2>
                    <ul className="grid grid-cols-2 gap-4">
                        {menuItems.map(({ id, label, icon: Icon }) => (
                            <li key={id}>
                                <a
                                    href={`#${id}`}
                                    onClick={() => setActiveSection(id)}
                                    className={`flex items-center p-3 rounded-lg transition-all duration-200 shadow-sm ${activeSection === id
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

                    <div className="mt-6 w-full justify-center flex">
                        <button
                            onClick={handleLogout}
                            className="flex border items-center p-3 mt-6 text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-500 transition-colors duration-200 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-gray-800"
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
                </div>
            </div>
        </>
    );
};

export default SideBarMobile;
