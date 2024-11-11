import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
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
import { FaCartPlus } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import api from "../../services/api";
import Swal from "sweetalert2";
import html2canvas from 'html2canvas'
import SizeDropdown from "./SizeDropdown";

const Customize = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [frameOrientation, setFrameOrientation] = useState("Landscape");
  const [imageOrientation, setImageOrientation] = useState(`${frameOrientation}-Landscape`);
  const [imageCount, setImageCount] = useState(1);
  const [paperType, setPaperType] = useState("matte");
  const [frameColor, setFrameColor] = useState("Black");
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [selectedFrame, setSelectedFrame] = useState(blackBorder);
  const [uploadedImages, setUploadedImages] = useState(Array(4).fill(chooseimage));
  const [loading, setLoading] = useState(false)
  const [sizeOfFrame, setSizeOfFrame] = useState(1)
  const [isCustomSize, setIsCustomSize] = useState(false)
  const [selectedSize, setSelectedSize] = useState()
  const [customWidth, setCustomWidth] = useState()
  const [customHeight, setCustomHeight] = useState()
  const [error,setError] = useState()
  const user = useSelector((state) => state.user.user);
  const divRef = useRef(null)
  const canvasREf = useRef(null)

  const borderlist = [blackBorder, oakBorder, whiteBorder];
  // const images = [
  //   "https://placeimg.com/640/480/nature",
  //   "https://placeimg.com/640/480/tech",
  //   "https://placeimg.com/640/480/architecture",
  //   "https://placeimg.com/640/480/people",
  // ];
  const frameColors = [
    { name: "Black", image: threedblack },
    { name: "Oak", image: threedoak },
    { name: "White", image: threedwhite },
  ];

  const imgOriantation = [imgLan, imgPtr, imgSqr];
  const sizes = [
    [
      "5x7",
      '6x4',
      '8x6',
      "10x8",
      "12x8",
      "12x10",
      "12x15",
      "12x18",
      "15x10",
      "15x12",
      "16x12",
      "18x12",
      "20x16",
      "24x16",
      "24x18",
      "24x20",
      "24x30",
      "24x36",
      "30x20",
    ],
    [
      "12x12",
      "16x16",
    ],
  ]

  // const goToPrevious = () => {
  //   const isFirstSlide = currentIndex === 0;
  //   const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
  //   setCurrentIndex(newIndex);
  // };

  // const goToNext = () => {
  //   const isLastSlide = currentIndex === images.length - 1;
  //   const newIndex = isLastSlide ? 0 : currentIndex + 1;
  //   setCurrentIndex(newIndex);
  // };

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
      frameWidth = baseWidth * 0.85;
      frameHeight = baseHeight * 1.2;
    } else if (frameOrientation === "Landscape" && imageOrientation === "Landscape-Landscape") {
      frameWidth = baseWidth * 1.1;
      frameHeight = baseHeight * .6;

    } else if (frameOrientation === "Portrait" && imageOrientation === "Portrait-Portrait") {
      frameWidth = baseWidth * 0.9;
      frameHeight = baseHeight * 1.2;
    } else if (frameOrientation === "Portrait" && imageOrientation === "Portrait-Landscape") {
      frameWidth = baseWidth * 1.2;
      frameHeight = baseHeight * 0.7;
    } else {
      frameWidth = baseWidth;
      frameHeight = baseHeight;
    }

    return { widthF: `${frameWidth}px`, heightF: `${frameHeight}px` };
  };

  useEffect(() => {
    setImageOrientation(`${frameOrientation}-Landscape`);
    setImageCount(1);
    if (frameOrientation === "Square") {
      setSizeOfFrame(1)
    }
    else {
      setSizeOfFrame(0)
    }

  }, [frameOrientation]);

  useEffect(() => {
    setImageCount(imageCount)
    const { widthF, heightF } = getFrameDimensions();
    setWidth(widthF);
    setHeight(heightF);
    console.log(sizes.Square, 'sizes')
    setImageOrientation(imageOrientation)
    getImageGridClass()
  }, [imageOrientation, imageCount]);

  const getImageGridClass = () => {
    console.log("imageCOunt :",)
    if (frameOrientation === "Square") {
      if (imageCount === 2) return "grid-cols-2 grid-rows-1";
      if (imageCount === 3) return "grid-cols-2 grid-rows-2";
      if (imageCount === 4) return "grid-rows-2 grid-cols-2";
    }
    if (frameOrientation === "Landscape") {
      return `grid-cols-${imageCount} `
    }
    return `grid-rows-${imageCount}`;
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


  const makeOrderOnWhatsapp = async () => {
    if (uploadedImages.filter(img => img !== chooseimage).length !== imageCount) {
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: `Please upload ${imageCount} images before making order`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
            // alert(`Please upload ${imageCount} images before adding to cart.`);
          return;
        }
      // Validate the fields
      if (!frameColor || !paperType || !selectedSize || isCustomSize && !customHeight || isCustomSize && !customWidth) {
        // setError("Both height and width must be provided.");
        // alert("Please make sure to select Frame Color, Paper Type, and Size before making the order.");

        Swal.fire({
          icon: "error",
          title: "Error!",
          text: "Both height and width must be provided.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        return;
      }

      if (divRef.current) {
        const canvas = await html2canvas(divRef.current);
        const imageUrl = canvas.toDataURL("image/png");

        // Create a temporary link to download the image
        const downloadLink = document.createElement("a");
        downloadLink.href = imageUrl;
        downloadLink.download = "customized-frame.png";
        downloadLink.click();

        // Show SweetAlert with a message and buttons for WhatsApp redirection
        const swalResult = await Swal.fire({
          title: 'Your frame is ready!',
          text: 'The image has been downloaded to your device. Please send it to us for reference on WhatsApp.',
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Go to WhatsApp',
          cancelButtonText: 'Cancel',
          timer: 5000, // automatically closes in 5 seconds
          timerProgressBar: true
        });

        console.log(swalResult, "this is swalresult")
        // If the user clicks the 'Go to WhatsApp' button, open WhatsApp with the message
        if (swalResult.isConfirmed || swalResult.isDismissed) {
          const orderDetails = `Frame Color: ${frameColor},%0APaper Type: ${paperType},%0ASize: ${selectedSize}`;

          window.open(`https://wa.me/+919037317210?text=I%20want%20to%20buy%20this%20customized%20frame.%0A${orderDetails}%0AHere%20is%20the%20image%20for%20reference.`, "_blank");
          // window.open(`https://wa.me/+919037317210?text=I%20want%20to%20buy%20this%20customized%20frame.%0AFrame%20Color%3A%20${frameColor}.%0APaper%20Type%3A%20${paperType}%0ASize%20%3A%20${selectedSize}%0AHere%20is%20the%20image%20for%20reference.`, "_blank");
        }
      }
    };

    return (
      <>
        <header>
          <Header />
        </header>
        <div className="justify-evenly md:flex md:bg-gray-100">
          <div ref={divRef} className="flex flex-col items-center justify-evenly">
            <div
              style={{ borderImage: `url(${selectedFrame}) 10 round` }}
              className="border-8 border- bg-white flex items-center justify-around drop-shadow-2xl shadow-gray-600 h-auto w-auto"
            >
              <div className={`grid ${getImageGridClass()}  pl-2 pb-2`}>
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
                  <div className="flex gap-3 items-center">
                    <label htmlFor="size-dropdown" className="mt-3">Select Size:</label>

                    {/* Conditionally render either the dropdown or custom size input fields */}
                    {isCustomSize ? (
                      <div className="flex items-center gap-2">
                        <div className="w-24">
                          <input
                            type="text"
                            value={customWidth}
                            inputMode="numeric"
                            pattern="[0-9]"
                            onKeyDown={(e) => {
                              // Prevent all non-numeric keys except for Backspace, Delete, Arrow keys, and Tab
                              if (
                                !/[0-9]/.test(e.key) && // Allow digits 0-9
                                e.key !== "Backspace" &&
                                e.key !== "Delete" &&
                                e.key !== "ArrowLeft" &&
                                e.key !== "ArrowRight" &&
                                e.key !== "Tab"
                              ) {
                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only numbers by using a regular expression
                              if (/^\d*$/.test(value) && (value === "" || parseInt(value) <= 99)) {
                                setCustomWidth(value);
                              }
                            }}
                            placeholder="Width (cm)"
                            className="border w-full rounded-md placeholder:text-[80%]" // Set width to 16
                          />
                        </div>
                        <span>x</span>
                        <div className="w-28">
                          <input
                            type="text"
                            value={customHeight}
                            inputMode="numeric"
                            pattern="[0-9]"
                            onKeyDown={(e) => {
                              // Prevent all non-numeric keys except for Backspace, Delete, Arrow keys, and Tab
                              if (
                                !/[0-9]/.test(e.key) && // Allow digits 0-9
                                e.key !== "Backspace" &&
                                e.key !== "Delete" &&
                                e.key !== "ArrowLeft" &&
                                e.key !== "ArrowRight" &&
                                e.key !== "Tab"
                              ) {
                                e.preventDefault();
                              }
                            }}
                            onChange={(e) => {
                              const value = e.target.value;
                              // Allow only numbers by using a regular expression
                              if (/^\d*$/.test(value) && (value === "" || parseInt(value) <= 99)) {
                                setCustomHeight(value);
                              }
                            }}
                            placeholder="Height (cm)"
                            className="border rounded-md w-full placeholder:text-[80%]"
                            />

                        </div>
                      </div>
                    ) : (
                      <SizeDropdown
                      selectedSize={selectedSize}
                      setSelectedSize={setSelectedSize}
                      sizeOfFrame={sizeOfFrame}
                      sizes={sizes}
                      />
                    )}

                    {/* Button to toggle between dropdown and custom size input fields */}
                    <button
                      onClick={() => setIsCustomSize(!isCustomSize)}
                      className="p-2 bg-blue-500 text-white rounded-md"
                      >
                      {isCustomSize ? "Standard Size" : "Custom Size"}
                    </button>
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

                    <div className="w-full flex justify-between">
                      <button
                        onClick={() => makeOrderOnWhatsapp()}
                        // onClick={()=>convertDivToCanvas()}
                        className="mt-4 max-h-14 flex items-center justify-center sm:justify-start py-2 px-6 border border-transparent rounded-md shadow-lg text-sm font-medium text-white bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600 transition-transform duration-300 ease-out transform hover:scale-105 hover:shadow-[0px_0px_15px_rgba(50,205,50,0.5)]"
                      >
                        <div className="flex items-center gap-2 p-2 rounded-lg cursor-pointer">
                          <FaWhatsapp className="w-5 h-5 animate-pulse" />
                          <p className="text-sm font-semibold">Make Order on WhatsApp</p>
                        </div>
                      </button>
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
