import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "../../../src/assets/aboutus/image1.png"

export default function AboutUsSection1() {
  useEffect(() => {
    AOS.init({
      duration: 800, // Duration of the animation
      easing: "ease-out", // Easing function
      offset: 100, // Distance from the viewport when animation triggers
    });
  }, []);
  return (
    <section id="about-us" className="py-12 bg-gray-100">
      <div className="container mx-auto flex flex-col md:flex-row items-center px-4">
        <div data-aos="fade-up" className="md:w-1/2 md:pr-8 mb-8 md:mb-0">
          <img
            src={img1}
            alt="About Us"
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div data-aos="fade-left" className="md:w-1/2 md:pl-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">About Us</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            We started our first PHOTOSCAN office in DEC 2002, the main services
            offered were photographic goods and photo framing services. We then
            expanded ourselves to photo design customization services also by
            adding additional space. in 2015 we ventured in to “Customized Photo
            Gifts” which is one of its kind in the region by offering wide
            selection of services and choice to the customer. In 2018 the
            diversified us to Trophies and mementos and further expanded to a
            bigger office in 2020. Now we are capable enough to cater for any
            customed solution in photography, trophies, gifts, and mementos.
          </p>
        </div>
      </div>
    </section>
  );
}
