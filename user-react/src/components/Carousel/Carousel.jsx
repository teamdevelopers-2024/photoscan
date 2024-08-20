import React from "react";

function Carousel() {
  const handleNavigation = (e, targetSlide) => {
    e.preventDefault();
    const targetElement = document.querySelector(targetSlide);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="carousel w-full">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.webp"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button
            onClick={(e) => handleNavigation(e, "#slide4")}
            className="btn btn-circle"
          >
            ❮
          </button>
          <button
            onClick={(e) => handleNavigation(e, "#slide2")}
            className="btn btn-circle"
          >
            ❯
          </button>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.webp"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button
            onClick={(e) => handleNavigation(e, "#slide1")}
            className="btn btn-circle"
          >
            ❮
          </button>
          <button
            onClick={(e) => handleNavigation(e, "#slide3")}
            className="btn btn-circle"
          >
            ❯
          </button>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1414694762283-acccc27bca85.webp"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button
            onClick={(e) => handleNavigation(e, "#slide2")}
            className="btn btn-circle"
          >
            ❮
          </button>
          <button
            onClick={(e) => handleNavigation(e, "#slide4")}
            className="btn btn-circle"
          >
            ❯
          </button>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src="https://img.daisyui.com/images/stock/photo-1665553365602-b2fb8e5d1707.webp"
          className="w-full"
        />
        <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
          <button
            onClick={(e) => handleNavigation(e, "#slide3")}
            className="btn btn-circle"
          >
            ❮
          </button>
          <button
            onClick={(e) => handleNavigation(e, "#slide1")}
            className="btn btn-circle"
          >
            ❯
          </button>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
