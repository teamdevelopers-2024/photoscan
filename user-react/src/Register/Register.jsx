import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../admin-frontend/src/assets/images/logo.png";
import sideImage from "../assets/WhatsApp Image 2024-08-21 at 19.12.44_2cf4a973.jpg";
import api from "../services/api";
import { findErrorField } from "../services/findErrorField";
import OtpModal from "../components/otpModal/otpModal";
export default function Register() {
  const navigate = useNavigate();

  // State for form inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otpModal, setOtpModal] = useState(false)
  // State for validation messages
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePhoneNumberChange = (e) => setPhoneNumber(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Validation function
  const validateForm = () => {
    const errors = {};

    if (!name.trim()) {
      errors.name = "*Name is required";
    }

    if (!email.trim()) {
      errors.email = "*Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      errors.email = "*Invalid email address";
    }

    if (!phoneNumber.trim()) {
      errors.phoneNumber = "*Phone number is required";
    } else if (!/^\d{10}$/.test(phoneNumber)) {
      errors.phoneNumber = "*Invalid phone number. Must be 10 digits.";
    }

    if (!password.trim()) {
      errors.password = "*Password is required";
    } else if (password.length < 6) {
      errors.password = "*Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      errors.confirmPassword = "*Please confirm your password";
    } else if (confirmPassword !== password) {
      errors.confirmPassword = "*Passwords do not match";
    }

    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length === 0) {
      // If no errors, proceed with form submission or further processing
      const userData = {
        name,
        email,
        phoneNumber,
        password,
        confirmPassword
      };

      const result = await api.userRegister(userData)
      if (result.error) {
        let errorField = await findErrorField(result);
        errorField = errorField.toString();
        const error = {
          [errorField]: `*${result.message}`
        };
        console.log(error)
        setErrors(error)
      }
      console.log("User Data:", userData);
    } else {
      // Set errors state to show validation messages
      setErrors(formErrors);
    }
  };

  const isOpen = () => setOtpModal(true)
  const onClose = () => setOtpModal(false)

  return (
    <>
      {otpModal &&
        <OtpModal isOpen={isOpen} onClose={onClose} />
      }
      <div className="flex min-h-screen">
        {/* Left side - Image */}
        <div
          className="hidden md:flex md:w-1/2 bg-cover bg-center h-screen"
          style={{ backgroundImage: `url(${sideImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
          <div className="flex flex-col justify-center items-center text-white bg-black bg-opacity-50 w-full h-full p-8">
            <h1 className="text-4xl font-bold">Welcome to Our Platform</h1>
            <p className="mt-4 text-lg">
              Your one-stop solution for all your needs. Join us and start your journey today!
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-1/2 flex flex-col overflow-auto h-screen p-8 bg-gray-100">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img alt="Your Company" src={logo} className="mx-auto h-10 w-auto" />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Sign Up to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Enter Name
                </label>
                <div className="mt-2">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    autoComplete="name"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm sm:leading-6"
                  />
                  {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2 flex items-center space-x-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm sm:leading-6"
                  />
                  <button
                    type="button"
                    className="bg-[rgb(211,184,130)] text-white px-4 py-1.5 rounded-md shadow-sm hover:bg-[#d3b882] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[rgb(211,184,130)] sm:text-sm"
                  >
                    Verify
                  </button>
                </div>
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>


              <div>
                <label
                  htmlFor="phonenumber"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    id="phonenumber"
                    name="phonenumber"
                    type="number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                    autoComplete="phonenumber"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm sm:leading-6"
                  />
                  {errors.phoneNumber && <p className="text-red-600 text-sm mt-1">{errors.phoneNumber}</p>}
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm sm:leading-6"
                  />
                  {errors.password && <p className="text-red-600 text-sm mt-1">{errors.password}</p>}
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm sm:leading-6"
                  />
                  {errors.confirmPassword && <p className="text-red-600 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-[rgb(211,184,130)] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[rgb(163,123,77)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[rgb(211,184,130)]"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{" "}
              <a
                href="#"
                onClick={() => navigate("/login")}
                className="font-semibold leading-6 text-[rgb(211,184,130)] hover:text-[rgb(163,123,77)]"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
