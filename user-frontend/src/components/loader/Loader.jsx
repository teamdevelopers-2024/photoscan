import React from 'react'
import gifSpinn from '../../assets/spinner gifs/3dgifmaker90747.gif'

function Loader() {
  return (
<div className="flex z-10 justify-center absolute w-full items-center h-screen bg-black bg-opacity-70 backdrop-blur-sm">
  <span className="sr-only">Loading...</span>
  {/* Replace with your loading GIF */}
  <img src={gifSpinn} alt="Loading animation" className="h-20 w-20 object-contain" />
</div>
  )
}

export default Loader
