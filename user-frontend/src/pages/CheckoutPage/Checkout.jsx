import React from "react";
import "./Checkout.css";

const CheckoutPage = () => {
  return (
    <div className="h-screen grid grid-cols-3 bg-white">
      {/* Main Content Section */}
      <div className="lg:col-span-2 col-span-3 space-y-8 px-12">
        <div className="mt-8 p-6 relative flex flex-col sm:flex-row sm:items-center background2 bg-white shadow-lg rounded-md transition-transform duration-300 hover:scale-105">
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
            <div className="text-lg font-medium ml-3 text-gray-800">Checkout</div>
          </div>
          <div className="text-sm tracking-wide text-gray-600 mt-4 sm:mt-0 sm:ml-4">
            Complete your shipping and payment details below.
          </div>
          <div
            className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-500 hover:text-gray-800 cursor-pointer"
            aria-label="Close"
          >
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

        {/* Shipping Form Section */}
        <div className="rounded-md bg-white p-6 shadow-xl border border-gray-200">
          <form id="payment-form" method="POST" action="">
            <section>
              <h2 className="uppercase tracking-wide text-lg font-bold text-gray-800 mb-6">
                Shipping & Billing Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className="block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-1 focus:ring-[rgb(211,184,130)] focus:border-[rgb(211,184,130)] sm:text-sm transition duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className="block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-1 focus:ring-[rgb(211,184,130)] focus:border-[rgb(211,184,130)] sm:text-sm transition duration-300"
                    required
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="1234 Main St"
                  className="block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-1 focus:ring-[rgb(211,184,130)] focus:border-[rgb(211,184,130)] sm:text-sm transition duration-300"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    placeholder="San Francisco"
                    className="block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-1 focus:ring-[rgb(211,184,130)] focus:border-[rgb(211,184,130)] sm:text-sm transition duration-300"
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
                    placeholder="CA"
                    className="block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-1 focus:ring-[rgb(211,184,130)] focus:border-[rgb(211,184,130)] sm:text-sm transition duration-300"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    placeholder="94103"
                    className="block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-1 focus:ring-[rgb(211,184,130)] focus:border-[rgb(211,184,130)] sm:text-sm transition duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <select
                    name="country"
                    className="block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-1 focus:ring-[rgb(211,184,130)] focus:border-[rgb(211,184,130)] sm:text-sm transition duration-300"
                    required
                  >
                    <option value="">Select Country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="GB">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="FR">France</option>
                    <option value="DE">Germany</option>
                  </select>
                </div>
              </div>
            </section>
          </form>
        </div>
        
      </div>

      {/* Order Summary Section */}
<div className="col-span-1 bg-white lg:block hidden shadow-lg rounded-md p-6">
  <h1 className="py-4 border-b-2 text-xl text-gray-600 font-semibold">Order Summary</h1>
  <ul className="py-4 border-b space-y-4 px-2">
    <li className="grid grid-cols-6 gap-2 border-b p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow">
      <div className="col-span-1 self-center">
        <img
          src="https://bit.ly/3oW8yej"
          alt="Product"
          className="rounded w-full border border-gray-200"
        />
      </div>
      <div className="flex flex-col col-span-3 pt-2">
        <span className="text-gray-600 text-md font-semibold">
          Studio 2 Headphone
        </span>
        <span className="text-gray-400 text-sm inline-block pt-1">
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
    {/* Add more items here */}
  </ul>
  <div className="flex justify-between mt-4 border-b py-2 px-4 text-gray-600 font-medium">
    <span>Subtotal</span>
    <span className="text-gray-800 font-semibold">€61.98</span>
  </div>
  <div className="flex justify-between mt-2 border-b py-2 px-4 text-gray-600 font-medium">
    <span>Shipping</span>
    <span className="text-gray-800 font-semibold">Free</span>
  </div>
  <div className="flex justify-between mt-2 border-b py-2 px-4 text-gray-600 font-medium">
    <span>Total</span>
    <span className="text-gray-800 font-semibold">€61.98</span>
  </div>
  {/* Submit Payment Button */}
  <button className="submit-button mt-6 px-4 py-2 rounded-lg bg-[rgb(211,184,130)] text-white focus:ring-0 focus:outline-none w-full text-base font-semibold shadow-lg transition-colors hover:bg-[rgb(188,157,124)]">
  Pay €61.98
</button>

</div>

    </div>
  );
};

export default CheckoutPage;
