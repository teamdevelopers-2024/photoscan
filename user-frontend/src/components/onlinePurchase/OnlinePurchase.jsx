import React, { useState } from 'react';
import Slider from 'react-slick';
import img1 from '../../../../admin-frontend/src/assets/images/img1.jpg'
import img2 from '../../../../admin-frontend/src/assets/images/img2.jpg'
import img3 from '../../../../admin-frontend/src/assets/images/img3.jpg'
import img4 from '../../../../admin-frontend/src/assets/images/img4.jpg'

// Import Slick Carousel CSS
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Custom Arrow Components
const PrevArrow = ({ onClick }) => (
  <div
    className="slick-arrow slick-prev"
    onClick={onClick}
    style={{ 
      display: 'block', 
      background: 'rgba(0, 0, 0, 0.5)', 
      borderRadius: '50%', 
      width: '20px', 
      height: '20px', 
      color: 'white',
      lineHeight: '30px',
      textAlign: 'center',
      cursor: 'pointer'
    }}
  >
    &#9664;
  </div>
);

const NextArrow = ({ onClick }) => (
  <div
    className="slick-arrow slick-next"
    onClick={onClick}
    style={{ 
      display: 'block', 
      background: 'rgba(0, 0, 0, 0.5)', 
      borderRadius: '50%', 
      width: '20px', 
      height: '20px', 
      color: 'white',
      lineHeight: '30px',
      textAlign: 'center',
      cursor: 'pointer'
    }}
  >
    &#9654;
  </div>
);

function OnlinePurchase() {
  const [selectedCategory, setSelectedCategory] = useState('newArrivals');

  const getCategoryClasses = (category) => {
    const isSelected = selectedCategory === category;
    return `relative text-sm font-semibold font-['Inter'] ${
      isSelected ? 'text-[#bd7f37]' : 'text-[#565656]'
    } ${isSelected ? 'transition-transform duration-300 transform scale-110' : ''}`;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const products = [
    { id: 1, name: 'Product 1', price: '₹2,499', image: img1 },
    { id: 2, name: 'Product 2', price: '₹2,499', image: img2 },
    { id: 3, name: 'Product 3', price: '₹2,499', image: img3 },
    { id: 4, name: 'Product 4', price: '₹2,499', image: img4 },
  ];

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

        {/* Products Carousel */}
        <div className="w-full">
          <Slider {...settings}>
          {products.map((product) => (
  <div key={product.id} className="relative w-[250px] h-[312px] p-2">
    <img className="w-full h-[250px] object-cover" src={product.image} alt={product.name} />
    <div className="absolute bottom-0 left-0 p-2">
      <div className="text-[#5d5565] text-base font-semibold font-['Inter']">{product.name}</div>
      <div className="text-[#bd7f37] text-base font-semibold font-['Inter']">{product.price}</div>
    </div>
  </div>
))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default OnlinePurchase;
