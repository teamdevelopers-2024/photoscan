import React, { useEffect, useState } from "react";
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
import api from "../../services/api";
import Swal from "sweetalert2"; 

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
  const [loading,setLoading] =useState(false)
  const user = useSelector((state) => state.user.user);

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
  }, [imageOrientation, imageCount]);

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


  const addToCart = async (id) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (uploadedImages.filter(img => img !== chooseimage).length !== imageCount) {
      alert(`Please upload ${imageCount} images before adding to cart.`);
      return;
    }

    const userId = user._id;
    const productId = id;
    const selectedFiles = uploadedImages.filter(img => img !== chooseimage)
    let uploadedCustomImages = []

    if (selectedFiles && selectedFiles.length) {
      try {
        setLoading(true)

        for (const file of selectedFiles) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("upload_preset", "cloud_name");

          try {
            const response = await fetch(
              "https://api.cloudinary.com/v1_1/dpjzt7zwf/image/upload",
              {
                method: "POST",
                body: formData,
              }
            );

            const data = await response.json();

            if (response.ok) {
              const imageDetails = {
                publicId: data.public_id,
                secureUrl: data.secure_url
              };
              uploadedCustomImages.push(imageDetails); // Store each image's details
            } else {
              console.error("Image upload failed for one file:", data);
            }
          } catch (error) {
            console.error("Error during upload:", error);
          }
        }

        console.log("All uploaded images:", uploadedCustomImages);
      } catch (error) {
        console.error("Error adding image to Cloudinary:", error);
      }
      finally{
        setLoading(false)
      }
    }

    const formData = {
      selectedFrame:frameColor,
      userId,
      images: uploadedCustomImages,
      orientation:imageOrientation
    };
    console.log("this is formdata : ", formData)

    try {
      const response = await api.addToCart(formData);

      if (!response.error) {
        console.log("item added to cart : ",response)
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Item added to cart successfully!",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      } else {
        console.log("failed to add",response)
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "Failed to add item to cart.",
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An unexpected error occurred. Please try again.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    }
    finally {
      setLoading(false)
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
                    <div className="w-full flex gap-10 justify-between">
                      <button
                        onClick={() => addToCart()}
                        className="mt-4 max-h-14 flex items-center justify-center sm:justify-start space-x-2 w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[rgb(211,184,130)] hover:bg-[rgb(188,157,124)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(188,157,124)]"
                      >
                        <div className="flex items-center gap-2 p-2  rounded-lg w-32 h-10 cursor-pointertransition-colors duration-200">
                          <p className="text-sm font-semibold w-full">Add to cart</p>
                          <FaCartPlus className="w-5 h-5" />
                        </div>

                      </button>

                      <div className="flex gap-4 h-14">
                        <div className="mt-4 flex justify-center sm:justify-start space-x-3 bg-zinc-300 p-2 rounded-lg">
                          {/* <img className="w-5 h-5" src={share} alt="Share" /> */}
                          <span className="text-zinc-500 text-xl font-['Lato']">
                            |
                          </span>
                          {/* <img className="w-6 h-6" src={favourite} alt="Favourite" /> */}
                        </div>
                      </div>
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
