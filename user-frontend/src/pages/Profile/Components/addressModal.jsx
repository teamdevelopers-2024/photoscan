// Modal.js
import React from 'react';

function Modal({ isOpen, onClose, onAddAddress, newAddress, setNewAddress }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-5 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Add New Address</h2>
        <input
          type="text"
          value={newAddress}
          onChange={(e) => setNewAddress(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-full"
          placeholder="Enter Address"
        />
        <div className="mt-4 flex justify-end">
          <button className="mr-2 bg-gray-300 text-black rounded-md px-3 py-1" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-green-500 text-white rounded-md px-3 py-1" onClick={onAddAddress}>
            Add Address
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
