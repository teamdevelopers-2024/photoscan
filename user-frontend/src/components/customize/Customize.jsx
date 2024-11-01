import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Previews from "../Preview/Preview";
import blackBorder from "../../assets/frames/black-frame.png";
import oakBorder from "../../assets/frames/oak-frame.png";
import whiteBorder from "../../assets/frames/white-frame.png";

const Customize = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frameOrientation, setFrameOrientation] = useState("Landscape");
  const [imageOrientation, setImageOrientation] = useState(`${frameOrientation}-Landscape`);
  const [imageCount, setImageCount] = useState(2);
  const [paperType, setPaperType] = useState("matte");
  const [frameColor, setFrameColor] = useState("Black");
  const [width, setWidth] = useState(0); // State variable for width
  const [height, setHeight] = useState(0); // State variable for height

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
    { name: "Black", image: blackBorder },
    { name: "Oak", image: oakBorder },
    { name: "White", image: whiteBorder },
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

  const getFrameDimensions = () => {
    setImageCount(1)
    console.log("image oreintation ", frameOrientation)
    let frameWidth = 0;
    let frameHeight = 0;

    if (frameOrientation === "Landscape" && imageOrientation === "Landscape-Portrait") {
      // Landscape image dimensions
      const imageWidth = 150;
      const imageHeight = 225;

      frameWidth = imageWidth; // Remove margin
      frameHeight = imageHeight; // Remove margin
    }
    else if (frameOrientation === "Landscape" && imageOrientation === "Landscape-Landscape") {
      // Landscape image dimensions
      const imageWidth = 160;
      const imageHeight = 107;

      frameWidth = imageWidth; // Remove margin
      frameHeight = imageHeight; // Remove margin
    }
    else if (frameOrientation === "Portrait" && imageOrientation === "Portrait-Portrait") {
      // Portrait image dimensions
      const imageWidth = 140;
      const imageHeight = 180;

      frameWidth = imageWidth; // Remove margin
      frameHeight = imageHeight; // Remove margin
    }
    else if (frameOrientation === "Portrait" && imageOrientation === "Portrait-Landscape") {
      // Portrait image dimensions
      const imageWidth = 180;
      const imageHeight = 120;

      frameWidth = imageWidth; // Remove margin
      frameHeight = imageHeight; // Remove margin
    }
    else {
      const imageWidth = 100;
      const imageHeight = 100;
      frameWidth = imageWidth;
      frameHeight = imageHeight;
    }


    return { widthF: `${frameWidth}px`, heightF: `${frameHeight}px` };
  };

  useEffect(() => {
    setImageOrientation(`${frameOrientation}-Landscape`)
    setImageCount(1)
  }, [frameOrientation])

  useEffect(() => {
    const { widthF, heightF } = getFrameDimensions();
    setWidth(widthF)
    setHeight(heightF)

  }, [frameOrientation, imageOrientation])

  const getImageGridClass = () => {
    if (frameOrientation === "Square") {
      if (imageCount === 2) return "grid-cols-2 grid-rows-1";
      if (imageCount === 3) return "grid-cols-2 grid-rows-2";
      if (imageCount === 4) return "grid-rows-2 grid-cols-2";
      // Additional configurations for higher counts
    }
    return "flex flex-col"; // Default for non-square layouts
  };

  console.log("height : ", width, height)

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="flex md:flex bg-gray-100 ">
        {/* Left side: Photo frame */}
        <div className="flex flex-col items-center justify-evenly">
          <div
            style={{ borderImage: `url(${oakBorder})10 round`, }}
            className="border-8 bg-white flex items-center justify-around h-auto w-auto"
          >
            <div className={` grid ${getImageGridClass()} pl-2 pb-2`}>
              {Array.from({ length: imageCount }, (_, index) => (
                <div
                  key={index}
                  style={{ width: width, height: height }}
                  className={`border border-gray-300 flex items-center justify-center bg-black mb-0 m-2 ml-0`}
                >
                  {/* <img
                    src={images[(currentIndex + index) % images.length]}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                  /> */}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center w-full">
            <Previews />
          </div>
        </div>

        {/* Right side: Carousel with layer underneath */}
        <div className=" flex flex-col items-center justify-center relative">
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

              {/* Frame Orientation Controls */}
              <div className="mt-8 space-y-8 w-full px-6 z-10 relative">
                {/* Frame Orientation Selection */}
                <div>
                  <h2 className="text-xl font-bold mb-2">Frame Orientation</h2>
                  <div className="flex space-x-4">
                    {["Landscape", "Portrait", "Square"].map((orientation) => (
                      <div
                        key={orientation}
                        onClick={() => setFrameOrientation(orientation)}
                        className={`p-4 border rounded-lg cursor-pointer ${frameOrientation === orientation
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
                <div>
                  <h2 className="text-xl font-bold mb-2">Image Orientation</h2>
                  <div className="flex space-x-4">
                    {[`${frameOrientation}-Landscape`, `${frameOrientation}-Portrait`].map((orientation) => (
                      <div key={orientation} onClick={() => setImageOrientation(orientation)}
                        className={`p-4 border rounded-lg cursor-pointer ${imageOrientation === orientation ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}>
                        <div className="text-center">{orientation}</div>
                      </div>
                    ))}
                  </div>
                </div>


                <div>
                  <h2 className="text-xl font-bold mb-2">Image Count</h2>
                  <div className="flex space-x-4">
                    {[1, 2, 3, 4].map((count) => (
                      <div key={count} onClick={() => setImageCount(count)}
                        className={`p-4 border rounded-lg cursor-pointer ${imageCount === count ? "border-blue-500 bg-blue-100" : "border-gray-300"}`}>
                        <div className="text-center">{count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Product Details Section */}
              <div className="product-details mt-8 flex flex-col gap-5">
                <div className="paper-type flex justify-between mt-4 gap-5">
                  <button
                    className={`bg-black text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400 ${paperType === "matte"
                      ? "bg-gray-800 text-white"
                      : "bg-white"
                      }`}
                    onClick={() => handlePaperChange("matte")}
                  >
                    MATTE
                  </button>
                  <button
                    className={`bg-black text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-400 ${paperType === "glossy"
                      ? "bg-gray-800 text-white"
                      : "bg-white"
                      }`}
                    onClick={() => handlePaperChange("glossy")}
                  >
                    GLOSSY
                  </button>
                </div>
                <div className="frame-color flex justify-between mt-4 gap-5">
                  {frameColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => handleFrameChange(color.name)}
                      className={`flex items-center justify-center w-24 h-24 rounded-full border-2 border-gray-300 ${frameColor === color.name ? "ring-2 ring-blue-500" : ""
                        }`}
                      style={{ backgroundColor: color.backgroundColor }}
                    >
                      {frameColor === color.name && (
                        <span className="text-white font-bold">Selected</span>
                      )}
                    </button>
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
