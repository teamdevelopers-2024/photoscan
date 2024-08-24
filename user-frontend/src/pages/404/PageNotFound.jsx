import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <>
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1
          className="text-6xl font-bold text-gray-800 animate-pulse"
          style={{ animationDelay: '0.5s' }}
        >
          404
        </h1>
        <p
          className="text-2xl text-gray-600 animate-fadeIn"
          style={{ animationDelay: '1s' }}
        >
          Page not found
        </p>
        <p
          className="text-lg text-gray-500 animate-fadeIn"
          style={{ animationDelay: '1.5s' }}
        >
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Link to="/">
        <button
          className="mt-4 px-4 py-2 bg-orange-500 hover:bg-orange-700 text-white font-bold rounded animate-bounce"
          style={{ animationDelay: '2s' }}
        >
          Go back home
        </button>
        </Link>
      </div>
    </div>
    </>
    
  );
};

export default PageNotFound;