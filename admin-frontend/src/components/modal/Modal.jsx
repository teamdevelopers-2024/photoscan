import React from "react";

const Modal = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  const userData = {
    address: "123 Main St, Anytown, USA",
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-xl font-semibold mb-4">User Details</h2>

        <div className="space-y-4">
          <div>
            <span className="block text-gray-700 font-medium">Name:</span>
            <p className="mt-1 text-gray-900">{user.name}</p>
          </div>

          <div>
            <span className="block text-gray-700 font-medium">Email:</span>
            <p className="mt-1 text-gray-900">{user.email}</p>
          </div>

          <div>
            <span className="block text-gray-700 font-medium">
              Phone Number:
            </span>
            <p className="mt-1 text-gray-900">{user.phoneNumber}</p>
          </div>

          <div>
            <span className="block text-gray-700 font-medium">
              Active Status:
            </span>
            {user.active ? (
              <p className="mt-1 text-gray-900">Active</p>
            ) : (
              <p className="mt-1 text-gray-900">Inactive</p>
            )}
          </div>

          <div>
            <span className="block text-gray-700 font-medium">
            Block Status:
            </span>
            {user.isBlocked ? (
              <p className="mt-1 text-gray-900">Blocked</p>
            ) : (
              <p className="mt-1 text-gray-900">Not Blocked</p>
            )}
          </div>

          <div>
            <span className="block text-gray-700 font-medium">Address:</span>
            <p className="mt-1 text-gray-900">{userData.address}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
