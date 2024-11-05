// OrderList.js
import React, { useState } from 'react';
import './MainOrder.css';
import EditOrderModal from './EditOrderModal';
import ViewOrderModal from './ViewOrderModal';

function MainOrder() {
  const [orders, setOrders] = useState([
    { id: 1, item: 'Laptop', amount: 1200, status: 'Shipped' },
    { id: 2, item: 'Smartphone', amount: 800, status: 'Pending' },
    { id: 3, item: 'Headphones', amount: 150, status: 'Delivered' },
  ]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  const handleEdit = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  const openEditModal = (order) => {
    setCurrentOrder(order);
    setIsEditModalOpen(true);
  };

  const openViewModal = (order) => {
    setCurrentOrder(order);
    setIsViewModalOpen(true);
  };

  return (
    <>
      <div className="order-main p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-4">ID</th>
                <th className="border border-gray-300 p-4">Item</th>
                <th className="border border-gray-300 p-4">Order Amount</th>
                <th className="border border-gray-300 p-4">Status</th>
                <th className="border border-gray-300 p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-4">{order.id}</td>
                  <td className="border border-gray-300 p-4">{order.item}</td>
                  <td className="border border-gray-300 p-4">${order.amount}</td>
                  <td className="border border-gray-300 p-4">{order.status}</td>
                  <td className="border border-gray-300 p-4 flex justify-center gap-2">
                    <button 
                      onClick={() => openEditModal(order)} 
                      className="bg-yellow-500 text-white font-semibold py-1 px-2 rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => openViewModal(order)} 
                      className="bg-blue-500 text-white font-semibold py-1 px-2 rounded hover:bg-blue-600"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <EditOrderModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        onEdit={handleEdit} 
        currentOrder={currentOrder} 
      />
      <ViewOrderModal
        isOpen={isViewModalOpen} 
        onClose={() => setIsViewModalOpen(false)} 
        orderDetails={currentOrder} 
      />
    </>
  );
}

export default MainOrder;
