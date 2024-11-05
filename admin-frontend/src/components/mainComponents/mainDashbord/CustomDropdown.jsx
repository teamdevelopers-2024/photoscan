import React, { useState, useEffect } from 'react';

const CustomDropdown = ({ lineChartRange, setLineChartRange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close dropdown on selection update
  useEffect(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  }, [lineChartRange]);

  const handleSelect = (value) => {
    setLineChartRange(value);
  };

  return (
    <div className="relative inline-block">
      <label className="flex items-center">
        Line Chart Range:
        <div className="ml-2 relative">
          <button 
            onClick={toggleDropdown} 
            className="bg-white text-black border border-gray-300 rounded-lg py-2 px-4 focus:border-blue-500 focus:ring-blue-500 transition duration-200"
          >
            {lineChartRange}
          </button>
          {isOpen && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
              <div 
                className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg" 
                onClick={() => handleSelect("Monthly")}
              >
                Monthly
              </div>
              <div 
                className="cursor-pointer hover:bg-gray-100 p-2 rounded-lg" 
                onClick={() => handleSelect("Yearly")}
              >
                Yearly
              </div>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

export default CustomDropdown;
