import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import Previews from "../Preview/Preview";
import blackBorder from "../../assets/frames/black-frame.png";
import oakBorder from "../../assets/frames/oak-frame.png";
import whiteBorder from "../../assets/frames/white-frame.png";
import threedblack from "../../assets/frames/black_frame.jpg";
import threedoak from "../../assets/frames/oak_frame.jpg";
import threedwhite from "../../assets/frames/white_frame.jpg";
import imgPtr from '../../assets/frames/oriantaion-portrait.jpg';
import imgLan from '../../assets/frames/oriantaion-lanscape.jpg';
import imgSqr from '../../assets/frames/oriantation-square.jpg';
import chooseimage from '../../assets/choose_image.png';

const Customize = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frameOrientation, setFrameOrientation] = useState("Landscape");
  const [imageOrientation, setImageOrientation] = useState(`${frameOrientation}-Landscape`);
  const [imageCount, setImageCount] = useState(2);
  const [paperType, setPaperType] = useState("matte");
  const [frameColor, setFrameColor] = useState("Black");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [selectedFrame, setSelectedFrame] = useState(blackBorder);
  const [uploadedImages, setUploadedImages] = useState(Array(4).fill(chooseimage));

  const borderlist = [blackBorder, oakBorder, whiteBorder];
  const images = [
    "https://placeimg.com/640/480/nature",
    "https://placeimg.com/640/480/tech",
    "https://placeimg.com/640/480/architecture",
    "https://placeimg.com/640/480/people",
  ];

  const frameOrientationImages = {
    Landscape: "https://placeimg.com/150/100/nature",
    Portrait: "https://placeimg.com/100/150/nature",
    Square: "https://placeimg.com/150/150/nature",
  };

  const frameColors = [
    { name: "Black", image: threedblack },
    { name: "Oak", image: threedoak },
    { name: "White", image: threedwhite },
  ];

  const imgOriantation = [imgLan, imgPtr, imgSqr];

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

    let frameWidth = 0;
    let frameHeight = 0;

    let baseWidth = 150;
    let baseHeight = 150;

    const isMediumScreen = window.innerWidth >= 768;
    
    if (isMediumScreen && frameOrientation !== "Landscape") {
      
      baseWidth = 200;
      baseHeight = 200;
    }
    if (imageCount === 1 || imageCount === 2 && frameOrientation === "Square") {
      baseHeight = 300
      baseWidth = 300
    }

    if (frameOrientation === "Landscape" && imageOrientation === "Landscape-Portrait") {
      frameWidth = baseWidth;
      frameHeight = baseHeight * 1.5;
    } else if (frameOrientation === "Landscape" && imageOrientation === "Landscape-Landscape") {
      frameWidth = baseWidth * 1.6;
      frameHeight = baseHeight * .9;

    } else if (frameOrientation === "Portrait" && imageOrientation === "Portrait-Portrait") {
      frameWidth = baseWidth * 0.9;
      frameHeight = baseHeight * 1.2;
    } else if (frameOrientation === "Portrait" && imageOrientation === "Portrait-Landscape") {
      frameWidth = baseWidth * 1.2;
      frameHeight = baseHeight * 0.8;
    } else {
      frameWidth = baseWidth;
      frameHeight = baseHeight;
    }

    return { widthF: `${frameWidth}px`, heightF: `${frameHeight}px` };
  };

  useEffect(() => {
    setImageOrientation(`${frameOrientation}-Landscape`);
    setImageCount(1);
  }, [frameOrientation]);

  useEffect(() => {
    setImageCount(imageCount)
    const { widthF, heightF } = getFrameDimensions();
    setWidth(widthF);
    setHeight(heightF);
    setImageOrientation(imageOrientation)
  }, [ imageOrientation, imageCount]);

  const getImageGridClass = () => {
    if (frameOrientation === "Square") {
      if (imageCount === 2) return "grid grid-cols-2 grid-rows-1";
      if (imageCount === 3) return "grid grid-cols-2 grid-rows-2";
      if (imageCount === 4) return "grid grid-rows-2 grid-cols-2";
    }
    if (frameOrientation === "Landscape") {
      return `grid grid-cols-${imageCount}`
    }
    return `grid grid-rows-${imageCount}`;
  };

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setUploadedImages((prev) => {
          const newImages = [...prev];
          newImages[index] = reader.result; // Set the uploaded image as the new state
          return newImages;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <div className="justify-evenly md:flex md:bg-gray-100">
        <div className="flex flex-col items-center justify-evenly">
          <div
            style={{ borderImage: `url(${selectedFrame}) 10 round` }}
            className="border-8 bg-white flex items-center justify-around drop-shadow-2xl shadow-gray-600 h-auto w-auto"
          >
            <div className={`${getImageGridClass()} pl-2 pb-2`}>
              {Array.from({ length: imageCount }, (_, index) => (
                <div
                  key={index}
                  className="border cursor-pointer border-gray-300 flex items-center justify-center mb-0 m-2 ml-0"
                  style={{
                    width: width,
                    height: height,
                    backgroundImage: `url(${uploadedImages[index]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  {/* Hidden input for image upload */}
                  <input
                    type="file"
                    accept="image/*"
                    id={`file-input-${index}`} // Unique id for each input
                    onChange={(event) => handleImageUpload(index, event)}
                    className="hidden"
                  />
                  <label htmlFor={`file-input-${index}`} className="w-full h-full flex items-center justify-center">
                    {/* Optional: Add a preview of the image */}
                    {uploadedImages[index] === chooseimage ? (
                      <span className="text-gray-500 cursor-pointer">Click to upload</span>
                    ) : null}
                  </label>
                </div>
              ))}

            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center relative">
          <div className="flex mt-10">
            <div className="w-auto bg-white shadow-lg rounded-lg p-6 flex flex-col items-center justify-center z-10">
              <div className="mt-8 space-y-8 w-full px-6 z-10 relative">
                <div>
                  <h2 className="text-xl font-bold mb-2">Frame Orientation</h2>
                  <div className="flex space-x-4">
                    {["Landscape", "Portrait", "Square"].map((orientation, index) => (
                      <div
                        key={orientation}
                        onClick={() => setFrameOrientation(orientation)}
                        className={`p-4 border rounded-lg cursor-pointer ${frameOrientation === orientation ? "border-blue-500 bg-blue-100" : "border-gray-300"
                          }`}
                      >
                        <img src={imgOriantation[index]} alt={orientation} className="w-20 h-20 object-contain" />
                        <div className="text-center mt-2">{orientation}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {frameOrientation !== "Square" &&
                  <div>
                    <h2 className="text-xl font-bold mb-2">Image Orientation</h2>
                    <div className="flex space-x-4">
                      {[`${frameOrientation}-Landscape`, `${frameOrientation}-Portrait`].map((orientation) => (
                        <div
                          key={orientation}
                          onClick={() => setImageOrientation(orientation)}
                          className={`p-4 border rounded-lg cursor-pointer ${imageOrientation === orientation ? "border-blue-500 bg-blue-100" : "border-gray-300"
                            }`}
                        >
                          <div className="text-center">{orientation}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                }
                <div>
                  <h2 className="text-xl font-bold mb-2">Image Count</h2>
                  <div className="flex space-x-4">
                    {Array.from({ length: 4 }, (_, count) => (
                      <div
                        key={count}
                        onClick={() => setImageCount(count + 1)}
                        className={`p-4 border rounded-lg cursor-pointer ${imageCount === count + 1 ? "border-blue-500 bg-blue-100" : "border-gray-300"
                          }`}
                      >
                        <div className="text-center">{count + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Paper Type</h2>
                  <div className="flex space-x-4">
                    {["matte", "glossy"].map((type) => (
                      <div
                        key={type}
                        onClick={() => handlePaperChange(type)}
                        className={`p-4 border rounded-lg cursor-pointer ${paperType === type ? "border-blue-500 bg-blue-100" : "border-gray-300"
                          }`}
                      >
                        <div className="text-center">{type}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold mb-2">Frame Color</h2>
                  <div className="flex space-x-4">
                    {frameColors.map((frame, index) => (
                      <div
                        key={frame.name}
                        onClick={() => {
                          handleFrameChange(frame.name)
                          setSelectedFrame(borderlist[index])
                        }}
                        className={`p-4 border rounded-lg cursor-pointer ${frameColor === frame.name ? "border-blue-500 bg-blue-100" : "border-gray-300"
                          }`}
                      >
                        <img src={frame.image} alt={frame.name} className="w-20 h-20 object-contain" />
                        <div className="text-center mt-2">{frame.name}</div>
                      </div>
                    ))}
                  </div>
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
