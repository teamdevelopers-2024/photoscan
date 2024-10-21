import React, { useState } from 'react';
import { useSelector } from 'react-redux';

function ProfileOverview() {
  const user = useSelector((state) => state.user.user);

  // Local state to manage form data
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName : user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

  return (
    <div className="p-6 w-[82%] h-[60vh] left-[18%] relative bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6">Profile Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="mb-4">
          <p className="text-gray-500 font-semibold">Name:</p>
          <p className="text-gray-700">{formData.firstName} {formData.lastName}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 font-semibold">Email:</p>
          <p className="text-gray-700">{formData.email}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 font-semibold">Phone Number:</p>
          <p className="text-gray-700">{formData.phoneNumber}</p>
        </div>
        {/* Add e-commerce related content here */}
        <div className="mb-4">
          <p className="text-gray-500 font-semibold">Default Shipping Address:</p>
          <p className="text-gray-700">{formData.shippingAddress || 'Not set'}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 font-semibold">Total Orders Placed:</p>
          <p className="text-gray-700">{formData.totalOrders || 0}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 font-semibold">Average Order Value:</p>
          <p className="text-gray-700">{formData.averageOrderValue || 'Not available'}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-500 font-semibold">Last Order Date:</p>
          <p className="text-gray-700">{formData.lastOrderDate || 'No recent orders'}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileOverview;