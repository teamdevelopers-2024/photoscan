import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Loader from "../loader/Loader";

export default function ProductFilter({activeFilters , catFilter , sortOptionFilter}) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let cat = searchParams.get("catName");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1)
  const [catName , setCatName ] = useState(cat)
  const navigate = useNavigate()
  console.log("activeFilter : ",activeFilters)
  console.log("catFilter : ",catFilter)
  console.log("sortOptionFilter : ",sortOptionFilter)


  const productsPerPage = 8; // Number of products per page

useEffect(() => {
  if (catFilter) {
    setCatName(catFilter);
  }
}, [catFilter]);

useEffect(() => {
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const fetchedProducts = await api.getProducts(catName, currentPage, productsPerPage, sortOptionFilter);
      console.log("this is fetched products : ",fetchedProducts)
      setProducts(Array.isArray(fetchedProducts.products) ? fetchedProducts.products : []);
      setTotalPages(fetchedProducts.totalPages);
    } catch (error) {
      console.error("API call error", error);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  fetchProducts();
}, [currentPage, catName, sortOptionFilter]);


  if (error) return <div className="text-center text-red-500">{error}</div>;



  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const hanldeProdcutClick = (id) => {
     navigate(`/singleProduct?id=${id}`)
  }

  return (
    <>
    
    <div className="bg-gray-50">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <section aria-labelledby="products-heading" className="pb-12 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
            <div className="lg:col-span-3">
              <div className="bg-white p-6 rounded-lg md:max-h-[820px] shadow-lg mb-6">
              {loading && <Loader product={true} />}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                  {products.map((product) => (
                    <div
                    key={product._id}
                      onClick={()=> hanldeProdcutClick(product._id)}
                      className="group relative p-4 cursor-pointer bg-white border border-gray-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
                      >
                      <div className="w-full overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-52">
                        <img
                          alt={product.description}
                          src={product.images[0]}
                          className="h-full w-full object-cover object-center lg:h-full lg:w-full rounded-md"
                          />
                      </div>
                      <div className="mt-4">
                        <h3 className="text-sm font-semibold text-gray-900">
                          <a>
                            <span aria-hidden="true" className="absolute inset-0" />
                            {product.productName.charAt(0).toUpperCase() + product.productName.slice(1)}
                          </a>
                        </h3>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {product.description.charAt(0).toUpperCase() + product.description.slice(1)}
                        </p>

                        {/* Rating Section */}
                        <div className="flex items-center mt-2">
                          <span className="text-yellow-500 flex">
                            {Array.from({ length: 5 }, (_, index) => (
                              <svg
                              key={index}
                              className={`h-5 w-5 ${index < product.rating ? "text-yellow-400" : "text-gray-300"}`}
                                fill={index < product.rating ? "currentColor" : "none"}
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                stroke="currentColor"
                                >
                                <path
                                  fillRule="evenodd"
                                  d="M10 15l-3.59 2.09a1 1 0 01-1.45-1.05L7.58 12 4.24 9.91a1 1 0 011.05-1.45L10 8l2.71-2.54a1 1 0 011.45 1.05L12.42 12l3.34 2.09a1 1 0 01-1.05 1.45L10 15z"
                                  clipRule="evenodd"
                                  />
                              </svg>
                            ))}
                          </span>
                        </div>

                        <p className="text-lg font-medium text-gray-800 mt-2">
                          {product.actualPrice
                            ? `₹${product.actualPrice.toLocaleString('en-IN')}`
                            : `₹${product.productprice.toLocaleString('en-IN')}`}
                        </p>  
                      </div>
                    </div>

))}
                </div>
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-6">
                <nav className="inline-flex items-center space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    disabled={currentPage === 1}
                    >
                    Prev
                  </button>
                  <span className="px-3 py-2 text-gray-700">{currentPage}</span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="px-3 py-2 bg-white text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                    disabled={currentPage === totalPages}
                    >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
    </>
  );
}
