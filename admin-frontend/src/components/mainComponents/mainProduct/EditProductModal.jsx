// EditProductModal.js
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const EditProductModal = ({ product, closeModal, updateProduct }) => {
  const [productData, setProductData] = useState({
    productName: '',
    description: '',
    offerPrice: '',
    actualPrice: '',
  });
  useEffect(() => {
    if (product) {
      setProductData({
        productName: product.productName,
        description: product.description,
        offerPrice: product.offerPrice,
        actualPrice: product.actualPrice,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateProduct(product._id, productData);
      Swal.fire('Success', 'Product updated successfully!', 'success');
      closeModal();
    } catch (error) {
      Swal.fire('Error', 'Failed to update product.', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          onClick={closeModal}
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Edit Product</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="productName"
            value={productData.productName}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="actualPrice"
            value={productData.actualPrice}
            onChange={handleChange}
            placeholder="Actual Price"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="number"
            name="offerPrice"
            value={productData.offerPrice}
            onChange={handleChange}
            placeholder="Offer Price"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          className="mt-6 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
          onClick={handleSave}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default EditProductModal;
