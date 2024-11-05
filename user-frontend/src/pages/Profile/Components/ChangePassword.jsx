import React, { useState } from "react";
import api from "../../../services/api"; // Adjust the import based on your file structure
import Swal from "sweetalert2"; // Import SweetAlert2

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    <div className="p-6 max-w-lg mx-auto bg-white rounded-lg shadow-md">
      <h1 className="font-extrabold text-xl mb-4 text-center">
        Change Password
      </h1>
      <form onSubmit={handleChangePassword}>
        <div className="mb-4">
          <label htmlFor="current-password" className="block mb-1 font-medium">
            Current Password:
          </label>
          <input
            type="password"
            id="current-password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="new-password" className="block mb-1 font-medium">
            New Password:
          </label>
          <input
            type="password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirm-password" className="block mb-1 font-medium">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm p-2"
          />
        </div>
        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[rgb(211,184,130)] hover:bg-[rgb(188,157,124)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(247,213,145)]"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
