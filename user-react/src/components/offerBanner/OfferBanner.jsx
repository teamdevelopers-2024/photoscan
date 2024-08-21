import React, { useState } from "react";
import img1 from "../../assets/images/0200de8f618428ba742174e1f740749a.png";
import img2 from "../../assets/images/1037674.jpg";
import img3 from "../../assets/images/bmw_car_sports_139454_3840x2160.jpg";
import img4 from "../../assets/images/bmw-f82-dark-side-car-digital-art_1569189343.jpg";
import leftArrow from "../../assets/images/left-arrow.png";
import rightArrow from "../../assets/images/right-arrow.png";

export default function OfferBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Directly use the imported images in the slides array
  const slides = [img1, img2, img3, img4];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="w-full flex justify-center">
      <div className="relative w-full md:w-11/12 overflow-hidden">
        {/* Carousel Wrapper */}
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {/* Slides */}
          {slides.map((slide, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <img
                src={slide}
                alt={`Slide ${index + 1}`}
                className="w-full h-[250px] md:h-[400px] lg:h-[500px]"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 p-1 md:p-2 rounded-full bg-gray-700 bg-opacity-50"
        >
          <img className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" src={leftArrow} alt="Left Arrow" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 p-1 md:p-2 rounded-full bg-gray-700 bg-opacity-50"
        >
          <img className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10" src={rightArrow} alt="Right Arrow" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-1 md:space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
                currentIndex === index ? "bg-white" : "bg-gray-500"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
