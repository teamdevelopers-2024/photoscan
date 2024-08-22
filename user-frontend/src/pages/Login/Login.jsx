import React from 'react';
import logo from "../../assets/images/logo.png";
import sideImage from '../../assets/WhatsApp Image 2024-08-21 at 16.59.30_7503ed8e.jpg';
import { useNavigate } from 'react-router-dom';


export default function Login() {
  const navigate = useNavigate()
    return (
      <div className="flex min-h-screen">
        {/* Left side - Image and Content */}
        <div className="hidden md:flex md:w-1/2 text-white flex-col justify-center items-center p-8 relative" style={{ backgroundImage: `url(${sideImage})`, backgroundSize: 'cover', backgroundPosition: 'center',  }}>
  {/* Background overlay */}
  <div className="absolute inset-0 bg-black opacity-50"></div>

  <div className="relative z-10 text-center">
    <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
    <p className="mt-4 text-lg">Your one-stop solution for all your needs. Join us and start your journey today!</p>
  </div>
</div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-white">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <img
              onClick={()=> navigate('/')}
              alt="Your Company"
              src={logo}
              className="mx-auto cursor-pointer h-12 w-auto"
            />
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>
 
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <form action="#" method="POST" className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[rgb(211,184,130)] hover:bg-[rgb(188,157,124)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
              Not a member?{' '}
              <a onClick={()=> navigate('/register')} className="font-medium cursor-pointer text-[rgb(211,184,130)] hover:text-[rgb(163,123,77)]">
                Register here
              </a>
            </p>
          </div>
        </div>
      </div>
    );
}
