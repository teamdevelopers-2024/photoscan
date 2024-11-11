import React, { useState, useEffect } from 'react';
import './MainOrder.css';
import EditOrderModal from './EditOrderModal';
import ViewOrderModal from './ViewOrderModal';
import api from '../../../services/api';
import Loader from '../../Loader/Loader';

function MainOrder() {
  const [orders, setOrders] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [totalPages, setTotalPages] = useState(1);

  // Fetch orders with pagination
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true)
        const response = await api.getOrder({ page: currentPage }); // Pass the current page
        setOrders(response.data);
        setTotalPages(response.totalPages); // Set total pages for pagination
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false)
      }
    };

    fetchOrders();
  }, [currentPage]);

  const handleEdit = async (updatedOrder) => {
    try {

      const response = await api.updateOrderStatus(updatedOrder.orderId, updatedOrder.status);
      const updatedOrderFromDb = response.data;
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

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="order-main p-6">
        <div className="overflow-y-scroll max-h-[550px]">
          <table className="min-w-full border border-gray-300 ">
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
                  <td className="border border-gray-300 p-4">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(order.totalAmount)}
                  </td>
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

        <div className="pagination flex justify-center gap-2 mt-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white py-1 px-3 rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="flex items-center text-gray-700">Page {currentPage} of {totalPages}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white py-1 px-3 rounded disabled:opacity-50"
          >
            Next
          </button>
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
