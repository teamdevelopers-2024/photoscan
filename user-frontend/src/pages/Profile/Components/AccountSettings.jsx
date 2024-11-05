import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from "../../../services/api";
import { updateUserData } from '../../../redux/userSlice';
import addressModal from "../../Profile/Components/addressModal"

function ProfileSection() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

  const [addresses, setAddresses] = useState([
    { id: 1, address: '123 Main St, Springfield, USA', isDefault: true },
    { id: 2, address: '456 Elm St, Shelbyville, USA', isDefault: false },
  ]);

  const [addressEditMode, setAddressEditMode] = useState(addresses.map(() => false));
  const [newAddress, setNewAddress] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditClick = (field) => {
    setEditMode((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handleSave = async (field) => {
    const updatedFieldData = {
      currentEmail: user?.email,
      updatedField: field,
      updatedValue: formData[field],
    };
    handleEditClick(field);

    try {
      const response = await api.editProfile(updatedFieldData);

      if (response.ok) {
        const responseData = await response.json();
        dispatch(updateUserData(responseData.user));
      } else {
        const errorData = await response.json();
        console.error('Failed to update user data:', errorData.message);
      }
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const handleAddressChange = (index, newAddress) => {
    const updatedAddresses = addresses.map((addr, i) =>
      i === index ? { ...addr, address: newAddress } : addr
    );
    setAddresses(updatedAddresses);
  };

  const saveAddress = async (index) => {
    const addressToUpdate = addresses[index];

    try {
      const response = await fetch('/api/addresses/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: addressToUpdate.id, address: addressToUpdate.address }),
      });

      if (!response.ok) {
        throw new Error('Failed to update address');
      }
    } catch (error) {
      console.error('Error updating address:', error);
    }
  };

  const toggleAddressEdit = (index) => {
    const updatedEditMode = [...addressEditMode];
    updatedEditMode[index] = !updatedEditMode[index];
    setAddressEditMode(updatedEditMode);

    if (!updatedEditMode[index]) {
      saveAddress(index);
    }
  };

  const setDefaultAddress = (index) => {
    const updatedAddresses = addresses.map((addr, i) => ({
      ...addr,
      isDefault: i === index,
    }));
    setAddresses(updatedAddresses);
  };

  const addAddress = () => {
    if (newAddress.trim()) {
      setAddresses([
        ...addresses,
        { id: Date.now(), address: newAddress, isDefault: false },
      ]);
      setAddressEditMode([...addressEditMode, false]);
      setNewAddress('');
      setShowModal(false); // Close the modal after adding the address
    }
  };

  const deleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
  };

  if (!user) {
    return <p>Loading user data...</p>;
  }

  return (
    <main className="flex-1">
      <div className="p-7 w-[84%] h-[100vh] left-[15%] relative bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

        <div className="space-y-4">
          <div className="flex items-center">
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <h3 className="text-lg font-semibold mr-2">Name</h3>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!editMode.firstName}
                  className={`block w-1/2 border border-gray-300 rounded-md p-2 text-gray-600 ${
                    editMode.firstName ? 'bg-white' : 'bg-gray-100'
                  }`}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!editMode.lastName}
                  className={`block w-1/2 border border-gray-300 rounded-md p-2 text-gray-600 ${
                    editMode.lastName ? 'bg-white' : 'bg-gray-100'
                  }`}
                  placeholder="Last Name"
                />
                {editMode.firstName || editMode.lastName ? (
                  <button
                    className="ml-2 text-sm bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600"
                    onClick={() => {
                      handleSave('firstName');
                      handleSave('lastName');
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    className="text-sm text-blue-500 hover:underline"
                    onClick={() => {
                      handleEditClick('firstName');
                      handleEditClick('lastName');
                    }}
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>

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
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold">Addresses</h2>
            <button
              className="bg-green-500 text-white rounded-md px-3 py-1 hover:bg-green-600"
              onClick={() => setShowModal(true)}
            >
              Add Address
            </button>
          </div>

          {addresses.map((address, index) => (
            <div key={address.id} className="flex items-center justify-between mb-2">
              {addressEditMode[index] ? (
                <input
                  type="text"
                  value={address.address}
                  onChange={(e) => handleAddressChange(index, e.target.value)}
                  className="border border-gray-300 rounded-md p-2 flex-1"
                />
              ) : (
                <span className={`flex-1 ${address.isDefault ? 'font-bold' : ''}`}>
                  {address.address} {address.isDefault && '(Default)'}
                </span>
              )}
              <div className="flex items-center">
                <button
                  onClick={() => {
                    setDefaultAddress(index);
                    toggleAddressEdit(index);
                  }}
                  className={`text-sm ${address.isDefault ? 'text-gray-400' : 'text-blue-500'}`}
                  disabled={address.isDefault}
                >
                  Set as Default
                </button>
                <button
                  onClick={() => toggleAddressEdit(index)}
                  className="text-sm text-blue-500 mx-2 hover:underline"
                >
                  {addressEditMode[index] ? 'Save' : 'Edit'}
                </button>
                <button
                  onClick={() => deleteAddress(index)}
                  className="text-sm text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding new address */}
      {showModal && (
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
              <button
                className="mr-2 bg-gray-300 text-black rounded-md px-3 py-1"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white rounded-md px-3 py-1"
                onClick={addAddress}
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProfileSection;
