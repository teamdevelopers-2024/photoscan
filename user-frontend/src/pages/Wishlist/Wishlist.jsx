import React, { useEffect, useState } from 'react';
import { FaShoppingCart, FaTrashAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist data from the backend
  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await fetch('/api/wishlist'); // Adjust the endpoint as needed
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      await fetch(`/api/removewish?id=${id}`, { method: 'DELETE' });
      setWishlist(wishlist.filter(item => item._id !== id));
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };

  const handleAddToCart = async (id) => {
    try {
      await fetch(`/api/addtocart?productId=${id}`, { method: 'POST' });
      // Optional: show confirmation to the user
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const handleUserDetails = (id) => {
    // Logic to navigate or show user details for the item
  };

  return (
    <>
    <Header/>
    <section className="my-10">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="w-full lg:w-3/4 bg-white shadow-lg rounded-lg p-6">
            <h4 className="text-2xl font-bold mb-6 text-gray-700">Your Wishlist</h4>
            <p className="text-gray-600 mb-4">
              Wishlist Count: <span className="text-red-500 font-semibold">{wishlist.length}</span>
            </p>

            {wishlist.length > 0 ? (
              wishlist.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col lg:flex-row items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-lg mb-4 transition duration-200 ease-in-out"
                  onClick={() => handleUserDetails(item._id)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={`primg/${item.image[0]}`}
                      className="w-24 h-24 object-cover rounded-md shadow-sm"
                      alt={item.productName}
                    />
                    <div>
                      <Link to="#" className="text-lg font-semibold text-gray-800 hover:text-gray-600 transition duration-200">
                        {item.productName}
                      </Link>
                      <p className="text-gray-500">{item.category}</p>
                    </div>
                  </div>

                  <div className="text-gray-700 text-sm">
                    ₹ {item.price} <span className="text-gray-500">/ per item</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(item._id);
                      }}
                      className="flex items-center px-4 py-2 text-gray-700 bg-white border rounded-lg hover:bg-gray-100 transition duration-200"
                    >
                      <FaShoppingCart className="mr-2" />
                      <span>Add to Cart</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(item._id);
                      }}
                      className="flex items-center px-4 py-2 text-red-600 bg-white border border-red-500 rounded-lg hover:bg-red-100 transition duration-200"
                    >
                      <FaTrashAlt className="mr-2" />
                      <span>Remove</span>
                    </button>
                  </div>
                  
                  {(!item.catstatus || item.deleted) && (
                    <p className="text-red-500 mt-2 lg:mt-0 text-sm font-medium">Stock not available</p>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-6">No Items in Wishlist</p>
            )}
          </div>
        </div>
      </div>
    </section>
    <Footer/>
    </>
    
  );
};

export default Wishlist;
