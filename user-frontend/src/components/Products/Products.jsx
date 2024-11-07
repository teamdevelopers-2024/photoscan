import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import api from "../../services/api";
import { useLocation } from "react-router-dom";

const sortOptions = [
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation(); // Get the current location object
  const searchParams = new URLSearchParams(location.search); // Create an instance of URLSearchParams
  const catid = searchParams.get("catid");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await api.getProducts(catid);
        console.log("Fetched Products:", fetchedProducts); // Log the response for debugging
        setProducts(
          Array.isArray(fetchedProducts.products)
            ? fetchedProducts.products
            : []
        ); // Ensure products is always an array
      } catch (error) {
        console.error("API call error", error); // Log any error encountered during the API call
        setError("Failed to fetch products."); // Set error message
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchProducts();
  }, []);

  // Handle loading state
  if (loading) return <div>Loading...</div>;

  // Handle error state
  if (error) return <div>{error}</div>;

  // Handle case where products is not an array
  if (!Array.isArray(products)) {
    return <div>No products available.</div>;
  }

  return (
    <div className="bg-white">
      <div>
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              Momentos
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <a
                          href={option.href}
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </a>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Product grid */}
              <div className="lg:col-span-3">
                {/* Your content */}
                {/* <Momentos /> */}

                <div className="wrapper bg-gray-100">
                  {/* PRODUCT-AREA START */}
                  <div className="bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
                      <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-x-8">
                        {products.map((product) => (
                          <div key={product._id} className="group relative">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                              <img
                                alt={product.description}
                                src={product.images[0]}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                              />
                            </div>
                            <div className="mt-4 flex justify-between">
                              <div>
                                <h3 className="text-sm text-gray-700">
                                  <a>
                                    <span
                                      aria-hidden="true"
                                      className="absolute inset-0"
                                    />
                                    {product.productName}
                                  </a>
                                </h3>
                              </div>
                              <p className="text-sm font-medium text-gray-900">
                                {product.actualPrice
                                  ? `$${product.actualPrice.toFixed(2)}`
                                  : `$${product.productprice.toFixed(2)}`}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* PRODUCT-AREA END */}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
