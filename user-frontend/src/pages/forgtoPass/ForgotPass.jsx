import React from 'react'
import logo from "../../assets/images/logo.png";
import { useNavigate } from 'react-router-dom';

function ForgotPass() {
    const navigate = useNavigate()
  return (
    <div className="flex flex-col min-h-screen justify-center p-4 sm:p-6 lg:p-8">
      {/* Logo */}
      <div className="flex justify-center mb-6 lg:mb-8">
        <img 
          onClick={() => navigate('/')} 
          alt="Your Company" 
          src={logo} 
          className="h-10 w-auto cursor-pointer sm:h-12" 
        />
      </div>

      {/* Heading */}
      <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
        Forgot Your Password
      </h2>

      {/* Form Container */}
      <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <div className="space-y-4">
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              onChange={''}
              autoComplete="email"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          {/* Forgot Password Text */}
          <p 
            style={{ marginTop: '5px' }} 
            className="text-end text-gray-500 cursor-pointer font-normal hover:underline hover:underline-offset-1 z-10"
          >
            Forgot Password
          </p>

          {/* Get OTP Button */}
          <div>
            <button
              onClick={''}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[rgb(211,184,130)] hover:bg-[rgb(188,157,124)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(211,184,130)]"
            >
              Get OTP
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPass
