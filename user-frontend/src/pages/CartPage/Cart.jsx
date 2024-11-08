import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import "./Cart.css";
import api from "../../services/api";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEye } from '@fortawesome/free-solid-svg-icons';
import Modal from "./previewModal";

function Cart() {
  const [cartItems, setCartItems] = useState([]); // Initialize as an empty array
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [previewData, setPreviewData] = useState({}); // State to hold preview data
  const user = useSelector((state) => state.user.user); // Access user from Redux store

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const userId = user._id; // Get the user ID
        const response = await api.getCart(userId); // Fetch cart data
        const data = response?.cartData?.items || [];
        console.log(data);

        setCartItems(data); // Set the cart items in the state
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    if (user) {
      // Only fetch if the user is available
      fetchCartItems();
    }
  }, [user]); // Dependency on user

  const handlePreviewClick = (item) => {
    setPreviewData({
      image: item.image,
      text: item.productName, // You can customize this to show any text
    });
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <Header />
      <div className="bg-gray-100 h-[100vh] flex flex-col p-10 md:flex-row">
        <div className="bg-white rounded-lg h-[79vh] shadow-lg p-4 flex-1 overflow-y-scroll">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
          <div className="space-y-4">
            {cartItems.length === 0 ? ( // Check if there are no items
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item._id} // Use item's unique ID for key
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg shadow"
                >
                  <img
                    src={item.image} // Get image from item
                    alt={item.productName} // Use productName as alt text
                    className="w-20 h-20 rounded-lg"
                  />
                  <div className="flex-1 ml-4 text-center sm:text-left">
                    <h2 className="text-lg font-bold">{item.productName}</h2>
                    <p className="text-sm text-gray-600">
                      Price: ₹{item.productprice}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                    <FontAwesomeIcon
                      icon={faEye}
                      className="text-blue-500 cursor-pointer"
                      onClick={() => handlePreviewClick(item)}
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        // Remove item from cart
                        setCartItems(
                          cartItems.filter((i) => i._id !== item._id)
                        );
                      }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="w-full md:w-1/3 p-4">
          <div className="bg-gray-50 p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between items-center mb-2">
              <span>Total Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span>Total Amount:</span>
              <span className="text-xl font-bold">
                ₹ 
                {cartItems
                  .reduce((total, item) => total + item.productprice, 0)
                  .toFixed(2)}
              </span>
            </div>
            <button className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={modalOpen} 
        onClose={handleCloseModal} 
        image={previewData.image} 
        text={previewData.text} 
      />
    </>
  );
}

export default Cart;
