import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from "../../../services/api";
import { updateUserData } from '../../../redux/userSlice';
import AddAddressForm from '../../../components/addAddress/addAddress';

function ParentComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  // Fetch user data and dispatch to Redux if necessary
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        try {
          const response = await api.getUserProfile();
          
            setData(response.data)
          
          const responseData = await response.json();
          dispatch(updateUserData(responseData.user));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user, dispatch]);

  return <ProfileSection />;
}

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

  const [addresses, setAddresses] = useState([]); // State to hold the fetched addresses
  const [addresEditMode, setAddresEditMode] = useState([]); // Manage edit mode for each address// Manage modal visibility

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
  const handleAddAddress = (newAddress) => {
    console.log('Address added:', newAddress);
    setShowModal(false); // Close modal after adding
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
            <>
    <main className="flex-1">
      <div className="p-7 w-[84%] h-[100vh] left-[15%] relative bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Account Settings</h2>

        <div className="space-y-4">
          {/* Personal Information Section */}
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

          {/* Email Section */}
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

          {/* Phone Section */}
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

          {/* Address Section */}
          <div className="space-y-4">
      <h3 className="text-lg font-semibold">Addresses</h3>
      {addresses.map((address, index) => (
        <div
          key={address.id}
          className="flex items-center justify-between p-3 bg-gray-100 rounded-lg"
        >
          <input
            type="text"
            value={address.address}
            onChange={(e) => handleAddressChange(index, e.target.value)}
            disabled={!addressEditMode[index]}
            className={`w-full border border-gray-300 rounded-md p-2 ${
              addressEditMode[index] ? 'bg-white' : 'bg-gray-200'
            }`}
          />
          <div className="ml-4 space-x-2 flex items-center">
            <button
              className="text-sm text-blue-500 hover:underline"
              onClick={() => toggleAddressEdit(index)}
            >
              {addressEditMode[index] ? 'Save' : 'Edit'}
            </button>
            {!address.isDefault && (
              <button
                className="text-sm text-gray-500 hover:text-blue-500"
                onClick={() => setDefaultAddress(index)}
              >
                Set Default
              </button>
            )}
            <button
              className="text-sm text-red-500 hover:underline"
              onClick={() => deleteAddress(index)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      <button
        className="text-blue-500 hover:underline mt-2"
        onClick={() => setShowModal(true)}
      >
        + Add New Address
      </button>
            </div>
          </div>
        </div>
    </main>
    {showModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg max-w-md w-full">
      <AddAddressForm
        addAddress={addAddress}
        newAddress={newAddress}
        setNewAddress={setNewAddress}
        onClose={() => setShowModal(false)}
      />
    </div>
  </div>
)}

          </>
  );
}

export default ParentComponent;
