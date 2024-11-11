import React, { useState, useEffect, useRef } from 'react';
import img1 from '../../assets/images/b_1.jpg';
import img2 from '../../assets/images/b_2.jpg';
import img3 from '../../assets/images/b_3.jpg';
import img4 from '../../assets/images/b_2.jpg';
import leftArrow from '../../assets/images/left-arrow.png';
import rightArrow from '../../assets/images/right-arrow.png';
import api from '../../services/api';
import Loader from '../loader/Loader';

export default function CarouselHome() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const [slides , setSlides ] = useState([]);
  const [loading , setLoading ] = useState(false);

  useEffect(() => {
    const fetchBanners = async() => {
      try {
        setLoading(true);
        const response = await api.getBanners();
        if(!response.error) {
          setSlides(response.data);
        } else {
          console.log("Error Fetching Banners");
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // This effect handles auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]); // Re-run this effect only if the slides length changes

  const nextSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? slides.length - 1 : prevIndex - 1));
  };

  return (
    <>
      {loading && <Loader />}
      <div ref={carouselRef} className="relative w-full overflow-hidden">
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
                className="w-full h-[200px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-fill"
              />
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <button
          data-aos="fade-left" data-aos-duration="500"
          onClick={prevSlide}
          className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 text-white p-1 sm:p-2 rounded-full"
        >
          <img className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" src={leftArrow} alt="Left Arrow" />
        </button>
        <button
          data-aos="fade-right" data-aos-duration="500"
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
              className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white scale-110' : 'bg-gray-500'}`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
}
