import React from "react";
import Lottie from "lottie-react"; // Import Lottie as default
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import successAnimation from "../../assets/Animation - 1731224562030.json"; // Adjust the path as needed
import { useEffect } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import api from "../../services/api";
import { useState } from "react";

export default function OrderSuccess() {
  const [order, setOrder] = useState({});
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let orderId = searchParams.get("orderId");

  useEffect(() => {
    if (!orderId) {
      navigate("/");
    }

    const fetchOrder = async () => {
      try {
        const result = await api.fetchOrder(orderId);

        if (!result.error) {
          setOrder(result.data);  // Update order state
          setProducts(result.data.products);  // Directly set products from order data
          

        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrder();
  }, []);





  const date = new Date(order.orderDate);

  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;



  if (!orderId) return

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col justify-between">
        <div className="py-20">
          <div className="container mx-auto">
            <div className="bg-white p-8 shadow-md rounded-lg text-center">

              {/* Lottie Animation */}
              <div className="flex w-full justify-center mb-8">
                <Lottie
                  animationData={successAnimation}
                  loop={true} // Set to false if you want the animation to play once
                  style={{ width: '200px', height: '200px' }}
                />
              </div>

              {/* Rest of the OrderSuccess content */}
              <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
                <p className="text-lg font-semibold">
                  Thank you. Your order has been received.
                </p>
              </div>

              {/* Order Info */}
              <div className="bg-white p-6 rounded-lg shadow-md text-center mb-8">
                <div className="flex flex-wrap justify-around gap-4">
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2">Order No</h4>
                    <p className="text-lg font-medium">
                      <strong>{order.orderId}</strong>
                    </p>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2">Date</h4>
                    <p className="text-lg font-medium">
                      <strong>{formattedDate}</strong>
                    </p>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2">Total</h4>
                    <p className="text-lg font-medium">
                      <strong>{order.totalAmount}</strong>
                    </p>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xl font-semibold mb-2">
                      Payment Status
                    </h4>
                    <p className="text-lg font-medium">
                      <strong>{order.paymentStatus}</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Order Details Table */}
              <div className="flex flex-wrap -mx-4">
                <div className="w-full md:w-1/2 px-4 mb-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h4 className="text-xl font-semibold mb-4">Order Summary</h4>
                    <table className="w-full">
                      <thead className="bg-gray-300">
                        <tr>
                          <th className="text-center font-semibold">Product</th>
                          <th className="text-right font-semibold">Total</th>
                        </tr>
                      </thead>

                      <tbody>
                        {(Array.isArray(products) && products.length > 0) ? (
                          products.map((product) => (
                            <tr key={product._id}>
                              <td>{product.productId.productName}</td>
                              <td className="text-right">
                                ${product.productId.offerPrice && !isNaN(product.productId.offerPrice) ? product.productId.offerPrice.toFixed(2) : '0.00'}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan="2" className="text-center">No products found</td>
                          </tr>
                        )}

                        <tr>
                          <td>Cart Subtotal</td>
                          <td className="text-right">
                          ₹{(
                              Array.isArray(products) ? products : []
                            ).reduce((total, product) => total + (product.productId.offerPrice && !isNaN(product.productId.offerPrice) ? product.productId.offerPrice : 0), 0).toFixed(2)}
                          </td>
                        </tr>
                        <tr>
                          <td>Shipping and Handling</td>
                          <td className="text-right">Free</td>
                        </tr>
                        <tr>
                          <td>Order Total</td>
                          <td className="text-right font-semibold">
                          ₹{(
                              (Array.isArray(products) ? products : []).reduce((total, product) => total + (product.productId.offerPrice && !isNaN(product.productId.offerPrice) ? product.productId.offerPrice : 0), 0)
                            ).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>



                    </table>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="text-center mt-8">
                <a href="/">
                  <button className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
                    Continue Shopping
                  </button>
                </a>
                <a href="/myorder" className="ml-4 text-blue-500 underline hover:text-blue-700">
                  View Order History
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
