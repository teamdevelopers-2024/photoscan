import React, { useState, useEffect } from 'react';
import './MainProduct.css';
import AddProductModal from '../productModal/ProductModal';
import api from '../../../services/api';
import ProductDetailsModal from './ProductDetailsModal';
import Loader from '../../Loader/Loader';

function MainProduct() {
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track selected product for details
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]); // Track selected products for featuring

  const handleAddProduct = () => {
    setAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setAddProductModalOpen(false);
    fetchProducts();
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.getProducts();
      setProducts(response);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit product with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete product with ID: ${id}`);
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product); // Set the selected product to show in the modal
  };

  const closeDetailsModal = () => {
    setSelectedProduct(null);
  };

  const handleSelectProduct = async (product) => {
    let updatedSelectedProducts;
  
    if (selectedProducts.includes(product._id)) {
      // Deselect if already selected
      updatedSelectedProducts = selectedProducts.filter((id) => id !== product._id);
    } else if (selectedProducts.length < 4) {
      // Add to selection if fewer than 4 products selected
      updatedSelectedProducts = [...selectedProducts, product._id];
    } else {
      alert("You can only select up to 4 items as featured.");
      return;
    }
  
    setSelectedProducts(updatedSelectedProducts); // Update the state
  
    try {
      // Update the product's 'isFeatured' status on the backend
      await api.updateFeatured(product._id, { isFeatured: !product.isFeatured });
      fetchProducts(); // Refresh products after updating
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };
  
  

  return (
    <>
      {loading && <Loader />}
      <div className="user-main block">
        <div className="main-header mb-4 flex justify-between">
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add Product
          </button>
            <button
              onClick={() => alert("Unlisted function coming soon")}
              className="bg-red-400 text-white py-2 px-4 rounded hover:bg-red-700"
            >
              Unlisted
            </button>
        </div>
        <div className="main-table w-full">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">SINO</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Select</th>  
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={product._id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2 flex">
                    <img style={{ width: 50, height: 50 }} src={product.images[0]} alt="" />
                    <div className="h-[50px] flex items-center ml-4">
                      <p className="h-[20px]">{product.productName}</p>
                    </div>
                  </td>
                  <td className="border p-2">{product.offerPrice}</td>
                  <td className="border p-2 text-center">
                    <input
                      type="checkbox"
                      checked={product.isFeatured}
                      onChange={() => handleSelectProduct(product)}
                    />
                  </td>
                  <td className="border p-2 text-center">
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                      onClick={() => handleShowDetails(product)} // Open details modal with product
                    >
                      Details
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {isAddProductModalOpen && <AddProductModal closeModal={closeAddProductModal} />}
        {selectedProduct && (
          <ProductDetailsModal
            product={selectedProduct}
            closeModal={closeDetailsModal}
          />
        )}
      </div>
    </>
  );
}

export default MainProduct;
