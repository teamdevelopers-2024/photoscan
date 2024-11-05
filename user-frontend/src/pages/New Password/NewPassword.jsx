import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import Loader from "../../components/loader/Loader";
import logo from "../../assets/images/logo.png";
import Swal from "sweetalert2"; // Import SweetAlert2
import { passResetValidation } from "../../services/userServices";

function NewPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();


    // Reset any previous errors
    setErrors({});

    // Basic validation for password match
    if (password !== confirmPassword) {
      setErrors({ message: "Passwords do not match!" });
      return;
    }

    const email = localStorage.getItem("resetEmail");

    try {
      setLoader(true);
      const formErrors = passResetValidation({ password });
      if (Object.keys(formErrors).length === 0) {
        
        const response = await api.newPass(email, password);

        if (response.error) {
          setErrors({ message: response.message });
        } else {
          // Show SweetAlert success message
          const result = await Swal.fire({
            title: "Success!",
            text: "Password has been reset successfully!",
            icon: "success",
            confirmButtonText: "OK",
          });

          // Check if the user confirmed the alert before navigating
          if (result.isConfirmed) {
            localStorage.removeItem("resetEmail");
            navigate("/login");
          }
        }
      
      } else {
        setErrors(formErrors);
      }
    } catch (error) {
      console.error("Error updating password:", error);
      setErrors({ message: "An error occurred while updating the password." });
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="flex flex-col min-h-screen justify-center p-4 sm:p-6 lg:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6 lg:mb-8">
          <img
            onClick={() => navigate("/")}
            alt="photoscan"
            src={logo}
            className="h-10 w-auto cursor-pointer sm:h-12"
          />
        </div>

        {/* Heading */}
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
          Reset Password
        </h2>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            {/* New Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                New Password
              </label>
              <input
                id="password"
                name="password"
                value={password}
                type="password"
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm"
                placeholder="Enter Password"
              />
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirm-password"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                autoComplete="new-password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          {/* Error Message Display */}
          {errors.message && (
            <p className="text-red-600 text-sm mt-1">{errors.message}</p>
          )}
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password}</p>
          )}

          {/* Reset Button */}
          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[rgb(211,184,130)] hover:bg-[rgb(188,157,124)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(211,184,130)]"
            >
              Reset Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default NewPassword;
