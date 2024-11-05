// ViewOrderModal.js
import React from 'react';

const ViewOrderModal = ({ isOpen, onClose, orderDetails }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <p><strong>ID:</strong> {orderDetails.id}</p>
        <p><strong>Item:</strong> {orderDetails.item}</p>
        <p><strong>Order Amount:</strong> ${orderDetails.amount}</p>
        <p><strong>Status:</strong> {orderDetails.status}</p>
        <button 
          onClick={onClose} 
          className="mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  ); 
};

export default ViewOrderModal;
