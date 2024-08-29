import React from 'react';
import ProfileSection from './ProfileSection';
import AccountSettings from './AccountSettings'

const ProfileContent = ({ activeSection }) => {
  const content = {
    profile: {
      title: "Profile Overview",
      Page: ProfileSection,
    },
    'change-password': {
      title: "Change Password",
      description: "Manage your password and secure your account.",
    },
    'account-settings': {
      title: "Account Settings",
      Page : AccountSettings
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

  const { title, Page } = content[activeSection] || { title: "Not Found", description: "" };

  return (
    <main className="flex-1 p-6">
        <Page/>
        {/* Add buttons or additional content here as needed */}
    </main>
  );
};

export default ProfileContent;
