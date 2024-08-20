import React, { useState } from 'react';

function OnlinePurchase() {
  const [selectedCategory, setSelectedCategory] = useState('newArrivals');

  const getCategoryClasses = (category) => {
    const isSelected = selectedCategory === category;
    return `relative text-sm font-semibold font-['Inter'] ${
      isSelected ? 'text-[#bd7f37]' : 'text-[#565656]'
    } ${isSelected ? 'transition-transform duration-300 transform scale-110' : ''}`;
  };

  return (
    <div className="w-full h-auto bg-[#f6f6f6] relative">
      <div className="w-full max-w-screen-xl mx-auto relative py-8 px-4">
        {/* Header */}
        <div className="text-[#5d5565] text-[26px] font-semibold font-['Lato'] leading-relaxed text-center mb-16">
          Purchase Online On Photo Scan
        </div>
        
        {/* Category Headers */}
        <div className="relative flex justify-center space-x-8 mb-8">
          <div
            className={getCategoryClasses('mostPopular')}
            onClick={() => setSelectedCategory('mostPopular')}
            style={{ cursor: 'pointer' }}
          >
            Most Popular
            {selectedCategory === 'mostPopular' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[45px] h-px bg-[#bd7f37]" />
            )}
          </div>
          <div
            className={getCategoryClasses('newArrivals')}
            onClick={() => setSelectedCategory('newArrivals')}
            style={{ cursor: 'pointer' }}
          >
            New Arrivals
            {selectedCategory === 'newArrivals' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[45px] h-px bg-[#bd7f37]" />
            )}
          </div>
          <div
            className={getCategoryClasses('discount')}
            onClick={() => setSelectedCategory('discount')}
            style={{ cursor: 'pointer' }}
          >
            Discount
            {selectedCategory === 'discount' && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[45px] h-px bg-[#bd7f37]" />
            )}
          </div>
        </div>

        {/* Products */}
        <div className="flex flex-wrap justify-between gap-4">
          {/* Product 1 */}
          <div className="relative w-[250px] h-[312px]">
            <img className="w-full h-[250px] object-cover" src="https://via.placeholder.com/250x250" alt="Product 1" />
            <div className="absolute bottom-0 left-0 p-2">
              <div className="text-[#4d4655] text-base font-semibold font-['Inter']">PRODUCT NAME IS HERE</div>
              <div className="text-[#bd7f37] text-base font-semibold font-['Inter']">₹2,499</div>
            </div>
          </div>

          {/* Product 2 */}
          <div className="relative w-[250px] h-[310px]">
            <img className="w-full h-[250px] object-cover" src="https://via.placeholder.com/250x250" alt="Product 2" />
            <div className="absolute bottom-0 left-0 p-2">
              <div className="text-[#5d5565] text-base font-semibold font-['Inter']">PRODUCT NAME IS HERE</div>
              <div className="text-[#bd7f37] text-base font-semibold font-['Inter']">₹2,499</div>
            </div>
          </div>

          {/* Product 3 */}
          <div className="relative w-[250px] h-[308px]">
            <img className="w-full h-[250px] object-cover" src="https://via.placeholder.com/250x250" alt="Product 3" />
            <div className="absolute bottom-0 left-0 p-2">
              <div className="text-[#5d5565] text-base font-semibold font-['Inter']">PRODUCT NAME IS HERE</div>
              <div className="text-[#bd7f37] text-base font-semibold font-['Inter']">₹2,499</div>
            </div>
          </div>

          {/* Product 4 */}
          <div className="relative w-[250px] h-[308px]">
            <img className="w-full h-[250px] object-cover" src="https://via.placeholder.com/250x250" alt="Product 4" />
            <div className="absolute bottom-0 left-0 p-2">
              <div className="text-[#5d5565] text-base font-semibold font-['Inter']">PRODUCT NAME IS HERE</div>
              <div className="text-[#bd7f37] text-base font-semibold font-['Inter']">₹2,499</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OnlinePurchase;
