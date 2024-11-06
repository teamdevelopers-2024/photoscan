import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import img2 from "../../assets/aboutus/image2.png"

export default function AboutUsSection() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Duration of the animation
      easing: 'ease-out', // Easing function
      offset: 1000, // Distance from the viewport when animation triggers
      once: false,
    });
  }, []);

  return (
    <section id="about-us" className="py-12 bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        <div
          data-aos="fade-right"
          className="md:w-1/2 md:pr-8 mb-8 md:mb-0"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Vision</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
           We at PHOTOSCAN believes that customer is evrything and try to meet and exceed customer satisfaction.Our vision is to the leader in the personalized gifts,photo framing and momentos industry in the region with no compromise in quality and at the same time offering affordable prices.
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="md:w-1/2"
        >
          <img
            src={img2}
            alt="About Us"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
