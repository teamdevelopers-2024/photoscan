import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaBoxOpen, FaDollarSign, FaCalendarAlt } from 'react-icons/fa';

function ProfileOverview() {
  const user = useSelector((state) => state.user.user);

  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
  });

  return (
    <div className="p-10 w-[100%] h-[90vh] relative bg-white rounded-lg shadow-xl border border-gray-100">
      <h2 className="text-4xl font-semibold text-gray-800 mb-8">Profile Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="flex items-start mb-6 space-x-4">
          <FaUser className="text-gray-600" size={20} />
          <div>
            <p className="text-gray-500 font-medium text-sm">Name</p>
            <p className="text-gray-900 text-xl font-semibold">{formData.firstName} {formData.lastName}</p>
          </div>
        </div>
        
        <div className="flex items-start mb-6 space-x-4">
          <FaEnvelope className="text-gray-600" size={20} />
          <div>
            <p className="text-gray-500 font-medium text-sm">Email</p>
            <p className="text-gray-900 text-xl font-semibold">{formData.email}</p>
          </div>
        </div>
        
        <div className="flex items-start mb-6 space-x-4">
          <FaPhone className="text-gray-600" size={20} />
          <div>
            <p className="text-gray-500 font-medium text-sm">Phone Number</p>
            <p className="text-gray-900 text-xl font-semibold">{formData.phoneNumber}</p>
          </div>
        </div>

        <div className="border-t border-gray-200 col-span-full my-6"></div>

        <div className="flex items-start mb-6 space-x-4">
          <FaMapMarkerAlt className="text-gray-600" size={20} />
          <div>
            <p className="text-gray-500 font-medium text-sm">Default Shipping Address</p>
            <p className="text-gray-900 text-xl font-semibold">{formData.shippingAddress || 'Not set'}</p>
          </div>
        </div>
        
        <div className="flex items-start mb-6 space-x-4">
          <FaBoxOpen className="text-gray-600" size={20} />
          <div>
            <p className="text-gray-500 font-medium text-sm">Total Orders Placed</p>
            <p className="text-gray-900 text-xl font-semibold">{formData.totalOrders || 0}</p>
          </div>
        </div>
        
        <div className="flex items-start mb-6 space-x-4">
          <FaDollarSign className="text-gray-600" size={20} />
          <div>
            <p className="text-gray-500 font-medium text-sm">Average Order Value</p>
            <p className="text-gray-900 text-xl font-semibold">{formData.averageOrderValue || 'Not available'}</p>
          </div>
        </div>
        
        <div className="flex items-start mb-6 space-x-4">
          <FaCalendarAlt className="text-gray-600" size={20} />
          <div>
            <p className="text-gray-500 font-medium text-sm">Last Order Date</p>
            <p className="text-gray-900 text-xl font-semibold">{formData.lastOrderDate || 'No recent orders'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileOverview;
