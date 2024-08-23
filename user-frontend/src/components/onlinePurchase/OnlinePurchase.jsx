import React, { useRef, useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "./OnlinePurchase.css";
import Slider from "react-slick";
import img1 from "../../../../admin-frontend/src/assets/images/img1.jpg";
import img2 from "../../../../admin-frontend/src/assets/images/img2.jpg";
import img3 from "../../../../admin-frontend/src/assets/images/img3.jpg";
import img4 from "../../../../admin-frontend/src/assets/images/img4.jpg";

// Import Slick Carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function OnlinePurchase() {
  const [selectedCategory, setSelectedCategory] = useState("newArrivals");
  const sliderRef = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      duration: 800, 
      easing: "ease-in-out", 
      offset: 100, 
      once: false, 
    });
  }, []);

  const getCategoryClasses = (category) => {
    const isSelected = selectedCategory === category;
    return `relative text-sm font-semibold font-['Inter'] ${
      isSelected ? "text-[#bd7f37]" : "text-[#565656]"
    } ${
      isSelected ? "transition-transform duration-300 transform scale-110" : ""
    }`;
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const products = [
    { id: 1, name: "Product 1", price: "₹2,499", image: img1, aosDelay: "0"},
    { id: 2, name: "Product 2", price: "₹2,499", image: img2, aosDelay: "200"},
    { id: 3, name: "Product 3", price: "₹2,499", image: img3, aosDelay: "400"},
    { id: 4, name: "Product 4", price: "₹2,499", image: img4, aosDelay: "600"},
  ];

  return (
    <div className="w-full h-auto bg-[#f6f6f6] relative">
      <div className="w-full max-w-screen-xl mx-auto relative py-8 px-4 flex flex-col items-center">
        {/* Header */}
        <div
          className="w-full h-20 flex flex-col mb-6 justify-center items-center"
          data-aos="fade-in"
        >
          <div className="text-zinc-600 text-3xl font-semibold font-['Lato'] text-center leading-relaxed">
            Purchase Online On Photo Scan
          </div>
          <div className="w-20 h-px bg-black mt-2" />
        </div>

        {/* Category Headers */}
        <div
          className="relative flex justify-center space-x-8 mb-8"
          data-aos="fade-in"
        >
          <div
            className={getCategoryClasses("mostPopular")}
            onClick={() => setSelectedCategory("mostPopular")}
            style={{ cursor: "pointer" }}
          >
            Most Popular
            {selectedCategory === "mostPopular" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[45px] h-px bg-[#bd7f37]" />
            )}
          </div>
          <div
            className={getCategoryClasses("newArrivals")}
            onClick={() => setSelectedCategory("newArrivals")}
            style={{ cursor: "pointer" }}
          >
            New Arrivals
            {selectedCategory === "newArrivals" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[45px] h-px bg-[#bd7f37]" />
            )}
          </div>
          <div
            className={getCategoryClasses("discount")}
            onClick={() => setSelectedCategory("discount")}
            style={{ cursor: "pointer" }}
          >
            Discount
            {selectedCategory === "discount" && (
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[45px] h-px bg-[#bd7f37]" />
            )}
          </div>
        </div>

        {/* Products Carousel */}
        <div className="w-full">
          <Slider ref={sliderRef} {...settings}>
            {products.map((product) => (
              <div
              data-aos="fade-up"
              data-aos-delay={product.aosDelay}
                key={product.id}
                className="relative w-[250px] h-[312px] p-2"
              >
                <img
                  className="w-full h-[250px] object-cover"
                  src={product.image}
                  alt={product.name}
                />
                <div className="absolute bottom-0 left-0 p-2">
                  <div className="text-[#5d5565] text-base font-semibold font-['Inter']">
                    {product.name}
                  </div>
                  <div className="text-[#bd7f37] text-base font-semibold font-['Inter']">
                    {product.price}
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div className="slider-buttons">
            <button data-aos="fade-right" data-aos-duration="500" onClick={() => sliderRef.current.slickPrev()}>Prev</button>
            <button data-aos="fade-left" data-aos-duration="500" onClick={() => sliderRef.current.slickNext()}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
