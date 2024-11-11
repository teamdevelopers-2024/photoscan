import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// Modal component
const OrderDetailsModal = ({ order, isOpen, onClose }) => {
 
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 max-h-[90vh] overflow-y-auto p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-2xl font-bold">Order Details</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            &times;
          </button>
        </div>

        {/* Order Info */}
        <div className="space-y-3">
          <p><strong>Order ID:</strong> {order.orderId}</p>
          <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
          <p><strong>Payment Status:</strong> {order.paymentStatus}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>

        {/* Customer Info */}
        <div className="mt-6 space-y-2">
          <h3 className="text-lg font-semibold">Customer Info</h3>
          <p><strong>Name:</strong> {order.customer.name}</p>
          <p><strong>Phone:</strong> {order.customer.phone}</p>
          <p><strong>Email:</strong> {order.customer.email}</p>
          <p><strong>Address:</strong> {order.customer.address.addressLine1}, {order.customer.address.city}, {order.customer.address.state} - {order.customer.address.zip}</p>
        </div>

        {/* Products */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Products</h3>
          {order.products.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 mb-4">
              <img
                src={item.productId.images[0]}
                alt={item.productId.productName}
                className="w-16 h-16 rounded-md border"
              />
              <div className="flex-1">
                <p className="font-medium">{item.productId.productName}</p>
                <p className="text-gray-600">Price: ₹{item.productId.offerPrice}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full mt-6 bg-gray-700 text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
};


// Order Card component
const OrderCard = ({ order, showOrderDetails }) => (
  <div className="border rounded-lg shadow-sm p-4 mb-4 bg-white">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          {order.orderId}
        </h2>
        <p className="text-sm text-gray-600">
          Date: {new Date(order.orderDate).toLocaleDateString()}
        </p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-800">
          ₹{order.totalAmount}
        </p>
        <p
          className={`text-sm ${
            order.status === "Delivered" ? "text-green-500" : "text-yellow-500"
          }`}
        >
          Order Status : {order.status}
        </p>
      </div>
    </div>
    <div className="mt-4">
      {order.products.map((item, index) => (
        <div
          key={index}
          className="flex justify-between items-center py-2 border-b last:border-b-0"
        >
          <div className="flex items-center">
            <img
              src={
                item.images && item.images.length > 0
                  ? item.images[0].secureUrl
                  : item.productId.images[0]
              }
              alt={item.name}
              className="w-16 h-16 object-cover mr-4 rounded-md"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{item.productId.productName}</p>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-900">₹{item.productId.offerPrice}</p>
        </div>
      ))}
    </div>
    <div className="mt-4 flex justify-end space-x-4">
      <button
        onClick={() => showOrderDetails(order)}
        className="text-[rgb(211,184,130)] hover:text-[rgb(163,123,77)]"
      >
        View Details
      </button>
      {order.status === "Shipped" && (
        <button className="text-[rgb(211,184,130)] hover:text-[rgb(163,123,77)]">
          Track Order
        </button>
      )}
    </div>
  </div>
);

// Main component
const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const user = useSelector((state)=> state.user.user)
  const userId = user._id

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.getOrders(userId);
        console.log(response.data);
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const showOrderDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <img src={logo} onClick={()=> navigate("/")} alt="Logo" className="h-8" />
          <h1 className="text-xl md:text-2xl font-bold text-gray-900">My Orders</h1>
        </div>
      </header>

      {/* Orders List */}
      <main className="max-w-4xl mx-auto p-4">
        {orders.length > 0 ? (
          orders.map((order) => (
            <OrderCard key={order.orderId} order={order} showOrderDetails={showOrderDetails} />
          ))
        ) : (
          <p className="text-center text-gray-600">You have no orders yet.</p>
        )}
      </main>

      {/* Order Details Modal */}
      <OrderDetailsModal order={selectedOrder} isOpen={isModalOpen} onClose={closeModal} />

      {/* Footer */}
      <footer className="bg-white mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">
            © 2024 Your Company. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MyOrders;
