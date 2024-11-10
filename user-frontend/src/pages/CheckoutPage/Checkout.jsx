import React, { useEffect, useState } from "react";
import "./Checkout.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { useSelector } from "react-redux";
import api from "../../services/api";
import AddressModal from "./AddressModal";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const user = useSelector((state) => state.user.user)
  const navigate = useNavigate()
  const [addresses, setAddresses] = useState([])
  const [defAddress, setDefAddress] = useState({})
  const [addressModal, setAddressModal] = useState(false)
  const [productData, setProductData] = useState([])
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const getAddresses = async () => {
      try {
        // Fetch both address and cart data
        const [addressRes, cartRes] = await Promise.all([
          api.getAddress(user._id),
          api.getCartProducts(user._id),
        ]);

        if (!cartRes.error) {
          console.log("getting inside : ", cartRes.productData)
          console.log("this is checkout data : ", cartRes.productData)
          setProductData(cartRes.productData);
        }
        let totalAmount = cartRes.productData.reduce((sum, pro) => sum + (pro.productId.offerPrice || 0), 0);

        setTotal(totalAmount)
        // Handle address data response
        if (!addressRes.error) {
          setAddresses(addressRes.data);

          // Find the default address by searching in the response data
          const defaultAddress = addressRes.data.find(item => item.isDefault);
          if (defaultAddress) {
            setDefAddress(defaultAddress);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user._id) {
      getAddresses();
    }
  }, [user._id]); // Add user._id as a dependency to ensure it re-runs when the user changes


  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    // Load Razorpay script
    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Please check your internet connection.");
      return;
    }

    // Razorpay Payment Options
    const options = {
      key: "rzp_test_MlCXSvdf7wnvN1", // Your Razorpay Key ID
      amount: total * 100, // Amount in paise
      currency: "INR",
      name: "Photo Scan",
      description: "Product Description",
      image: "/your-logo.png", // Optional: Add your company logo here
      handler: async (response) => {
        console.log("Payment Response:", response); // Debug: Log the response

        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = response;

        if (!razorpay_payment_id) {
          console.error("Missing payment details", response);
          alert("Payment failed. Missing payment information.");
          return;
        }

        // Payment successful, now create the order
        try {
          // Send payment details to backend to create the order
          const createOrderResponse = await api.makeOrder({
            user : user,
            razorpay_payment_id,
            amount: total,
            products: productData,
            address: defAddress
          });


          console.log("Order creation response:", createOrderResponse);

          if (!createOrderResponse.error) {
             navigate("/ordersuccess")
          } else {
            alert("Failed to create order");
          }
        } catch (error) {
          console.error("Error creating order:", error);
          alert("Failed to create order");
        }
      },
      prefill: {
        name: user.firstName + user.lastName,
        email: user.email,
        contact: user.phoneNumber,
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#4d4d4d",
      },
    };

    // Open Razorpay Checkout with the options
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };



  const handleAddressRadioChange = (selected) => {
    setDefAddress(selected)
  }
  console.log("this is product data length : ", productData.length)
  return (
    <>
      <Header />
      <div className="h-screen bg-white md:flex">
        {/* Main Content Section */}
        <div className="space-y-8 px-12 w-auto md:w-[65%]">
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
                <div className="flex justify-between">
                  <h2 className="uppercase tracking-wide text-lg font-bold text-gray-800 mb-6">
                    Shipping & Billing Information
                  </h2>
                  <p onClick={() => setAddressModal(true)} className="text-blue-500 cursor-pointer text-sm">Select Shipping Address</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      disabled={defAddress.fullName}
                      value={defAddress.fullName}
                      onChange={(e) => setFullName(e.target.value)}
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
                      value={user.email}
                      disabled={user.email}
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
                    value={`${defAddress.city ? defAddress.city + "," : ''}${defAddress.state ? defAddress.state + "," : ''}${defAddress.country ? defAddress.country + "," : ''}${defAddress.postalCode ? defAddress.postalCode : ''}`}
                    disabled={defAddress.city}
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
                      value={defAddress.city}
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
                      value={defAddress.state}
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
                      value={defAddress.postalCode}
                      placeholder="94103"
                      className="block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-1 focus:ring-[rgb(211,184,130)] focus:border-[rgb(211,184,130)] sm:text-sm transition duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={defAddress.country}
                      placeholder="ex:india"
                      className="block w-full border border-gray-300 rounded-lg py-3 px-4 focus:ring-1 focus:ring-[rgb(211,184,130)] focus:border-[rgb(211,184,130)] sm:text-sm transition duration-300"
                      required
                    />
                  </div>
                </div>
              </section>
            </form>
          </div>

        </div>

        {/* Order Summary Section */}
        <div className="md:w-[35%] w-auto bg-white shadow-lg rounded-md px-10 py-6 md:p-6">
          <h1 className="py-4 border-b-2 text-xl text-gray-600 font-semibold">Order Summary</h1>
          <ul className="py-4 border-b overflow-y-scroll max-h-60 space-y-4 px-2">
            {productData.map((product, index) => {
              return (
                <li key={index} className="grid grid-cols-6 gap-2 border-b p-4 rounded-md shadow-sm hover:shadow-lg transition-shadow">
                  <div className="col-span-1 self-center">
                    <img
                      src={product.productId.images[0]} // Ensure the image path is correct
                      alt="Product"
                      className="rounded w-full border border-gray-200"
                    />
                  </div>
                  <div className="flex flex-col col-span-3 pt-2">
                    <span className="text-gray-600 text-md font-semibold">
                      {product.productId.productName}
                    </span>
                    <span className="text-gray-400 text-sm inline-block pt-1">
                      {product.productId.productName}
                    </span>
                  </div>
                  <div className="col-span-2 pt-3">
                    <div className="flex items-center space-x-2 text-sm justify-between">
                      <span className="text-gray-400">{product.productId.actualPrice}</span>
                      <span className="text-pink-400 font-semibold inline-block">
                        {product.productId.offerPrice}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}

            {/* Add more items here */}
          </ul>

          <div className="flex justify-between mt-4 border-b py-2 px-4 text-gray-600 font-medium">
            <span>Subtotal</span>
            <span className="text-gray-800 font-semibold">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total)}
            </span>
          </div>
          <div className="flex justify-between mt-2 border-b py-2 px-4 text-gray-600 font-medium">
            <span>Shipping</span>
            <span className="text-gray-800 font-semibold">Free</span>
          </div>
          <div className="flex justify-between mt-2 border-b py-2 px-4 text-gray-600 font-medium">
            <span>Total</span>
            <span className="text-gray-800 font-semibold">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total)}
            </span>

          </div>
          {/* Submit Payment Button */}
          <button onClick={() => handlePayment()} className="submit-button mt-6 px-4 py-2 rounded-lg bg-[rgb(211,184,130)] text-white focus:ring-0 focus:outline-none w-full text-base font-semibold shadow-lg transition-colors hover:bg-[rgb(188,157,124)]">
            Pay {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(total)}
          </button>

        </div>

      </div>
      <div className="hidden md:block">
      <Footer/>
      </div>
      {addressModal && <AddressModal addresses={addresses} onClose={() => setAddressModal(false)} onSelect={handleAddressRadioChange} />}
    </>
  );
};

export default CheckoutPage;
