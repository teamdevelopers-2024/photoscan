import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import ProfileSidebar from './Components/Sidebar';
import ProfileContent from './Components/ProfileContent';


function Profile() {
  const [activeSection, setActiveSection] = useState('profile');
  return (
    <>
      <Header />
      <div className="flex overflow-hidden h-[80vh] relative">
        <ProfileSidebar setActiveSection={setActiveSection} />
        <ProfileContent activeSection={activeSection} />
      </div>
    </>
  );
}

export default Profile;
