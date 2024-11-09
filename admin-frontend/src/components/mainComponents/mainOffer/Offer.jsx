// Offer.js
import React, { useEffect, useState } from 'react';
import AddOfferModal from './AddOfferModal';
import api from '../../../services/api.js';
import './Offer.css';
import Swal from 'sweetalert2';

function Offer() {
  const [offers, setOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);



  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await api.getOffers();
        setOffers(data);
      }
      catch (error) {
        console.error("Error fetching offers :", error);
      }
    }
    fetchOffers();
  }, [isModalOpen]);




  const handleDelete = async (id) => {
    try {


      const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
    });

    if(!result.isConfirmed){
      return
    }
      const response = await api.deleteOffer(id); // Call the deleteOffer API

      if (!response.error) {
        // Update the offers state
        setOffers((prevOffers) => prevOffers.filter((offer) => offer._id !== id)); // if your ID is stored as _id
        Swal.fire({
          icon: 'success',
          title: 'Offer Deleted Successfully!',
          position: 'top',
          timer: 2000,
          showConfirmButton: false,
          toast: true,
        });
        return
      }
      Swal.fire({
        icon: 'error',
        title: 'Error Deleting Offer!',
        position: 'top',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
      });


    } catch (error) {
      console.error('Error deleting offer:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error Deleting Offer!',
        position: 'top',
        timer: 2000,
        showConfirmButton: false,
        toast: true,
      });
    }
  };


  return (
    <>
      <div className="user-main">
        <div className="w-full h-[72px] flex items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Add Offer
          </button>
        </div>

        <div className="main-table">
          <table>
            <thead>
              <tr>
                <th>SI</th>
                <th>Offer Type</th>
                <th>Discount Percentage (%)</th>
                <th>Category Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr key={offer._id}>
                  <td>{index + 1}</td>
                  <td>{offer.offerType}</td>
                  <td>{offer.discountPercentage}%</td>
                  <td>{offer.categoryName}</td>
                  <td style={{ display: 'flex', justifyContent: 'center' }}>
                    <button
                      onClick={() => handleDelete(offer._id)}
                      className="btn"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddOfferModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        offers={offers}
      />
    </>
  );
}

export default Offer;
