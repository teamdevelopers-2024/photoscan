import React, { useEffect, useState } from "react";
import "./FeaturedProducts.css";
import Slider from "react-slick";
import api from "../../services/api"; // Ensure your api import is correct

// Import Slick Carousel CSS
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Import AOS
import AOS from "aos";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    AOS.init({ duration: 700, easing: "ease-in", offset: 100, delay: 100 });
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await api.getFeaturedProducts();
      console.log(response);

      console.log(response.featuredProducts);
      setProducts(response.featuredProducts);
    } catch (error) {
      console.error("Error fetching featured products:", error);
    }
  };

  const hanldeProductClick = (id) => {
    navigate(`/singleProduct?id=${id}`);
  };

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: (
      <div data-aos="fade-left" data-aos-duration="500">
        <button className="w-11 h-32 relative slick-next1">
          <div className="w-11 h-32 left-0 top-0 absolute border border-neutral-500/60" />
          <div className="w-3.5 h-28 left-[13.76px] top-[10.04px] absolute text-center text-neutral-500/50 text-xl font-semibold font-['Inter']">
            n<br />e<br />x<br />t
          </div>
        </button>
      </div>
    ),
    prevArrow: (
      <div data-aos="fade-right" data-aos-duration="500">
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
        breakpoint: 1424,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="w-full h-auto bg-[#f6f6f6] relative">
      <div className="w-full max-w-screen-xl mx-auto relative py-8 px-4 flex flex-col items-center">
        <div className="w-56 h-14 flex flex-col justify-center items-center">
          <div className="text-zinc-600 text-2xl font-semibold font-['Lato'] text-center leading-relaxed">
            Featured Products
          </div>
          <div className="w-20 h-px bg-black mt-2" />
        </div>

        <div className="w-full mt-4">
          <Slider {...settings}>
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  onClick={() => hanldeProductClick(product._id)}
                  data-aos="fade-up"
                  data-aos-delay={product.aosDelay}
                  key={product._id}
                  className="relative w-[250px] h-[312px] p-2"
                >
                  <img
                    className="w-full h-[250px] object-cover"
                    src={product.images[0]}
                    alt={product.productName}
                  />
                  <div className="absolute bottom-0 left-0 p-2">
                    <div className="text-[#5d5565] text-base font-semibold font-['Inter']">
                      {product.productName}
                    </div>
                    <div className="text-[#bd7f37] text-base font-semibold font-['Inter']">
                      ₹{product.productPrice}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>Loading products...</div> // Optional loading state
            )}
          </Slider>
        </div>
      </div>
    </div>
  );
}
