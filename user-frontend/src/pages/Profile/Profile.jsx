import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/Header';
import ProfileSidebar from './Components/Sidebar';
import ProfileContent from './Components/ProfileContent';
import SideBarMobile from './Components/SideBarMobile';

function Profile() {
  const [activeSection, setActiveSection] = useState('profile');

  return (
    <>
      <Header />
      <div className='block md:hidden'>
          <SideBarMobile setActiveSection={setActiveSection} activeSection={activeSection} />
        </div>
      <div className="flex overflow-hidden min-h-screen relative">
        {/* Sidebar visible on laptops and larger screens (md and above) */}
        <div className="hidden md:block">
          <ProfileSidebar setActiveSection={setActiveSection} activeSection={activeSection} />
        </div>
      
        
        {/* Content */}
        <ProfileContent activeSection={activeSection} />
      </div>
    </>
  );
}

export default Profile;
