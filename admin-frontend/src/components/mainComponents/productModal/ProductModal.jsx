import React, { useState } from 'react';
import Modal from 'react-modal';
import api from '../../../services/api'; // Make sure this path is correct

// Make sure to set the app element for accessibility
Modal.setAppElement('#root');

const AddProductModal = ({ closeModal }) => {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      try {
        // Upload image to Cloudinary
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'cloud_name'); // Replace with your upload preset

        const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/dpjzt7zwf/image/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadResponse.ok) {
          const uploadedImageUrl = uploadData.secure_url;
          setImageUrl(uploadedImageUrl);

          // Prepare product data
          const productData = {
            productName,
            description,
            price: Number(price), // Ensure price is a number
            image: uploadedImageUrl,
          };

          console.log('Product Data:', productData);

          // Send product data to your backend
          const response = await api.addFrames(productData);
          console.log('Response:', response);

          if (response) {
            closeModal(); // Close modal after successful submission
          }
        } else {
          console.error('Image upload failed:', uploadData);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    } else {
      console.error('No image selected');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Add Product"
      className="fixed inset-0 flex items-center justify-center p-4 rounded-lg shadow-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Price:</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              min="0" // Optional: Ensure the price is non-negative
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Image:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Add Product
            </button>
            <button
              type="button"
              onClick={closeModal}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddProductModal;
