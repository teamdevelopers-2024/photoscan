import React from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';
import img1 from '../../../../admin-frontend/src/assets/images/img1.jpg'
import img2 from '../../../../admin-frontend/src/assets/images/img2.jpg'
import img3 from '../../../../admin-frontend/src/assets/images/img3.jpg'
import img4 from '../../../../admin-frontend/src/assets/images/img4.jpg'
import './Custom.css'
import { Link } from 'react-router-dom';

const CartDropdown = () => {
  const cartItems = [
    {
      id: 1,
      imageSrc: img1,
      name: 'DUMMY PRODUCT 1',
      price: 22,
      quantity: 3,
    },
    {
      id: 2,
      imageSrc: img2,
      name: 'DUMMY PRODUCT 2',
      price: 18,
      quantity: 2,
    },
    {
      id: 3,
      imageSrc: img3,
      name: 'DUMMY PRODUCT 3',
      price: 30,
      quantity: 1,
    },
    {
      id: 4,
      imageSrc: img4,
      name: 'DUMMY PRODUCT 4',
      price: 15,
      quantity: 5,
    },
  ];

  // Calculate the total amount dynamically
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="absolute right-0 top-[250%] mt-2 w-[450px] max-h-[500px] bg-white rounded-lg shadow-lg z-50 overflow-hidden">
      <div className="relative w-full h-full flex flex-col p-4">
        {/* Cart Items */}
        <div className="w-full h-[380px] overflow-y-auto overflow-x-hidden custom-scrollbar">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center border-b ml-3 mr-3 border-gray-200 py-4">
              <img
                className="w-24 h-24 object-cover bg-gray-200 rounded-lg"
                src={item.imageSrc}
                alt={item.name}
              />
              <div className="ml-4 flex-1">
                <div className="text-gray-700 text-base font-semibold">
                  {item.name}
                </div>
                <div className="text-gray-500 text-sm">Price: ${item.price}</div>
                <div className="text-gray-500 text-sm">Qty: {item.quantity}</div>
              </div>
              <button className="text-gray-500 text-xl">
              </button>
            </div>
          ))}
        </div>
        
        {/* Total and Action Buttons */}
        <div className="mt-4 ml-3 mr-3 flex flex-col space-y-2">
          <div className="text-gray-700 text-xl font-bold text-right">
            TOTAL: ${totalAmount}
          </div>
          <div className="flex gap-2">
            <Link to='/cart'>
            
            <button className="w-full h-10 bg-gray-200 rounded-lg text-sm text-gray-700 font-bold">
              VIEW CART
            </button>
            </Link>
            <Link to='/checkout'>
            <button className="w-full h-10 bg-gray-200 rounded-lg text-sm text-gray-700 font-bold">
              CHECKOUT
            </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDropdown;
