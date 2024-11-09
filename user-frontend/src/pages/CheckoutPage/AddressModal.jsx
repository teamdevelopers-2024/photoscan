import React, { useState } from 'react';

const AddressModal = ({ addresses, onClose, onSelect }) => {
  const [selectedAddress, setSelectedAddress] = useState('');

  const handleSelectAddress = (e) => {
    setSelectedAddress(e.target.value);
  };

  const handleSubmit = () => {
    const selected = addresses.find((address) => address._id === selectedAddress);
    onSelect(selected); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Select Address</h2>
        {addresses && addresses.length > 0 ? (
          <div>
            {addresses.map((address) => (
              <div key={address._id} className="flex items-center mb-3">
                <input
                  type="radio"
                  id={`address-${address._id}`}
                  name="address"
                  value={address._id}
                  checked={selectedAddress === address._id}
                  onChange={handleSelectAddress}
                  className="mr-2"
                />
                <label htmlFor={`address-${address._id}`} className="text-sm">
                  {`${address.addressLine1}, ${address.city}, ${address.state}, ${address.country} , ${address.postalCode}`}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p>No addresses available</p>
        )}
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Select Address
          </button>
          <button
            onClick={onClose}
            className="ml-4 bg-gray-300 text-black px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
