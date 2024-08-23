import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

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
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We are committed to providing you with the best fashion news and trends. Our team of experts is dedicated to curating the most relevant and exciting content to keep you updated with the latest styles, tips, and insights from the world of fashion. Stay tuned for regular updates and articles that will help you stay ahead of the curve.
          </p>
        </div>
        <div
          data-aos="fade-up"
          className="md:w-1/2"
        >
          <img
            src="https://i.postimg.cc/9MXPK7RT/news2.jpg"
            alt="About Us"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  );
}
