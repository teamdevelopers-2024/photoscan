import React, { useState } from "react";
import Header from "../Header/Header";

const Customize = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frameOrientation, setFrameOrientation] = useState("Landscape");
  const [imageOrientation, setImageOrientation] =
    useState("Landscape-Portrait");
  const [imageCount, setImageCount] = useState(2);

  // Dummy images for the carousel
  const images = [
    "https://placeimg.com/640/480/nature",
    "https://placeimg.com/640/480/tech",
    "https://placeimg.com/640/480/architecture",
    "https://placeimg.com/640/480/people",
  ];

  // Dummy images for frame orientations
  const frameOrientationImages = {
    Landscape: "https://placeimg.com/150/100/nature", // Landscape photo
    Portrait: "https://placeimg.com/100/150/nature", // Portrait photo
    Square: "https://placeimg.com/150/150/nature", // Square photo
  };

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

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="flex min-h-screen bg-gray-100">
        {/* Left side: Photo frame */}
        <div className="flex-1 flex flex-col items-center justify-center mt-20">
          {/* Reduced the size of the frame */}
          <div className="border border-black w-64 h-72 p-2 bg-white flex flex-col items-center justify-around">
            <div className="w-full h-24 border border-gray-300"></div>
            <div className="w-full h-24 border border-gray-300"></div>
            {/* Additional photo box */}
          </div>
          <div className="mt-4 p-4 border-dashed border-2 border-gray-400 w-64 h-32 flex items-center justify-center">
            Drag & Drop Photos Here
          </div>
        </div>

        {/* Right side: Carousel with layer underneath */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Layer underneath the carousel */}
          <div className="absolute top-0 left-0 w-full h-full bg-blue-50 z-0"></div>

          {/* Carousel */}
          <div className="w-auto h-120 bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center relative z-10">
           <div className="flex">
           <button
                  onClick={goToPrevious}
                  className="transform -translate-y-1/2 p-2 text-xl bg-white bg-opacity-75 rounded-full shadow-md hover:bg-opacity-100"
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
              <button
                  onClick={goToNext}
                  className="transform -translate-y-1/2 p-2 text-xl bg-white bg-opacity-75 rounded-full shadow-md hover:bg-opacity-100"
                  >
                  &gt;
                </button>
            </div>
              </div>

            {/* Buttons for carousel */}
            {images.length > 0 && (
              <>
                
              </>
            )}

            {/* Customization Options Below Carousel */}
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
                  {[2, 3, 4].map((count) => (
                    <div
                      key={count}
                      onClick={() => setImageCount(count)}
                      className={`p-4 border rounded-lg cursor-pointer ${
                        imageCount === count
                          ? "border-blue-500 bg-blue-100"
                          : "border-gray-300"
                      }`}
                    >
                      <div className="text-center">{count}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Customize;
