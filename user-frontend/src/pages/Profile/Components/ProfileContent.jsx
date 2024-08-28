import React from 'react';
import { useSelector } from 'react-redux';

const ProfileContent = ({ activeSection }) => {
  const userInfo = useSelector((state) => state.user.userInfo);
  console.log(userInfo.name);
  
  const content = {
    profile: {
      title: "Profile Overview",
      description: userInfo.email,
    },
    'change-password': {
      title: "Change Password",
      description: "Manage your password and secure your account.",
    },
    'account-settings': {
      title: "Account Settings",
      description: "Update your account details and preferences.",
    },
    'my-orders': {
      title: "My Orders",
      description: "View and manage your recent orders.",
    },
    wallet: {
      title: "Wallet",
      description: "Manage your wallet and payment methods.",
    },
  };

  const { title, description } = content[activeSection] || { title: "Not Found", description: "" };

  return (
    <main className="flex-1 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        {/* Add buttons or additional content here as needed */}
      </div>
    </main>
  );
};

export default ProfileContent;
