import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import api from '../../../services/api';

Modal.setAppElement('#root');

const AddProductModal = ({ closeModal }) => {
  const [productName, setProductName] = useState('');
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [size, setSize] = useState('');
  const [sizeList, setSizeList] = useState([]);
  const [description, setDescription] = useState('');
  const [actualPrice, setActualPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [images, setImages] = useState([]);
  const fileInputRef = useRef(null);

  // Fetch categories when the modal opens
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.getCategories(true);  // Assuming the endpoint is api.getCategories
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (images.length > 0) {
      try {
        const uploadedImageUrls = [];
        
        for (let image of images) {
          const formData = new FormData();
          formData.append('file', image);
          formData.append('upload_preset', 'cloud_name');
          
          const uploadResponse = await fetch('https://api.cloudinary.com/v1_1/dpjzt7zwf/image/upload', {
            method: 'POST',
            body: formData,
          });

          const uploadData = await uploadResponse.json();
          if (uploadResponse.ok) {
            uploadedImageUrls.push(uploadData.secure_url);
          } else {
            console.error('Image upload failed:', uploadData);
          }
        }

        const productData = {
          productName,
          category,
          size: sizeList,
          description,
          actualPrice: Number(actualPrice),
          offerPrice: Number(offerPrice),
          images: uploadedImageUrls,
        };

        const response = await api.addFrames(productData);
        console.log('Response:', response);

        if (response) closeModal();
      } catch (error) {
        console.error('Error uploading images:', error);
      }
    } else {
      console.error('No images selected');
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));

    // Reset the file input if all images are removed, else update the input's files
    const newFileList = images.filter((_, i) => i !== index);
    const dataTransfer = new DataTransfer();
    newFileList.forEach((file) => dataTransfer.items.add(file));
    fileInputRef.current.files = dataTransfer.files;
  };

  const handleSizeInputChange = (e) => {
    setSize(e.target.value);
  };

  const addSizeToList = () => {
    if (size) {
      setSizeList([...sizeList, size]);
      setSize('');
    }
  };

  return (
    <Modal
      isOpen={true}
      onRequestClose={closeModal}
      contentLabel="Add Product"
      className="fixed inset-0 flex items-center justify-center p-4"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="w-full max-w-lg h-full max-h-[90vh] overflow-y-auto p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
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

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Size */}
          <div>
            <label className="block text-sm font-medium mb-1">Size:</label>
            {category === 'Frames' ? (
              <div className="flex items-center space-x-2">
                <select
                  value={size}
                  onChange={handleSizeInputChange}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Frame Size</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
                <button
                  type="button"
                  onClick={addSizeToList}
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                >
                  Add Size
                </button>
              </div>
            ) : (
              <input
                type="text"
                value={size}
                onChange={handleSizeInputChange}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter size and press Enter"
              />
            )}
            <div className="mt-2">
              {sizeList.map((s, index) => (
                <span key={index} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Prices */}
          <div>
            <label className="block text-sm font-medium mb-1">Actual Price:</label>
            <input
              type="number"
              value={actualPrice}
              onChange={(e) => setActualPrice(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Offer Price:</label>
            <input
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
              min="0"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-1">Images:</label>
            <input
              type="file"
              accept="image/*"
              multiple
              ref={fileInputRef}
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
            />
            <div className="mt-2 grid grid-cols-2 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(img)}
                    alt={`Preview ${index}`}
                    className="w-full h-32 object-contain rounded-lg border border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Submit & Close Buttons */}
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
              className="bg-gray-300 py-2 px-4 rounded hover:bg-gray-400"
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
