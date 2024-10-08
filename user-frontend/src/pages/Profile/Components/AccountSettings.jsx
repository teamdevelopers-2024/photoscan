import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function ProfileSection() {
  // Access user data from Redux store
  const user = useSelector((state) => state.user.user);

  // Local state to manage edit mode
  const [editMode, setEditMode] = useState({
    name: false,
    email: false,
    phoneNumber: false,
  });

  // Local state to manage form data
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

  // Sample addresses for demonstration
  const [addresses, setAddresses] = useState([
    { id: 1, address: '123 Main St, Springfield, USA', isDefault: true },
    { id: 2, address: '456 Elm St, Shelbyville, USA', isDefault: false },
  ]);

  // Local state to manage address edit mode
  const [addressEditMode, setAddressEditMode] = useState(addresses.map(() => false));

  // Function to handle input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Function to handle edit mode toggling
  const handleEditClick = (field) => {
    setEditMode({
      ...editMode,
      [field]: !editMode[field],
    });
  };

  // Function to handle saving changes
  const handleSave = (field) => {
    handleEditClick(field); // Exit edit mode
    // Dispatch an action to save the data to the store
    // dispatch(updateUserData(formData));
  };

  // Function to handle address input change
  const handleAddressChange = (index, newAddress) => {
    const updatedAddresses = addresses.map((addr, i) =>
      i === index ? { ...addr, address: newAddress } : addr
    );
    setAddresses(updatedAddresses);
  };

  // Function to toggle address edit mode
  const toggleAddressEdit = (index) => {
    const updatedEditMode = [...addressEditMode];
    updatedEditMode[index] = !updatedEditMode[index];
    setAddressEditMode(updatedEditMode);
  };

  // Function to set default address
  const setDefaultAddress = (index) => {
    const updatedAddresses = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));
    setAddresses(updatedAddresses);
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <main className="flex-1">
      <div className="p-6 w-[82%] h-[90vh] left-[18%] relative bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Account Settings </h2>

        {/* Display user data in boxes */}
        <div className="space-y-4">
          {/* Name Field */}
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold mr-2">Name</h3>
                {!editMode.name && (
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => handleEditClick('name')}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editMode.name}
                  className={`block w-1/2 border border-gray-300 rounded-md p-2 text-gray-600 ${
                    editMode.name ? 'bg-white' : 'bg-gray-100'
                  }`}
                />
                {editMode.name && (
                  <button
                    className="ml-2 text-sm bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600"
                    onClick={() => handleSave('name')}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Email Field */}
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold mr-2">Email</h3>
                {!editMode.email && (
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => handleEditClick('email')}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode.email}
                  className={`block w-1/2 border border-gray-300 rounded-md p-2 text-gray-600 ${
                    editMode.email ? 'bg-white' : 'bg-gray-100'
                  }`}
                />
                {editMode.email && (
                  <button
                    className="ml-2 text-sm bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600"
                    onClick={() => handleSave('email')}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Phone Field */}
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold mr-2">Phone</h3>
                {!editMode.phoneNumber && (
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => handleEditClick('phoneNumber')}
                  >
                    Edit
                  </button>
                )}
              </div>
              <div className="flex items-center">
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={!editMode.phoneNumber}
                  className={`block w-1/2 border border-gray-300 rounded-md p-2 text-gray-600 ${
                    editMode.phoneNumber ? 'bg-white' : 'bg-gray-100'
                  }`}
                />
                {editMode.phoneNumber && (
                  <button
                    className="ml-2 text-sm bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600"
                    onClick={() => handleSave('phoneNumber')}
                  >
                    Save
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Addresses Section */}
          <h3 className="text-lg font-semibold mt-6">Addresses</h3>
          {addresses.map((address, index) => (
            <div key={address.id} className="flex items-center space-x-4 mb-2">
              <input
                type="text"
                value={address.address}
                onChange={(e) => handleAddressChange(index, e.target.value)}
                disabled={!addressEditMode[index]}
                className={`flex-1 w-1/2 border border-gray-300 rounded-md p-2 text-gray-600 ${
                  addressEditMode[index] ? 'bg-white' : 'bg-gray-100'
                }`}
              />
              <button
                className="text-sm text-blue-500 hover:underline"
                onClick={() => toggleAddressEdit(index)}
              >
                {addressEditMode[index] ? 'Save' : 'Edit'}
              </button>
              {!address.isDefault && (
                <button
                  className="text-sm text-green-500 hover:underline"
                  onClick={() => setDefaultAddress(index)}
                >
                  Set as Default
                </button>
              )}
              {address.isDefault && (
                <span className="text-sm text-gray-500">Default</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ProfileSection;
