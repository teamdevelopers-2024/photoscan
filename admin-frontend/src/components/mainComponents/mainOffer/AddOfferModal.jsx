import React, { useState, useEffect } from 'react';
import './Offer.css';
import api from '../../../services/api.js';
import Swal from 'sweetalert2';
import Loader from '../../Loader/Loader.jsx';

function AddOfferModal({ isOpen, onClose, offers }) {
  const [offerType, setOfferType] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const data = await api.getCategories(true);
      setLoading(false);
      const existingOfferCategories = offers.map((offer) => offer.categoryName);
      const filteredCategories = data.data.filter(
        (category) => !existingOfferCategories.includes(category.name) // Filter out categories with existing offers
      );
      console.log('this is categories', data);
      setCategories(filteredCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false); // Ensure loading state is reset on error
    }
  };

  const cancelOffer = ()=>{
    setOfferType('');
    setDiscountPercentage('');
    setCategoryName('');
    onClose();
  }
  const handleSubmit = async () => {
    setLoading(true);

    // Validation checks
    if (!offerType || !discountPercentage || !categoryName) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'All fields are required!',
        position: 'top',
        timer: 2000,
        showConfirmButton: false,
        toast: true
      });
      return;
    }

    if (isNaN(discountPercentage) || discountPercentage < 0 || discountPercentage > 92) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Discount percentage must be a number between 0 and 92!',
        position: 'top',
        timer: 2000,
        showConfirmButton: false,
        toast: true
      });
      return;
    }

    const newOffer = {
      offerType,
      discountPercentage: parseFloat(discountPercentage),
      categoryName,
    };

    try {
      // Send the offer data to the backend
      const savedOffer = await api.addOffer(newOffer);
      setLoading(false);
      // Reset fields
      setOfferType('');
      setDiscountPercentage('');
      setCategoryName('');
      onClose();
      Swal.fire({
        icon: 'success',
        title: 'Offer Added Successfully!',
        position: 'top',
        timer: 2000,
        showConfirmButton: false,
        toast: true
      });
    } catch (error) {
      setLoading(false);
      Swal.fire({
        icon: 'error',
        title: 'Error Adding Offer!',
        position: 'top',
        timer: 2000,
        showConfirmButton: false,
        toast: true
      });
      console.error('Failed to add offer:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {loading && <Loader />}
      <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-30">
        <div className="modal bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
          <h2 className="text-xl font-semibold mb-4">Add Offer</h2>

          {/* Offer Type Input */}
          <input
            type="text"
            placeholder="Offer Type"
            value={offerType}
            onChange={(e) => setOfferType(e.target.value)}
            className="modal-input border border-gray-300 rounded-md p-2 mb-4 w-full"
          />

          {/* Discount Percentage Input */}
          <input
            type="number"
            placeholder="Discount Percentage"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            className="modal-input border border-gray-300 rounded-md p-2 mb-4 w-full"
          />

          {/* Category Name Dropdown */}
          <select
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="modal-input border border-gray-300 rounded-md p-2 mb-4 w-full"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>

          <div className="flex justify-between gap-3">
            <button
              onClick={handleSubmit}
              className="btn bg-blue-600 text-white font-semibold rounded-md py-2 px-4 hover:bg-blue-700"
            >
              Add Offer
            </button>
            <button
              onClick={cancelOffer}
              className="btn bg-gray-300 text-black font-semibold rounded-md py-2 px-4 hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddOfferModal;
