import React, { useState, useEffect } from 'react';
import './MainProduct.css';
import AddProductModal from '../productModal/ProductModal'; // Import the modal component
import api from '../../../services/api';

function MainFrame() {
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [frames, setFrames] = useState([]); // Initialize as an empty array

  const handleAddProduct = () => {
    setAddProductModalOpen(true);
  };

  const closeAddProductModal = () => {
    setAddProductModalOpen(false);
    fetchFrames();
  };
  const fetchFrames = async () => {
    try {
      
      const frameData = await api.getFrames(); // Ensure this returns an array
      setFrames(frameData);
      
      
    } catch (error) {
      console.error('Failed to fetch frames:', error);
    }
  };
  useEffect(() => {
    
    // Define an async function to fetch data
    

    fetchFrames(); // Call the async function
  }, []);

  const handleEdit = (id) => {
    console.log(`Edit user with ID: ${id}`);
  };

  const handleDelete = (id) => {
    console.log(`Delete user with ID: ${id}`);
  };

  return (
    <>
      <div className="user-main block">
        <div className="main-header mb-4">
          <button
            onClick={handleAddProduct}
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Add Product
          </button>
        </div>
        <div className="main-table">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border p-2">SINO</th>
                <th className="border p-2">Product</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {frames.map((frame, index) => (
                <tr key={frame.id}>
                  <td className="border p-2">{index + 1}</td>
                  <td className="border p-2 flex">
                    <img style={{width:50,height:50}} src={frame.image} alt="" /> 
                    <div style={{alignItems:'center'}} className="h-[50px]  flex ">
                    <p className='h-[20px] ml-7'>{frame.productname}</p>
                    </div>
                    
                  </td>
                  <td className="border p-2">{frame.productprice}</td>
                  <td className="border p-2 text-center">
                    <button
                      className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 mr-2"
                      onClick={() => handleEdit(frame.id)}
                    >
                      details
                    </button>
                    <button
                      className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                      onClick={() => handleDelete(frame.id)}
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
      </div>
    </>
  );
}

export default MainFrame;
