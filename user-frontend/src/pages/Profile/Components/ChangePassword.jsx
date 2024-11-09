import React, { useState } from "react";
import api from "../../../services/api"; // Adjust the import based on your file structure
import Swal from "sweetalert2"; // Import SweetAlert2
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons for password fields

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangePassword = async (e) => {
    e.preventDefault();
    // Reset error and success messages
    setError("");
    setSuccess("");

    // Basic validation
    if (!currentPassword) {
      setError("Current password is required.");
      return;
    }
    if (currentPassword.length < 6) {
      setError("Current password must be at least 6 characters long.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("New password and confirmation are required.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters long.");
      return;
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      const storedData = localStorage.getItem("persist:root");
      console.log("root item", storedData);

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        const userDataString = parsedData.user;
        const userData = JSON.parse(userDataString);
        const email = userData.user.email;

        if (!email) {
          setError("Email not found in local storage.");
          return;
        }

        const formData = {
          email,
          currentPassword,
          newPassword,
          confirmPassword,
        };

        const response = await api.changePass({
          formData,
        });

        if (response && response.error) {
          setError(response.message);
        } else {
          setSuccess(response.message);
          // Show success message with SweetAlert
          Swal.fire({
            icon: "success",
            title: "Password Changed",
            text: "Your password has been changed successfully!",
            confirmButtonText: "OK",
          });

          // Reset fields after successful change
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
      } else {
        return; // Exit early if no data
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="p-6 sm:p-8 max-w-lg mx-auto bg-white rounded-lg shadow-xl border border-gray-100">
      <h1 className="font-bold text-2xl text-gray-800 mb-6 text-center">Change Password</h1>
      <form onSubmit={handleChangePassword}>
        {/* Current Password Field */}
        <div className="mb-6 relative">
          <label htmlFor="current-password" className="block text-sm font-medium text-gray-600 mb-2">
            Current Password:
          </label>
          <div className="flex items-center">
            <input
              type={showCurrentPassword ? "text" : "password"}
              id="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="block w-full pl-10 pr-3 rounded-lg border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#d3b882] focus:border-[#d3b882] text-gray-900 placeholder-gray-500 sm:text-sm"
              placeholder="Enter your current password"
            />
            <button
              type="button"
              className="absolute right-3"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
            >
              {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* New Password Field */}
        <div className="mb-6 relative">
          <label htmlFor="new-password" className="block text-sm font-medium text-gray-600 mb-2">
            New Password:
          </label>
          <div className="flex items-center">
            <input
              type={showNewPassword ? "text" : "password"}
              id="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block w-full pl-10 pr-3 rounded-lg border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#d3b882] focus:border-[#d3b882] text-gray-900 placeholder-gray-500 sm:text-sm"
              placeholder="Enter your new password"
            />
            <button
              type="button"
              className="absolute right-3"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="mb-6 relative">
          <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-600 mb-2">
            Confirm Password:
          </label>
          <div className="flex items-center">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full pl-10 pr-3 rounded-lg border border-gray-300 p-3 shadow-sm focus:ring-2 focus:ring-[#d3b882] focus:border-[#d3b882] text-gray-900 placeholder-gray-500 sm:text-sm"
              placeholder="Confirm your new password"
            />
            <button
              type="button"
              className="absolute right-3"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
        </div>

        {/* Error and Success messages */}
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        {success && <p className="text-green-500 mb-4 text-center">{success}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 rounded-lg bg-[#d3b882] text-white font-semibold hover:bg-[#bc9d7c] focus:outline-none focus:ring-2 focus:ring-[#f7d591] transition duration-200"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
