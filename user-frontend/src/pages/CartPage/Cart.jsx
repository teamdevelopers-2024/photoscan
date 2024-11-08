import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import './Cart.css'

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 49.99,
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 19.99,
      image: 'https://via.placeholder.com/100',
    },
  ]);

  return (
    <>
      <Header />
      <div className="bg-gray-100 h-[100vh] flex flex-col p-10 md:flex-row">
        <div className="bg-white rounded-lg h-[79vh]  shadow-lg p-4 flex-1 overflow-y-scroll">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gray-50 p-4 rounded-lg shadow"
              >
                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg" />
                <div className="flex-1 ml-4 text-center sm:text-left">
                  <h2 className="text-lg font-bold">{item.name}</h2>
                  <p className="text-sm text-gray-600">Price: ${item.price}</p>
                </div>
                <div className="flex items-center space-x-4 mt-2 sm:mt-0">
                  {/* <button
                    onClick={() => console.log(`Added ${item.name} to wishlist!`)}
                    className="text-blue-500 hover:underline"
                  >
                    Add to Wishlist
                  </button> */}
                  <button
                    onClick={() => setCartItems(cartItems.filter((i) => i.id !== item.id))}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-lg font-bold mt-2 sm:mt-0">${item.price.toFixed(2)}</p>
              </div>
            ))}
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
              <span className="text-xl font-bold">${cartItems.reduce((total, item) => total + item.price, 0).toFixed(2)}</span>
            </div>
            <button className="w-full bg-blue-500 text-white p-3 rounded-lg font-bold hover:bg-blue-600 transition duration-300">
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
