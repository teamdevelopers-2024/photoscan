import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import ProfileSidebar from './Components/Sidebar';
import ProfileContent from './Components/ProfileContent';
import api from '../../services/api';

function Profile() {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <>
      <Header />
      <div className="flex overflow-hidden min-h-screen relative">
        <ProfileSidebar setActiveSection={setActiveSection} />
        <ProfileContent activeSection={activeSection} />
      </div>
    </>
  );
}

export default Profile;
