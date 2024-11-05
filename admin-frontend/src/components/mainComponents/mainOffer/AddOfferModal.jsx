// AddOfferModal.js
import React, { useState } from 'react';
import './Offer.css';

function AddOfferModal({ isOpen, onClose, onAddOffer }) {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    if (amount && category) {
      onAddOffer({ id: Date.now(), amount, category });
      setAmount('');
      setCategory('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div className="modal bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
    <h2 className="text-xl font-semibold mb-4">Add Offer</h2>
    <input
      type="number"
      placeholder="Offer Amount"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      className="modal-input border border-gray-300 rounded-md p-2 mb-4 w-full"
    />
    <select
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="modal-input border border-gray-300 rounded-md p-2 mb-4 w-full"
    >
      <option value="">Select Category</option>
      <option value="Electronics">Electronics</option>
      <option value="Fashion">Fashion</option>
      <option value="Home">Home</option>
      <option value="Sports">Sports</option>
    </select>
    <div className="flex justify-between gap-3">
      <button onClick={handleSubmit} className="btn bg-blue-600 text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-700">
        Add Offer
      </button>
      <button onClick={onClose} className="btn bg-gray-300 text-black font-semibold rounded-md py-2 px-4 hover:bg-gray-400">
        Cancel
      </button>
    </div>
  </div>
</div>

  );
}

export default AddOfferModal;
