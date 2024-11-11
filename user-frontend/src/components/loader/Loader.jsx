import React, { useEffect } from 'react';
import gifSpinn from '../../assets/spinner gifs/3dgifmaker90747.gif';


function Loader() {
  useEffect(() => {
    // Directly set overflow style on body to disable scroll
    document.body.style.overflow = 'hidden';
    // Clean up by restoring overflow style
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="flex z-50 justify-center items-center fixed inset-0 h-screen w-full bg-black bg-opacity-70 backdrop-blur-sm">
      <span className="sr-only">Loading...</span>
      <img src={gifSpinn} alt="Loading animation" className="h-20 w-20 object-contain" />
    </div>
  );
}

export default Loader;
