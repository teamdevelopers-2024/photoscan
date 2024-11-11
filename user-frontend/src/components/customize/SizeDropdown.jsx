import React, { useState, useEffect } from 'react';

const SizeDropdown = ({ selectedSize, setSelectedSize, sizes, sizeOfFrame }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown on selection update
  useEffect(() => {
    if (isOpen) {

      setIsOpen(false);
    }
  }, [selectedSize]);

  useEffect(()=>{
    setSelectedSize(sizes[sizeOfFrame][0])
  },[sizeOfFrame])
  const handleSelect = (value) => {
    setSelectedSize(value);
  };

  return (
    <div className="relative inline-block">
      <label className="flex items-center">
        <div className="ml-2 relative shadow-md rounded-lg">
          <button
            onClick={toggleDropdown}
            className="bg-white text-black border border-gray-300 rounded-lg py-2 px-4 flex items-center focus:border-blue-500 focus:ring-blue-500 transition duration-200"
          >
            {selectedSize || "Select Size"}
            <span className="ml-2">&#9662;</span> {/* Down arrow */}
          </button>
          {isOpen && (
            <div
              className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg max-h-40 overflow-y-auto" // Added scrollable styling
              style={{ maxHeight: '160px', overflowY: 'auto' }} // Inline style for max height and scroll
            >
              {sizes[sizeOfFrame].map((size, index) => (
                <div
                  key={index}
                  className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg"
                  onClick={() => handleSelect(size)}
                >
                  {size ?? size[0]}
                </div>
              ))}
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default SizeDropdown;
