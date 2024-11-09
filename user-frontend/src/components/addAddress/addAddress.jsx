import React, { useState } from "react";
import api from "../../services/api";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";

export default function AddAddressForm({ onClose,isUpdated }) {
   const user = useSelector((state)=> state.user.user)
  const [address, setAddress] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    isDefault: false,
  });

  const [errors, setErrors] = useState({
    fullName: "",
    phoneNumber: "",
    addressLine1: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleValidation = () => {
    const newErrors = {};
    if (!address.fullName) newErrors.fullName = "Full Name is required.";
    if (!address.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required.";
    if (!address.addressLine1)
      newErrors.addressLine1 = "Address Line 1 is required.";
    if (!address.city) newErrors.city = "City is required.";
    if (!address.state) newErrors.state = "State is required.";
    if (!address.postalCode) newErrors.postalCode = "Postal Code is required.";
    if (!address.country) newErrors.country = "Country is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const addAddress = async () => {
    const formData = {
      fullName : address.fullName,
      phoneNumber :  address.phoneNumber,
      addressLine1:address.addressLine1,
      addressLine2: address.addressLine2,
      city : address.city,
      state : address.state,
      postalCode : address.postalCode,
      country : address.country,
      isDefault: false,
      userId: user._id
    };
    console.log("this is fortData : ",formData);
    
    try {
      const response = await api.addAddress(formData);
      if (response.success) {
        Swal.fire({
          icon: "success",
          title: "Address Added",
          text: "Address added successfully.",
          toast: true, // Enable toast mode
          position: "top-end", // Position of the toast
          showConfirmButton: false, // Hide the confirm button
          timer: 3000, // Duration before the toast disappears
          timerProgressBar: true, // Show progress bar
        });
        onClose()
        isUpdated()
        console.log("success");
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.error("error adding address", error);
    }
  };


  return (
    <div className="flex items-center justify-center z-50 w-full min-h-screen bg-gray-800 bg-opacity-50 fixed top-0 left-0">
      <div className="w-full max-w-lg mx-auto p-6 bg-white rounded-lg shadow-xl space-y-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Add New Address
        </h2>

        <form className="space-y-4">
          <div>
            <label className="block font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              name="fullName"
              value={address.fullName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="text"
              name="phoneNumber"
              value={address.phoneNumber}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">{errors.phoneNumber}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Address Line 1 *
            </label>
            <input
              type="text"
              name="addressLine1"
              value={address.addressLine1}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.addressLine1 && (
              <p className="text-red-500 text-sm">{errors.addressLine1}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Landmark
            </label>
            <input
              type="text"
              name="addressLine2"
              value={address.addressLine2}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-medium text-gray-700">City *</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.city && (
              <p className="text-red-500 text-sm">{errors.city}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">State *</label>
            <input
              type="text"
              name="state"
              value={address.state}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.state && (
              <p className="text-red-500 text-sm">{errors.state}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">
              Postal Code *
            </label>
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.postalCode && (
              <p className="text-red-500 text-sm">{errors.postalCode}</p>
            )}
          </div>

          <div>
            <label className="block font-medium text-gray-700">Country *</label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.country && (
              <p className="text-red-500 text-sm">{errors.country}</p>
            )}
          </div>

          {/* <div className="flex items-center">
            <input
              type="checkbox"
              name="isDefault"
              checked={address.isDefault}
              onChange={handleChange}
              className="mr-2"
            />
            <label className="font-medium text-gray-700">
              Set as Default Address
            </label>
          </div> */}

          <button
            onClick={() => addAddress()}
            
            className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-blue-600 transition-colors"
          >
            Add Address
          </button>
        </form>
      </div>
    </div>
  );
}
