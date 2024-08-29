import React from 'react';
import ProfileOverView from './ProfileOverView';
import { useSelector } from 'react-redux';
import AccountSettings from './AccountSettings'
import ChangePassword from './ChangePassword';
import MyOrders from './MyOrders';

const ProfileContent = ({ activeSection }) => {
  
  const content = {
    profile: {
      title: "Profile Overview",
      Page: ProfileOverView,
    },
    'change-password': {
      title: "Change Password",
      Page:ChangePassword,
    },
    'account-settings': {
      title: "Account Settings",
      Page : AccountSettings
    },
    'my-orders': {
      title: "My Orders",
      Page: MyOrders,
    },
  };

  const { title, Page } = content[activeSection] || { title: "Not Found", description: "" };

  return (
    <main className="flex-1 p-6">
        <Page/>
        {/* Add buttons or additional content here as needed */}
    </main>
  );
};

export default ProfileContent;
