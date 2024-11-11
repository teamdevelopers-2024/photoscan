import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import img1 from "../../assets/images/bannerimg1.jpg";
import img2 from "../../assets/images/bannerimg2.jpg";
import img3 from "../../assets/images/bannerimg3.jpg";
import fullWidthImg from "../../assets/images/personalised.jpg"; // Replace with your full-width image
import { useNavigate } from "react-router-dom";

export default function OfferBanner() {
  const navigate = useNavigate()
  const slides = [
    {
      image: img1,
      title: "Frames",
      value: "FRAMES",
      description: "Discover stylish frames to enhance your home and display your favorite moments beautifully.",
    },
    {
      image: img2,
      title: "Mementos",
      value: "MEMENTOS",
      description: "Cherish special memories with our unique collection of personalized mementos.",
    },
    {
      image: img3,
      value: "GIFTS",
      title: "Gifts",
      description: "Find the perfect gift for your loved ones with our premium and thoughtful selection.",
    },
  ];


  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: "ease-in",
      offset: 100,
      delay: 300,
    });
  }, []);

  return (
    <div className="w-full flex flex-col items-center space-y-4 p-4">
      <div className="w-full flex flex-col md:flex-row justify-center items-center md:space-x-4 space-y-4 md:space-y-0">
        {slides.map((slide, index) => (
          <div
            key={index}
            data-aos="fade-up"
            className="w-full md:w-1/3 h-[250px] md:h-[400px] lg:h-[500px] rounded-md shadow-lg relative flex items-center justify-center text-center overflow-hidden"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay with unique text */}
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center p-4">
              <h2 className="text-white text-xl md:text-2xl font-semibold mb-2">{slide.title}</h2>
              <p className="text-white text-sm md:text-base mb-4">{slide.description}</p>
              <button onClick={() => navigate(`/products?catName=${slide.value}`)} className="px-4 py-2 md:px-6 md:py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-full transition-transform transform hover:scale-105 shadow-lg">
                Explore
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Full-width background image section with text and button */}
      <div
        className="w-full h-[300px] md:h-[400px] lg:h-[200px] rounded-md shadow-lg relative flex items-center justify-center text-center overflow-hidden"
        data-aos="fade-up"
        style={{
          backgroundImage: `url(${fullWidthImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay for text and button */}
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center p-4">
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-2">Customized Just for You</h2>
          <p className="text-white text-base md:text-lg mb-4">Personalize your space with our exclusive customization options tailored to your style!</p>

          <button onClick={()=> navigate("/customise")} className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-full transition-transform transform hover:scale-105 shadow-lg">
            Customize
          </button>
        </div>
      </div>
    </div>
  );
}
