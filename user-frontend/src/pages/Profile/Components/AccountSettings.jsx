import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import api from "../../../services/api";
import { updateUserData } from "../../../redux/userSlice";
import AddAddressForm from "../../../components/addAddress/addAddress";
import { FiEdit, FiCheck, FiTrash2, FiHome, FiPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import Loader from "../../../../../admin-frontend/src/components/Loader/Loader";
import EditAddress from "../../../components/edit AddressModal/EditAddress";

function ParentComponent() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isLoading, setIsLoading] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const [editModal , setEditModal ] = useState(false)
  const [editData , setEditData ] = useState({})
  const [editMode, setEditMode] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phoneNumber: false,
  });
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
  });

  const [addressEditMode, setAddressEditMode] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [showModal, setShowModal] = useState(false);
  const userData = useSelector((state) => state.user.user); 


  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        try {
          const response = await api.getUserProfile();
          const responseData = await response.json();
          dispatch(updateUserData(responseData.user));
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    const fetchAddresses = async () => {
      try {
        const response = await api.getAddress(user._id);
        if (!response.error) {
          setAddresses(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch addresses:", error);
      }
    };

    fetchUserData();
    fetchAddresses();
  }, [isUpdated]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleEditClick = (field) =>
    setEditMode((prev) => ({ ...prev, [field]: !prev[field] }));

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
      } else {
        console.error("Failed to update user data:", await response.json());
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };



  const toggleAddressEdit = (address) => {    
    setEditData(address)
    setEditModal(true)
  };

  const handleSetDefaultAddress = async (addressId) => {
  const userId = userData._id    
    try {
      setIsLoading(true);
      const response = await api.setDefaultAddress(addressId,userId);
      if (!response.error) {
        Swal.fire({
          icon: "success",
          title: "Address Selected as Default",
          text: "Address Selected as Default.",
          toast: true, // Enable toast mode
          position: "top-end", // Position of the toast
          showConfirmButton: false, // Hide the confirm button
          timer: 3000, // Duration before the toast disappears
          timerProgressBar: true, // Show progress bar
        });
        // setIsLoading(true);
      } else {
        // console.error('Failed to update user data:', await response.json());
        // setIsLoading(true);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to set as default address.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error setting default address:", error);
    } finally {
      setIsLoading(false);
      setIsUpdated(!isUpdated);
    }
  };

  const handleDeleteAddress = async (id) => {
    try {
      setIsLoading(true);
      const response = await api.deleteAddress(id);
      if (!response.error) {
        Swal.fire({
          icon: "success",
          title: "Address Deleted",
          text: "Address removed successfully.",
          toast: true, // Enable toast mode
          position: "top-end", // Position of the toast
          showConfirmButton: false, // Hide the confirm button
          timer: 3000, // Duration before the toast disappears
          timerProgressBar: true, // Show progress bar
        });
        // setIsLoading(true);
      } else {
        // console.error('Failed to update user data:', await response.json());
        // setIsLoading(true);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Address failed to remove.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error deleting address data:", error);
    } finally {
      setIsLoading(false);
      setIsUpdated(!isUpdated);
    }

    // setAddresses(updatedAddresses);
  };
  if (!user) return <p>Loading user data...</p>;

  return (
    <>
      {isLoading && <Loader />}
      <main className="flex-1 flex justify-center p-4 sm:p-8">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Account Settings
          </h2>
          {/* Personal Information Section */}
          <div className="space-y-6">
            {/* Name Section */}
            <div className="flex items-center space-x-4 border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-700">Name</h3>
              <div className="flex-1 flex items-center space-x-4">
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!editMode.firstName}
                  className={`border rounded-md p-2 flex-1 ${
                    editMode.firstName
                      ? "bg-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                  placeholder="First Name"
                />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!editMode.lastName}
                  className={`border rounded-md p-2 flex-1 ${
                    editMode.lastName ? "bg-white" : "bg-gray-100 text-gray-500"
                  }`}
                  placeholder="Last Name"
                />
                <button
                  className="text-blue-600"
                  onClick={() => {
                    handleEditClick("firstName");
                    handleEditClick("lastName");
                  }}
                >
                  {editMode.firstName || editMode.lastName ? (
                    <FiCheck />
                  ) : (
                    <FiEdit />
                  )}
                </button>
              </div>
            </div>

            {/* Email Section */}
            <div className="flex items-center space-x-4 border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-700">Email</h3>
              <div className="flex-1 flex items-center space-x-4">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editMode.email}
                  className={`border rounded-md p-2 flex-1 ${
                    editMode.email ? "bg-white" : "bg-gray-100 text-gray-500"
                  }`}
                />
                <button
                  className="text-blue-600"
                  onClick={() => handleEditClick("email")}
                >
                  {editMode.email ? <FiCheck /> : <FiEdit />}
                </button>
              </div>
            </div>

            {/* Phone Section */}
            <div className="flex items-center space-x-4 border-b pb-4">
              <h3 className="text-lg font-semibold text-gray-700">Phone</h3>
              <div className="flex-1 flex items-center space-x-4">
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  disabled={!editMode.phoneNumber}
                  className={`border rounded-md p-2 flex-1 ${
                    editMode.phoneNumber
                      ? "bg-white"
                      : "bg-gray-100 text-gray-500"
                  }`}
                />
                <button
                  className="text-blue-600"
                  onClick={() => handleEditClick("phoneNumber")}
                >
                  {editMode.phoneNumber ? <FiCheck /> : <FiEdit />}
                </button>
              </div>
            </div>

            {/* Address Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Addresses
              </h3>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center text-blue-600 mb-4"
              >
                <FiPlus className="mr-2" /> Add New Address
              </button>
              {addresses.map((address, index) => (
                <div
                  key={address._id}
                  className="p-4 border rounded-md mb-4 bg-gray-50"
                >
                  <div className="flex justify-between">
                    <div>
                      <h4 className="text-lg font-semibold">
                        {address.fullName}
                      </h4>
                      <p className="text-gray-600">{`${address.addressLine1}, ${address.phoneNumber}, ${address.state} - ${address.postalCode}`}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => toggleAddressEdit(address)}
                        className="text-blue-600"
                      >
                       <FiEdit />
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address._id)}
                        className="text-red-600"
                      >
                        <FiTrash2 />
                      </button>
                      {address.isDefault ? (
                        <span className="text-green-500 text-sm font-semibold">
                          Default
                        </span>
                      ) : (
                        <button
                          className="text-sm text-blue-600"
                          onClick={() => handleSetDefaultAddress(address._id)}
                        >
                          Set as Default
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      {/* Modal to Add Address */}
      {editModal && <EditAddress onClose={()=> setEditModal(false)} current={editData}/>}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full">
            <AddAddressForm
              onClose={() => setShowModal(false)}
              isUpdated={()=>setIsUpdated(!isUpdated)}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ParentComponent;
