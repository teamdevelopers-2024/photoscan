// Offer.js
import React, { useState } from "react";
import AddOfferModal from "./AddOfferModal";
import "./Offer.css";

function Offer() {
  const [offers, setOffers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddOffer = (newOffer) => {
    setOffers((prevOffers) => [...prevOffers, newOffer]);
  };

  const handleDelete = (id) => {
    setOffers((prevOffers) => prevOffers.filter((offer) => offer.id !== id));
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
                <th>Offer Amount</th>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer, index) => (
                <tr key={offer.id}>
                  <td>{index + 1}</td>
                  <td>{offer.amount}</td>
                  <td>{offer.category}</td>
                  <td style={{ display: "flex", justifyContent: "center" }}>
                    <button
                      onClick={() => handleDelete(offer.id)}
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
        onAddOffer={handleAddOffer}
      />
    </>
  );
}

export default Offer;
