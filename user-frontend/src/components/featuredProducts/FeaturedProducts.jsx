
import React, { useEffect } from "react";
import "./FeaturedProducts.css";
import Slider from "react-slick";
import img1 from "../../../../admin-frontend/src/assets/images/img1.jpg";
import img2 from "../../../../admin-frontend/src/assets/images/img2.jpg";
import img3 from "../../../../admin-frontend/src/assets/images/img3.jpg";
import img4 from "../../../../admin-frontend/src/assets/images/img4.jpg";
import './FeaturedProducts.css'

// Import Slick Carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import AOS
import AOS from "aos";
import "aos/dist/aos.css";

export default function FeaturedProducts() {
  useEffect(() => {
    AOS.init({
      duration: 700, 
      easing: "ease-in",
      offset: 100, 
      delay:100,
    });
  }, []);

  const settings = {
    infinite: true,
    slidesToShow: 3, 
    slidesToScroll: 1,
    nextArrow: (
      <div data-aos="fade-left" data-aos-duration="500" className="">
        <button className="w-11 h-32 relative slick-next1">
          <div className="w-11 h-32 left-0 top-0 absolute border border-neutral-500/60" />
          <div className="w-3.5 h-28 left-[13.76px] top-[10.04px] absolute text-center text-neutral-500/50 text-xl font-semibold font-['Inter']">
            n<br />e<br />x<br />t
          </div>
        </button>
      </div>
    ),
    prevArrow: (
      <div data-aos="fade-right" data-aos-duration="500" className="">
      <button className="w-11 h-32 relative slick-prev1">
        <div className="w-11 h-32 left-0 top-0 absolute border border-neutral-500/60" />
        <div className="w-3.5 h-28 left-[13.76px] top-[10.04px] absolute text-center text-neutral-500/50 text-xl font-semibold font-['Inter']">
          p<br />r<br />e<br />v
        </div>
      </button>
    </div>
    ),
    responsive: [
      {
        breakpoint: 1424, // For tablets and below
        settings: {
          slidesToShow: 3, // Show 3 slides on tablets
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 768, // For mobile devices
        settings: {
          slidesToShow: 2, // Show 2 slides on mobile
          slidesToScroll: 1,
          arrows: false, // Disable arrows on mobile devices
        },
      },
      {
        breakpoint: 480, // For small mobile devices
        settings: {
          slidesToShow: 1, // Show 1 slide on smaller mobile
          slidesToScroll: 1,
          arrows: false, // Disable arrows on smaller mobile devices
        },
      },
    ],
  };

  const products = [
    { id: 1, name: "Product 1", price: "₹2,499", image: img1, aosDelay: "0" },
    { id: 2, name: "Product 2", price: "₹2,499", image: img2, aosDelay: "200"},
    { id: 3, name: "Product 3", price: "₹2,499", image: img3, aosDelay: "400"},
    { id: 4, name: "Product 4", price: "₹2,499", image: img4, aosDelay: "600"},
  ];

  return (
    <div className="w-full h-auto bg-[#f6f6f6] relative">
      <div className="w-full max-w-screen-xl mx-auto relative py-8 px-4 flex flex-col items-center">
        {/* Header */}
        <div className="w-56 h-14 flex flex-col justify-center items-center">
          <div className="text-zinc-600 text-2xl font-semibold font-['Lato'] text-center leading-relaxed">
            Featured Products
          </div>
          <div className="w-20 h-px bg-black mt-2" />
        </div>

        {/* Products Carousel */}
        <div className="w-full mt-4">
          <Slider {...settings}>
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
        </div>
      </div>
    </div>
  );
}
