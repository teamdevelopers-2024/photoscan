import React, { useState, useEffect, useRef } from 'react';
import img1 from '../../assets/images/0200de8f618428ba742174e1f740749a.png';
import img2 from '../../assets/images/1037674.jpg';
import img3 from '../../assets/images/bmw_car_sports_139454_3840x2160.jpg';
import img4 from '../../assets/images/bmw-f82-dark-side-car-digital-art_1569189343.jpg';
import leftArrow from '../../assets/images/left-arrow.png';
import rightArrow from '../../assets/images/right-arrow.png';

export default function CarouselHome() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  const slides = [img1, img2, img3, img4];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!carouselRef.current.matches(':hover, :focus')) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  return (
    <div
      ref={carouselRef}
      className="relative w-full overflow-hidden"
    >
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
              className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 text-white p-1 sm:p-2 rounded-full"
      >
        <img className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" src={leftArrow} alt="Left Arrow" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 text-white p-1 sm:p-2 rounded-full"
      >
        <img className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" src={rightArrow} alt="Right Arrow" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-2 md:bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white scale-110' : 'bg-gray-500'
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}
