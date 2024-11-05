import React from 'react';

const ProductDetailsModal = ({ product, closeModal }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 md:w-3/4 lg:w-1/2 xl:w-1/3 p-6 rounded-lg shadow-lg relative overflow-hidden">
        <button
          onClick={closeModal}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-600 transition duration-150"
        >
          ✕
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
          {product.productName}
        </h2>
        <div className="space-y-3">
          <p><span className="font-medium">Category:</span> {product.category}</p>
          <p><span className="font-medium">Size:</span> {product.sizes.join(', ')}</p>
          <p><span className="font-medium">Description:</span> {product.description}</p>
          <p><span className="font-medium">Actual Price:</span> ₹{product.actualPrice}</p>
          <p><span className="font-medium">Offer Price:</span> ₹{product.offerPrice}</p>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Product image ${index + 1}`}
              className="w-full h-28 object-fill rounded-md shadow-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsModal;
