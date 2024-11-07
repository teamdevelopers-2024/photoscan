import React, { useState, useEffect } from 'react';
import './MainOrder.css';
import EditOrderModal from './EditOrderModal';
import ViewOrderModal from './ViewOrderModal';
import api from '../../../services/api';

function MainOrder() {
  const [orders, setOrders] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.getOrder();
        setOrders(response.data);
        if (currentOrder) {
            setStatus(currentOrder.status);
          }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [currentOrder]);

  const handleEdit = async (updatedOrder) => {
    try {
      const response = await api.updateOrderStatus(updatedOrder.orderId, updatedOrder.status);
      const updatedOrderFromDb = response.data; 
        console.log(updatedOrderFromDb);
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.orderId === updatedOrderFromDb.orderId ? updatedOrderFromDb : order
        )
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Error updating order status:', error);
    }
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
                <th className="border border-gray-300 p-4">Items</th>
                <th className="border border-gray-300 p-4">Order Amount</th>
                <th className="border border-gray-300 p-4">Status</th>
                <th className="border border-gray-300 p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} className="hover:bg-gray-100">
                  <td className="border border-gray-300 p-4">{order.orderId}</td>
                  <td className="border border-gray-300 p-4">{order.products.length}</td>
                  <td className="border border-gray-300 p-4">${order.totalAmount}</td>
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
