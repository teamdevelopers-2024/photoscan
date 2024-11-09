import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';
import api from '../../../services/api';
import Swal from 'sweetalert2';
import Loader from '../../Loader/Loader';

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
  const [imageCount, setImageCount] = useState('');
  const [images, setImages] = useState([]);
  const [numberOfTextFields, setNumberOfTextFields] = useState(0); // New State
  const [includeLogo, setIncludeLogo] = useState(false); // New State
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.getCategories(true);
        setCategories(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productName || !category || !sizeList.length || !actualPrice || !offerPrice) {
      console.error('Please fill in all required fields.');
      return;
    }

    try {
      const uploadedImageUrls = [];
      setLoading(true);

      for (const image of images) {
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', 'cloud_name');

        const response = await fetch('https://api.cloudinary.com/v1_1/dpjzt7zwf/image/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          uploadedImageUrls.push(data.secure_url);
        } else {
          console.error('Image upload failed:', data);
        }
      }

      const productData = {
        productName,
        category,
        sizes: sizeList,
        description,
        actualPrice: Number(actualPrice),
        offerPrice: Number(offerPrice),
        images: uploadedImageUrls,
        numberOfTextFields,
        includeLogo,
        imageCount,
      };

      const result = await api.addProduct(productData);
      console.log('Product saved:', result);

      if (result) {
        Toast.fire({
          icon: 'success',
          title: 'Product added successfully',
        });
        return closeModal();
      } else {
        return Toast.fire({
          icon: 'error',
          title: 'Error while adding the product',
        });
      }
    } catch (error) {
      console.error('Error saving product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
    setImagePreviews((prevPreviews) => [
      ...prevPreviews,
      ...files.map((file) => URL.createObjectURL(file)),
    ]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => {
      // Revoke the object URL to free up memory
      URL.revokeObjectURL(prevPreviews[index]);
      return prevPreviews.filter((_, i) => i !== index);
    });
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
      {loading && <Loader />}
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
            {category === 'FRAMES' ? (
              <div className="flex items-center space-x-2">
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="">Select Frame Size</option>
                  <option value="6x4">6x4</option>
                  <option value="6x8">6x8</option>
                  <option value="12x8">12x8</option>
                  <option value="12x10">12x10</option>
                  <option value="12x12">12x12</option>
                  <option value="12x15">12x15</option>
                  <option value="12x18">12x18</option>
                  <option value="10x8">10x8</option>
                  <option value="15x10">15x10</option>
                  <option value="16x16">16x16</option>
                  <option value="16x20">16x20</option>
                  <option value="16x24">16x24</option>
                  <option value="24x18">24x18</option>
                  <option value="24x36">24x36</option>
                  <option value="24x20">24x20</option>
                  <option value="30x20">30x20</option>
                  <option value="24x30">24x30</option>
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
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter size"
                />
                <button
                  type="button"
                  onClick={addSizeToList}
                  className="bg-green-500 text-white py-1 px-3 rounded hover:bg-green-600"
                >
                  Add Size
                </button>
              </div>
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
          
          <div>
            <label className="block text-sm font-medium mb-1">Image Count:</label>
            <input
              type="number"
              value={imageCount}
              onChange={(e) => setImageCount(e.target.value)}
              required
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Number of Text Fields */}
          <div>
            <label className="block text-sm font-medium mb-1">Number of Text Fields:</label>
            <input
              type="number"
              value={numberOfTextFields}
              onChange={(e) => setNumberOfTextFields(e.target.value)}
              min="0"
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>

          {/* Logo Checkbox */}
          <div>
            <label className="block text-sm font-medium mb-1">
              <input
                type="checkbox"
                checked={includeLogo}
                onChange={(e) => setIncludeLogo(e.target.checked)}
                className="mr-2"
              />
              Include Logo
            </label>
          </div>

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
        {imagePreviews.map((imgSrc, index) => (
          <div key={index} className="relative">
            <img
              src={imgSrc}
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

          {/* Submit and Close Buttons */}
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
