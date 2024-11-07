import React from 'react';

const ViewOrderModal = ({ isOpen, onClose, orderDetails }) => {
  if (!isOpen || !orderDetails) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Order Details</h2>
        
        {/* Order Information */}
        <div className="mb-4">
          <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
          <p><strong>Order Date:</strong> {new Date(orderDetails.orderDate).toLocaleDateString()}</p>
          <p><strong>Status:</strong> {orderDetails.status}</p>
          <p><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
          <p><strong>Payment Status:</strong> {orderDetails.paymentStatus}</p>
        </div>

        {/* Customer Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Customer Information</h3>
          <p><strong>Name:</strong> {orderDetails.customer.name}</p>
          <p><strong>Email:</strong> {orderDetails.customer.email}</p>
        </div>

        {/* Address Information */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700">Shipping Address</h3>
          <p><strong>Street:</strong> {orderDetails.customer.address.street}</p>
          <p><strong>City:</strong> {orderDetails.customer.address.city}</p>
          <p><strong>State:</strong> {orderDetails.customer.address.state}</p>
          <p><strong>ZIP Code:</strong> {orderDetails.customer.address.zip}</p>
        </div>

        {/* Products List */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700">Products</h3>
          <ul className="space-y-4 mt-2">
            {orderDetails.products.map((product, index) => (
              <li key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                <img 
                  src={product.imageUrl} 
                  alt={product.name} 
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-800">{product.name}</p>
                  <p>Quantity: {product.quantity}</p>
                  <p>Price: ${product.price}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="mt-6 bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ViewOrderModal;
