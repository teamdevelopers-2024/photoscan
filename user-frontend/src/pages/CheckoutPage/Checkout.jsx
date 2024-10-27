// Example React Component
import React, { useState } from "react";
import "./Checkout.css";

const CheckoutPage = () => {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const methods = [
    { id: "online-payment", name: "Online Payment" },
    { id: "cash-on-delivery", name: "Cash On Delivery" },
  ];
  return (
    <div className="h-auto grid grid-cols-3 background">
      <div className="lg:col-span-2 col-span-3 space-y-8 px-12 background1">
        <div className="mt-5 p-4 relative flex flex-col sm:flex-row sm:items-center background2 bg-white shadow rounded-md">
          <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
            <div className="text-yellow-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 sm:w-5 h-6 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-sm font-medium ml-3">Checkout</div>
          </div>
          <div className="text-sm tracking-wide text-black mt-4 sm:mt-0 sm:ml-4">
            Complete your shipping and payment details below.
          </div>
          <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-500 hover:text-gray-800 cursor-pointer">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
        </div>
        <div className="rounded-md">
          <form id="payment-form" method="POST" action="">
            <section>
              <h2 className="uppercase tracking-wide text-lg font-bold text-black my-2">
                Shipping & Billing Information
              </h2>
              <div className="max-w-4xl mx-auto p-6 background2 shadow-lg rounded-lg">
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name here..."
                        className="block w-full border outline-2 border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="number"
                        name="number"
                        placeholder="10-digit mobile number"
                        className="block w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        PIN Code
                      </label>
                      <input
                        type="number"
                        name="pincode"
                        placeholder="Enter your pincode here..."
                        className="block w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Locality
                      </label>
                      <input
                        type="text"
                        name="locality"
                        placeholder="Enter your locality here..."
                        className="block w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      placeholder="Enter your address here ( Area and Street ) ..."
                      className="block w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        District
                      </label>
                      <input
                        type="text"
                        name="district"
                        placeholder="Enter your district here..."
                        className="block w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State
                      </label>
                      <input
                        type="text"
                        name="state"
                        placeholder="Enter your state here..."
                        className="block w-full border border-gray-300 rounded-lg py-2 px-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                      />
                    </div>
                  </div>
                </form>
              </div>
            </section>
          </form>
        </div>
        <div className="max-w-4xl mx-auto p-6 background2 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Select Payment Method</h2>
          <form className="space-y-4">
            {methods.map((method) => (
              <div key={method.id} className="flex items-center">
                <input
                  type="radio"
                  id={method.id}
                  name="payment-method"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                  className="form-radio h-4 w-4 text-blue-500 transition duration-150 ease-in-out"
                />
                <label
                  htmlFor={method.id}
                  className="ml-2 text-gray-700 cursor-pointer"
                >
                  {method.name}
                </label>
              </div>
            ))}
          </form>
        </div>
        <div className="mt-4">
        <button className="submit-button px-4 py-3 shadow rounded-full bg-white text-black focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
          Pay €846.98
        </button>
        </div>
        
      </div>
      <div className="col-span-1 bg-white lg:block hidden">
        <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">
          Order Summary
        </h1>
        <ul className="py-6 border-b space-y-6 px-8">
          <li className="grid grid-cols-6 gap-2 border-b-1">
            <div className="col-span-1 self-center">
              <img
                src="https://bit.ly/3oW8yej"
                alt="Product"
                className="rounded w-full"
              />
            </div>
            <div className="flex flex-col col-span-3 pt-2">
              <span className="text-gray-600 text-md font-semi-bold">
                Studio 2 Headphone
              </span>
              <span className="text-gray-400 text-sm inline-block pt-2">
                Red Headphone
              </span>
            </div>
            <div className="col-span-2 pt-3">
              <div className="flex items-center space-x-2 text-sm justify-between">
                <span className="text-gray-400">2 x €30.99</span>
                <span className="text-pink-400 font-semibold inline-block">
                  €61.98
                </span>
              </div>
            </div>
          </li>
          <li className="grid grid-cols-6 gap-2 border-b-1">
            <div className="col-span-1 self-center">
              <img
                src="https://bit.ly/3lCyoSx"
                alt="Product"
                className="rounded w-full"
              />
            </div>
            <div className="flex flex-col col-span-3 pt-2">
              <span className="text-gray-600 text-md font-semi-bold">
                Apple iPhone 13
              </span>
              <span className="text-gray-400 text-sm inline-block pt-2">
                Phone
              </span>
            </div>
            <div className="col-span-2 pt-3">
              <div className="flex items-center space-x-2 text-sm justify-between">
                <span className="text-gray-400">1 x €785</span>
                <span className="text-pink-400 font-semibold inline-block">
                  €785
                </span>
              </div>
            </div>
          </li>
        </ul>
        <div className="px-8 border-b">
          <div className="flex justify-between py-4 text-gray-600">
            <span>Subtotal</span>
            <span className="font-semibold text-pink-500">€846.98</span>
          </div>
          <div className="flex justify-between py-4 text-gray-600">
            <span>Shipping</span>
            <span className="font-semibold text-pink-500">Free</span>
          </div>
        </div>
        <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
          <span>Total</span>
          <span>€846.98</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
