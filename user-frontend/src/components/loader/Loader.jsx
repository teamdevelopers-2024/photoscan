import React, { useEffect } from 'react';
import gifSpinn from '../../assets/spinner gifs/3dgifmaker90747.gif';

function Loader({ product }) {
  useEffect(() => {
    // Disable scroll on mount
    document.body.classList.add('no-scroll');
    // Enable scroll on unmount
    return () => document.body.classList.remove('no-scroll');
  }, []);

  return (
    <div className={`flex z-10 justify-center items-center fixed top-0 left-0 right-0 bottom-0 ${!product ? 'bg-black' : 'w-[60%]'} bg-opacity-70 backdrop-blur-sm`}>
      <span className="sr-only">Loading...</span>
      <img src={gifSpinn} alt="Loading animation" className="h-20 w-20 object-contain" />
    </div>
  );
}

export default Loader;
