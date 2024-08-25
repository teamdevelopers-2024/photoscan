import React from "react";

const Momentos = () => {
  const products = [
    {
      id: 1,
      name: "Basic Tee",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      imageAlt: "Front of Basic Tee in heather gray.",
      color: "Heather Gray",
      price: "$32.00",
    },
    {
      id: 2,
      name: "Mountain Bike",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      imageAlt: "Front of Mountain Bike in red.",
      color: "Red",
      price: "$499.00",
    },
    {
      id: 3,
      name: "Casual Shoes",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      imageAlt: "Casual shoes in black.",
      color: "Black",
      price: "$89.00",
    },
    {
      id: 4,
      name: "Running Shoes",
      href: "#",
      imageSrc:
        "https://tailwindui.com/img/ecommerce-images/product-page-03-product-01.jpg",
      imageAlt: "Running shoes in blue.",
      color: "Blue",
      price: "$120.00",
    },
  ];

  return (
    <>
      <div className="wrapper bg-gray-100">
        {/* PRODUCT-AREA START */}
        <div className="bg-white">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              {products.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                    <img
                      alt={product.imageAlt}
                      src={product.imageSrc}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-700">
                        <a href={product.href}>
                          <span
                            aria-hidden="true"
                            className="absolute inset-0"
                          />
                          {product.name}
                        </a>
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {product.color}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* PRODUCT-AREA END */}
      </div>
    </>
  );
};

export default Momentos;
