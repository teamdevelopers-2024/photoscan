import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import sideImage from "../../assets/WhatsApp Image 2024-08-21 at 16.59.30_7503ed8e.jpg";
import mobileimg from "../../assets/WhatsApp Image 2024-08-21 at 19.12.44_2cf4a973.jpg"
import api from "../../services/api";

export default function Login() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [Email,setEmail]=useState('');
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const checkUser=async()=>{
    const data=await api.userLogin(Email,password);
    const token=localStorage.getItem('accessToken')
    if(data.accessToken===token){
      navigate('/')
    }
    
  }

  return (
    <>
      {isMobile ? (
        <>
          <div className="flex flex-col min-h-screen justify-center p-6 " style={{ backgroundImage: `url(${sideImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <img
                onClick={() => navigate('/')}
                alt="Your Company"
                src={logo}
                className="h-12 w-auto cursor-pointer"
              />
            </div>

            {/* Heading */}
            <h2 className="text-center text-2xl font-bold text-gray-900 mb-6">
              Sign in to your account
            </h2>

            {/* Login div */}
            <div className="w-full bg-white p-6 rounded-lg shadow-md">
              <div  className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={handleEmailChange}
                    required
                    autoComplete="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    onChange={handlePasswordChange}
                    autoComplete="current-password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
                <p
                  style={{ marginTop: '5px' }}
                  className="text-end text-gray-500 cursor-pointer font-normal hover:underline hover:underline-offset-1 z-10"
                >
                  Forgot Password
                </p>


                {/* Submit Button */}
                <div>
                  <button
                    
                    onClick={checkUser}
                    className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[rgb(211,184,130)] hover:bg-[rgb(188,157,124)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Sign in
                  </button>
                </div>
              </div>

              {/* Register Link */}
              <p className="mt-6 text-center text-sm text-gray-600">
                Not a member?{' '}
                <a
                  onClick={() => navigate('/register')}
                  className="font-medium cursor-pointer text-[rgb(211,184,130)] hover:text-[rgb(163,123,77)]"
                >
                  Register here
                </a>
              </p>
            </div>
          </div>
        </>

      ) : (
        <>
          <div className="flex min-h-screen">
            {/* Left side - Image and Content */}
            <div
              className="hidden md:flex md:w-1/2 text-white flex-col justify-center items-center p-8 relative"
              style={{
                backgroundImage: `url(${sideImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              {/* Background overlay */}
              <div className="absolute inset-0 bg-black opacity-50"></div>

              <div className="relative z-10 text-center">
                <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
                <p className="mt-4 text-lg">
                  Your one-stop solution for all your needs. Join us and start your
                  journey today!
                </p>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="w-full md:w-1/2 flex flex-col justify-center p-8 bg-white">
              <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <img
                  onClick={() => navigate("/")}
                  alt="Your Company"
                  src={logo}
                  className="mx-auto cursor-pointer h-12 w-auto"
                />
                <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                  Sign in to your account
                </h2>
              </div>

              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        placeholder="Enter Your Email"
                        type="email"
                        required
                        autoComplete="email"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        placeholder="Enter Password"
                        type="password"
                        onChange={handleEmailChange}
                        required
                        autoComplete="current-password"
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm"
                      />
                    </div>
                  </div>
                  <p
                    style={{ marginTop: '5px' }}
                    className="text-end text-gray-500 cursor-pointer font-normal hover:underline hover:underline-offset-1 z-10"
                  >
                    Forgot Password
                  </p>

                  <div>
                    <button
                      onClick={checkUser}
                      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[rgb(211,184,130)] hover:bg-[rgb(188,157,124)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Sign in
                    </button>
                  </div>
                </div>

                <p className="mt-6 text-center text-sm text-gray-600">
                  Not a member?{" "}
                  <a
                    onClick={() => navigate("/register")}
                    className="font-medium cursor-pointer text-[rgb(211,184,130)] hover:text-[rgb(163,123,77)]"
                  >
                    Register here
                  </a>
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
