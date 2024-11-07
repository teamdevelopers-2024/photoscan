import React, { useState, useEffect } from 'react';

const EditOrderModal = ({ isOpen, onClose, onEdit, currentOrder }) => {
  if (!isOpen) return null;
  const [status, setStatus] = useState(currentOrder?.status || '');
  useEffect(() => {
    if (currentOrder) {
      setStatus(currentOrder.status);
    }
  }, [currentOrder]);
  const handleSubmit = () => {
    if (status) {
      onEdit({ ...currentOrder, status });
      onClose();
    } else {
      alert('Please select a valid status');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/3">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full mb-4"
        >
          <option value="">Select Status</option>
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <div className="flex justify-between">
          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
          >
            Save
          </button>
          <button
            onClick={onClose}
            className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrderModal;
