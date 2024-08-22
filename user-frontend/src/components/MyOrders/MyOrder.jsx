import React from 'react';
import logo from "../../assets/images/logo.png"; 

const orders = [
  {
    orderId: "123456",
    date: "2024-08-22",
    items: [
      { name: "Photo Frame 1", quantity: 1, price: "₹1,499", image: "path_to_image1" },
      { name: "Photo Frame 2", quantity: 2, price: "₹2,999", image: "path_to_image2" },
    ],
    totalAmount: "₹7,497",
    status: "Shipped",
  },
  {
    orderId: "654321",
    date: "2024-08-18",
    items: [{ name: "Photo Frame 3", quantity: 1, price: "₹4,999", image: "path_to_image3" }],
    totalAmount: "₹4,999",
    status: "Delivered",
  },
];

const OrderCard = ({ order }) => (
  <div className="border rounded-lg shadow-sm p-4 mb-4 bg-white">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Order #{order.orderId}</h2>
        <p className="text-sm text-gray-600">Date: {order.date}</p>
      </div>
      <div className="text-right">
        <p className="text-lg font-semibold text-gray-800">{order.totalAmount}</p>
        <p className={`text-sm ${order.status === "Delivered" ? "text-green-500" : "text-yellow-500"}`}>
          {order.status}
        </p>
      </div>
    </div>
    <div className="mt-4">
      {order.items.map((item, index) => (
        <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
          <div className="flex items-center">
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover mr-4 rounded-md"
            />
            <div>
              <p className="text-sm font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-900">{item.price}</p>
        </div>
      ))}
    </div>
    <div className="mt-4 flex justify-end space-x-4">
      <button className="text-[rgb(211,184,130)] hover:text-[rgb(163,123,77)]">View Details</button>
      {order.status === "Shipped" && (
        <button className="text-[rgb(211,184,130)] hover:text-[rgb(163,123,77)]">Track Order</button>
      )}
    </div>
  </div>
);

const MyOrders = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <img src={logo} alt="Logo" className="h-8" />
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
        </div>
      </header>

      {/* Orders List */}
      <main className="max-w-4xl mx-auto p-4">
        {orders.length > 0 ? (
          orders.map((order) => <OrderCard key={order.orderId} order={order} />)
        ) : (
          <p className="text-center text-gray-600">You have no orders yet.</p>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white mt-8">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm text-gray-500">© 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default MyOrders;
