import React, { useState } from "react";
import Header from "../Header/Header";

const Customize = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frameOrientation, setFrameOrientation] = useState("Landscape");
  const [imageOrientation, setImageOrientation] =
    useState("Landscape-Portrait");
  const [imageCount, setImageCount] = useState(2);
  const [paperType, setPaperType] = useState("matte");
  const [frameColor, setFrameColor] = useState("black");

  // Dummy images for the carousel
  const images = [
    "https://placeimg.com/640/480/nature",
    "https://placeimg.com/640/480/tech",
    "https://placeimg.com/640/480/architecture",
    "https://placeimg.com/640/480/people",
  ];

  // Dummy images for frame orientations
  const frameOrientationImages = {
    Landscape: "https://placeimg.com/150/100/nature",
    Portrait: "https://placeimg.com/100/150/nature",
    Square: "https://placeimg.com/150/150/nature",
  };

  // Define the frame colors
  const frameColors = [
    { name: "black", image: "black-frame.png" },
    { name: "beige", image: "beige-frame.png" },
    { name: "white", image: "white-frame.png" },
  ];

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const handlePaperChange = (type) => {
    setPaperType(type);
  };

  const handleFrameChange = (color) => {
    setFrameColor(color);
  };

  // Function to get the frame dimensions based on the selected orientation
  const getFrameDimensions = () => {
    switch (imageCount) {
      case 1:
        return { width: "64", height: "72" }; // Dimensions for 1 image
      case 2:
        return { width: "128", height: "72" }; // Dimensions for 2 images side by side
      case 3:
        return { width: "192", height: "72" }; // Dimensions for 3 images
      case 4:
        return { width: "256", height: "72" }; // Dimensions for 4 images
      default:
        return { width: "64", height: "72" };
    }
  };

  const { width, height } = getFrameDimensions(frameOrientation);

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="flex min-h-screen bg-gray-100">
        {/* Left side: Photo frame */}
        <div className="flex-1 flex flex-col items-center mt-20">
          <div
            className={`border border-black w-${width} h-${height} p-2 bg-white flex flex-col items-center justify-around`}
          >
            <div className="flex space-x-1">
              {Array.from({ length: imageCount }, (_, index) => (
                <div key={index} className="w-full h-24 border border-gray-300">
                  <img
                    src={images[(currentIndex + index) % images.length]}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 p-4 border-dashed border-2 border-gray-400 w-64 h-32 flex items-center justify-center">
            Drag & Drop Photos Here
          </div>
        </div>

        {/* Right side: Carousel with layer underneath */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          <div className="flex mt-10">
            <div className="w-auto bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center z-10">
              <div className="w-full flex h-64 justify-evenly items-center">
                <button
                  onClick={goToPrevious}
                  className="h-12 transform -translate-y-1/2 p-2 text-xl bg-white bg-opacity-75 rounded-full shadow-md hover:bg-opacity-100"
                >
                  &lt;
                </button>
                <div className="relative flex items-center justify-center w-64 h-64 bg-white rounded-lg shadow-lg p-4">
                  {images.length > 0 ? (
                    <div className="relative flex items-center justify-center w-full h-full">
                      <img
                        src={images[currentIndex]}
                        alt={`Slide ${currentIndex}`}
                        className="w-3/4 h-auto object-contain"
                      />
                    </div>
                  ) : (
                    <p>No images to display</p>
                  )}
                </div>
                <button
                  onClick={goToNext}
                  className="h-12 transform -translate-y-1/2 p-2 text-xl bg-white bg-opacity-75 rounded-full shadow-md hover:bg-opacity-100"
                >
                  &gt;
                </button>
              </div>

              <div className="mt-8 space-y-8 w-full px-6 z-10 relative">
                {/* Frame Orientation */}
                <div>
                  <h2 className="text-xl font-bold mb-2">Frame Orientation</h2>
                  <div className="flex space-x-4">
                    {["Landscape", "Portrait", "Square"].map((orientation) => (
                      <div
                        key={orientation}
                        onClick={() => setFrameOrientation(orientation)}
                        className={`p-4 border rounded-lg cursor-pointer ${
                          frameOrientation === orientation
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-300"
                        }`}
                      >
                        <img
                          src={frameOrientationImages[orientation]}
                          alt={orientation}
                          className="w-full h-auto object-contain"
                        />
                        <div className="text-center mt-2">{orientation}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image Orientation */}
                <div>
                  <h2 className="text-xl font-bold mb-2">Image Orientation</h2>
                  <div className="flex space-x-4">
                    {["Landscape-Landscape", "Landscape-Portrait"].map(
                      (orientation) => (
                        <div
                          key={orientation}
                          onClick={() => setImageOrientation(orientation)}
                          className={`p-4 border rounded-lg cursor-pointer ${
                            imageOrientation === orientation
                              ? "border-blue-500 bg-blue-100"
                              : "border-gray-300"
                          }`}
                        >
                          <div className="text-center">{orientation}</div>
                        </div>
                      )
                    )}
                  </div>
                </div>

                {/* Image Count */}
                <div>
                  <h2 className="text-xl font-bold mb-2">Image Count</h2>
                  <div className="flex space-x-4">
                    {images.map((_, index) => (
                      <div
                        key={index}
                        onClick={() => setImageCount(index + 1)}
                        className={`p-4 border rounded-lg cursor-pointer ${
                          imageCount === index + 1
                            ? "border-blue-500 bg-blue-100"
                            : "border-gray-300"
                        }`}
                      >
                        <div className="text-center">{index + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="product-details mt-8 flex flex-col gap-5">
                <div className="paper-type flex justify-between mt-4 gap-5">
                  <button
                    className={`bg-black text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400 ${
                      paperType === "matte"
                        ? "bg-gray-800 text-white"
                        : "bg-white"
                    }`}
                    onClick={() => handlePaperChange("matte")}
                  >
                    MATTE
                  </button>
                  <button
                    className={`bg-black text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400  ${
                      paperType === "glossy"
                        ? "bg-gray-800 text-white"
                        : "bg-white "
                    }`}
                    onClick={() => handlePaperChange("glossy")}
                  >
                    GLOSSY
                  </button>
                </div>

                <div className="frame-color flex space-x-4 mt-4">
                  {frameColors.map(({ name, image }) => (
                    <div
                      key={name}
                      className={`frame-option flex-1 cursor-pointer ${
                        frameColor === name ? "bg-gray-200" : "bg-white"
                      } hover:bg-gray-100`}
                      onClick={() => handleFrameChange(name)}
                    >
                      <img
                        src={image}
                        alt={`${name} Frame`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ))}
                </div>

                <div className="product-info">
                  <p className="font-bold">Size</p>
                  <p>36.5cm x 28cm</p>
                </div>

                <div className="product-info">
                  <p className="font-bold">Price</p>
                  <p>AED 175</p>
                </div>

                <button className="w-full bg-black text-white font-bold py-2 px-4 rounded hover:bg-gray-800">
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customize;
