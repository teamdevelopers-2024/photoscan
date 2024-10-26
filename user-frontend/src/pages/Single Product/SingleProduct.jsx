import React from "react";
import mainImage from "../../assets/images/1.jpg";
import image1 from "../../assets/images/1_3.jpg";
import image2 from "../../assets/images/2_2.jpg";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const SingleProduct = () => {
  return (
    <>
      <Header />
      <div className="bg-gray-100">
        {/* PRODUCT-AREA START */}
        <div className="py-20 bg-white">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row">
              {/* Single-product start */}
              <div className="lg:w-full">
                <div className="flex flex-col lg:flex-row">
                  {/* Single-pro-slider Big-photo start */}
                  <div className="lg:w-2/3 flex flex-col">
                    <div className="relative">
                      <img
                        src={mainImage}
                        alt="Product"
                        className="w-full max-w-md h-auto object-cover rounded-lg shadow-lg" // Adjusted width to max-w-md
                      />
                      <a
                        href={mainImage}
                        data-lightbox="roadtrip"
                        data-title="My caption"
                        className="absolute top-3 right-3 p-2 text-white bg-black bg-opacity-50 rounded-full"
                      >
                        <i className="zmdi zmdi-zoom-in text-xl"></i>
                      </a>
                    </div>
                  </div>
                  {/* Single-pro-slider Big-photo end */}

                  {/* Product Info */}
                  <div className="lg:w-1/3 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-2xl font-semibold">
                          Dummy Product Name
                        </h4>
                        <div className="flex items-center">
                          <span className="flex space-x-1 text-yellow-500">
                            <i className="zmdi zmdi-star"></i>
                            <i className="zmdi zmdi-star"></i>
                            <i className="zmdi zmdi-star"></i>
                            <i className="zmdi zmdi-star-half"></i>
                            <i className="zmdi zmdi-star-half"></i>
                          </span>
                          <span className="ml-2 text-gray-500">
                            (27 Ratings)
                          </span>
                        </div>
                      </div>
                      <p className="text-lg font-bold mb-4">$56.20</p>
                      <p className="text-gray-700 mb-4">
                        There are many variations of passages of Lorem Ipsum
                        available, but the majority have been altered in some
                        form by injected humour or randomised words which don't
                        look even slightly believable.
                      </p>

                      {/* Color Filter */}
                      <div className="mb-4">
                        <span className="text-gray-700 font-semibold">
                          Color:
                        </span>
                        <div className="flex space-x-2 mt-2">
                          <span className="w-6 h-6 rounded-full bg-red-500 cursor-pointer"></span>
                          <span className="w-6 h-6 rounded-full bg-green-500 cursor-pointer"></span>
                          <span className="w-6 h-6 rounded-full bg-blue-500 cursor-pointer"></span>
                        </div>
                      </div>

                      {/* Size Filter */}
                      <div className="mb-6">
                        <span className="text-gray-700 font-semibold">
                          Size:
                        </span>
                        <div className="flex space-x-2 mt-2">
                          <a
                            href="#"
                            className="px-3 py-1 border border-gray-300 rounded text-gray-700"
                          >
                            M
                          </a>
                          <a
                            href="#"
                            className="px-3 py-1 border border-gray-300 rounded bg-gray-300 text-gray-800"
                          >
                            S
                          </a>
                          <a
                            href="#"
                            className="px-3 py-1 border border-gray-300 rounded text-gray-700"
                          >
                            L
                          </a>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4 mb-4">
                      <input
                        type="number"
                        min="1"
                        className="w-16 py-2 px-3 border border-gray-300 rounded text-center"
                        defaultValue="1"
                      />
                      <div className="flex space-x-2">
                        <a
                          href="wishlist.html"
                          className="text-gray-700 hover:text-blue-500"
                        >
                          <i className="zmdi zmdi-favorite-outline text-xl"></i>
                        </a>
                        <a
                          href="#"
                          className="text-gray-700 hover:text-blue-500"
                        >
                          <i className="zmdi zmdi-zoom-in text-xl"></i>
                        </a>
                        <a
                          href="#"
                          className="text-gray-700 hover:text-blue-500"
                        >
                          <i className="zmdi zmdi-refresh text-xl"></i>
                        </a>
                        <a
                          href="cart.html"
                          className="text-gray-700 hover:text-blue-500"
                        >
                          <i className="zmdi zmdi-shopping-cart-plus text-xl"></i>
                        </a>
                      </div>
                    </div>

                    {/* Single-pro-slider Small-photo start */}
                    <div className="flex mt-6 space-x-2">
                      <img
                        src={image1}
                        alt="Product Thumbnail"
                        className="w-16 h-16 object-cover cursor-pointer rounded-md shadow"
                      />
                      <img
                        src={image2}
                        alt="Product Thumbnail"
                        className="w-16 h-16 object-cover cursor-pointer rounded-md shadow"
                      />
                    </div>
                    {/* Single-pro-slider Small-photo end */}
                  </div>
                </div>
              </div>
              {/* Single-product end */}
            </div>
          </div>
        </div>
        {/* PRODUCT-AREA END */}
      </div>
      <Footer />
    </>
  );
};

export default SingleProduct;