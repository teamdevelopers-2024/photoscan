import { useEffect, useState } from "react";
import mainimg from "../../assets/main img.png";
import cart from "../../assets/cart.png";
import favourite from "../../assets/favourite.png";
import share from "../../assets/share.png";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../services/api";
import Loader from "../../components/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { FaCartPlus } from "react-icons/fa";

function SingleProduct() {
  const [isScrollable, setIsScrollable] = useState(false);
  const [state, setState] = useState({
    quantity: "",
    currentImage: "",
    fileName: "No file chosen",
    product: "",
    selectedFiles: [],
    isLogo: false,
    inputFields: [], // Array to hold dynamic input fields
    imageCount: 0,
    previewModalOpen: false,
    sizes: []
  });
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [textInputError, setTextInputError] = useState("");
  const [imageState, setImageState] = useState(false);

  const handleTextChange = (e) =>
    setState((prevState) => ({ ...prevState, textInput: e.target.value }));

  const handleFileChange = (e) => {
    const files = e.target.files;

    if (files.length !== state.imageCount) {
      alert(`Please select exactly ${state.imageCount} images.`);
      e.target.value = "";
      setState((prevState) => ({
        ...prevState,
        fileName: "No file chosen",
        selectedFiles: [],
        previewModalOpen: false
      }));
      setImageState(false);
    } else {
      const fileNames = Array.from(files).map(file => file.name);
      setState((prevState) => ({
        ...prevState,
        fileName: fileNames.join(", "),
        selectedFiles: files,
        previewModalOpen: true
      }));
      setImageState(true);
    }
  };



  const handleReplaceImage = (index) => (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedFiles = Array.from(state.selectedFiles);
      updatedFiles[index] = newFile; // Replace the selected file at the specified index
      setState((prevState) => ({
        ...prevState,
        selectedFiles: updatedFiles,
      }));
    }
  };


  useEffect(() => {
    // Add or remove Tailwind's overflow-hidden class on <body> based on scroll state
    if (isScrollable) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isScrollable]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    setLoading(true);
    const fetchItem = async () => {
      const result = await api.getSingleProduct(id);
      if (!result.error) {
        const { textfeild, includelogo, imageCount, sizes } = result.data;
        const inputFields = Array.from({ length: textfeild }).map(
          (_, index) => ({ id: index + 1, value: "" })
        );
        console.log("sizes : ", sizes)
        setState((prevState) => ({
          ...prevState,
          product: result.data,
          inputFields,
          imageCount,
          sizes,
          isLogo: includelogo,
        }));
      } else {
        console.error("Error fetching product:", result.error);
      }
      setLoading(false);
    };

    fetchItem();
  }, [location.search]);

  const addToCart = async (id) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const validateInputFields = () => {
      return state.inputFields.every(field => field.value.trim() !== "");
    };

    if (state.inputFields.length && !validateInputFields()) {
      setTextInputError("Please fill in all required fields.");
      return;
    } else {
      setTextInputError("");
    }

    if (state.imageCount > 0 && !imageState) {
      alert("Please select the required images.");
      return;
    }

    const userId = user._id;
    const productId = id;
    const { textInput, selectedFiles } = state;
    let uploadedImageUrl = null;
    let publicId

    if (selectedFiles && selectedFiles.length) {
      try {
        setLoading(true)
        const formData = new FormData();
        Array.from(selectedFiles).forEach((file) => {
          formData.append("file", file);
        });
        formData.append("upload_preset", "cloud_name");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dpjzt7zwf/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
         publicId = data.public_id;
        if (response.ok) {
          uploadedImageUrl = data.secure_url;
        } else {
          console.error("Image upload failed:", data);
        }
      } catch (error) {
        console.error("Error adding image to Cloudinary:", error);
      }
    }

    const formData = {
      userId,
      productId,
      inputTexts : state.inputFields,
      image: uploadedImageUrl ? uploadedImageUrl : null,
      publicId:publicId
    };

    try {
      const response = await api.addToCart(formData);

      if (!response.error) {
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
    finally{
      setLoading(false)
    }
  };

  const handleInputChange = (event, index) => {
    const newInputFields = [...state.inputFields];
    newInputFields[index].value = event.target.value;
    setState((prevState) => ({ ...prevState, inputFields: newInputFields }));
  };
  return (
    <>
      {loading && <Loader />}
      <Header />
      <div className="min-h-screen">
        <main className="w-full justify-center p-4">
          <div className="flex justify-evenly relative w-full p-4">
            <div>
              {/* Product and Thumbnail Images */}
              <img
                className="mx-auto w-3/4 sm:w-96 sm:h-96 rounded-lg"
                src={
                  state.product
                    ? state.product.images[0]
                    : state.currentImage
                }
                alt="Product"
              />
              <div className="flex justify-center mt-10 space-x-2 sm:space-x-4">
                {state.product &&
                  state.product.images.map((pic, idx) => (
                    <img
                      key={idx}
                      className="w-20 h-16 sm:w-30 sm:h-30 rounded-lg shadow cursor-pointer"
                      src={pic}
                      alt={`Thumbnail ${idx + 1}`}
                      onClick={() =>
                        setState((prevState) => ({
                          ...prevState,
                          currentImage: pic,
                        }))
                      }
                    />
                  ))}
              </div>
            </div>

            <div>
              {/* Product Details */}
              <div className="mt-8 sm:mt-16 space-y-4 text-center sm:text-left">
                <div className="text-black font-['Sans Serif Collection'] text-base">
                  {state.product ? state.product.productName : "Product Name"}
                </div>
                <div className="text-red-400 font-bold font-['Lato'] text-lg">
                  {state.product
                    ? `₹ ${state.product.offerPrice.toFixed(2)}`
                    : "$56.20"}
                </div>
                <div className="text-stone-500 text-xs font-['Lato']">
                  Actual Price:{" "}
                  {state.product
                    ? `₹ ${state.product.actualPrice.toFixed(2)}`
                    : "$60.00"}
                </div>
                <div className="text-xs font-['Lato']">
                  <span className="text-stone-500">Availability: </span>
                  <span className="text-lime-600">
                    {state.product && state.product.status
                      ? "In Stock"
                      : "Out of Stock"}
                  </span>
                </div>
                <div className="text-stone-500 text-xs font-['Lato'] leading-5">
                  {state.product
                    ? state.product.description
                    : "There are many variations of passages of Lorem Ipsum available, but the majority have been altered in some form..."}
                </div>
                <div className="text-stone-500 text-xs font-['Lato']">
                  Category: {state.product ? state.product.category : "N/A"}
                </div>
              </div>

              {state.inputFields.map((field, index) => (
                <div key={field.id} className="mt-2 mb-4 text-sm">
                  <label htmlFor={`inputField${index + 1}`}>
                    Text Field {index + 1}:
                  </label>
                  <input
                    type="text"
                    id={`inputField${index + 1}`}
                    placeholder="Enter Your Text"
                    value={field.value}
                    className="mt-2"
                    onChange={(e) => handleInputChange(e, index)}
                    required={state.product.textfieldRequired} // Add required attribute if necessary
                  />
                </div>
              ))}
              {textInputError && <p className="text-red-500">{textInputError}</p>}
              {state.sizes.length > 0 && (
                <>
                <div className="flex gap-3">

                  <label htmlFor="size-dropdown" className="mt-3">Select Display Size:</label>
                  <select id="size-dropdown">
                    {state.sizes.map((size, index) => (
                      <option key={index} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                    </div>
                </>
              )}



              <div className="w-full flex gap-10 justify-between">
                <button
                  onClick={() => addToCart(state.product._id)}
                  className="mt-4 max-h-14 flex items-center justify-center sm:justify-start space-x-2 w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[rgb(211,184,130)] hover:bg-[rgb(188,157,124)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(188,157,124)]"
                >
                  <div className="flex items-center gap-2 p-2  rounded-lg w-32 h-10 cursor-pointertransition-colors duration-200">
                    <p className="text-sm font-semibold w-full">Add to cart</p>
                    <FaCartPlus className="w-5 h-5" />
                  </div>

                </button>

                <div className="flex gap-4 h-14">
                  {/* Icons Section */}
                  <div className="mt-4 flex justify-center sm:justify-start space-x-3 bg-zinc-300 p-2 rounded-lg">
                    <img className="w-5 h-5" src={share} alt="Share" />
                    <span className="text-zinc-500 text-xl font-['Lato']">
                      |
                    </span>
                    <img className="w-6 h-6" src={favourite} alt="Favourite" />
                  </div>
                </div>
              </div>

              {/* Dynamic Input Fields */}
              {state.imageCount > 0 && (
                <div className="mt-4">
                  <label htmlFor="logo">Images:</label>
                  <input
                    type="file"
                    id="images"
                    name="images"
                    onChange={handleFileChange}
                    required
                    multiple // Allows selection of multiple files
                    accept="image/*" // Restricts to image files only
                  />
                  <small>Select exactly {state.imageCount} images</small>
                </div>
              )}

              {/* {state.isLogo && (
                <div className="mt-4">
                  <label htmlFor="logo">Logo:</label>
                  <input
                    type="file"
                    id="logo"
                    name="logo"
                    onChange={handleFileChange}
                    required
                    multiple // Allows selection of multiple files
                  />
                  <small>Select exactly {state.imageCount} images</small>
                </div>
              )} */}


            </div>
            {state.previewModalOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                style={{ zIndex: 1000 }}
              >
                <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
                  <button

                    className="absolute top-2 right-2 text-white w-16 h-7 rounded-lg bg-blue-600 hover:text-gray-500"
                    onClick={() =>
                      setState((prev) => ({
                        ...prev,        // Keep all other state properties the same
                        previewModalOpen: false,  // Set previewModal to false
                      }))
                    }
                  >
                    Done
                  </button>
                  <h2 className="text-xl font-semibold mb-4">
                    Selected Images ({state.selectedFiles.length}/{state.imageCount})
                  </h2>
                  <ul
                    className="space-y-4 overflow-y-scroll max-h-96"
                    onMouseEnter={() => setIsScrollable(true)}
                    onMouseLeave={() => setIsScrollable(false)}
                  >
                    {Array.from(state.selectedFiles).map((file, index) => (
                      <li key={index} className="flex items-center space-x-4">
                        {/* Display the image preview */}
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Selected ${index + 1}`}
                          className="w-20 h-20 object-cover rounded border"
                        />
                        <span>{file.name}</span>
                        <input
                          type="file"
                          onChange={handleReplaceImage(index)} // Handle replacement
                          className="ml-auto text-sm"
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </main >
        <Footer />
      </div >
    </>
  );
}

export default SingleProduct;