import { useEffect, useState } from "react";
import mainimg from "../../assets/main img.png";
import cart from "../../assets/cart.png";
import favourite from "../../assets/favourite.png";
import share from "../../assets/share.png";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { useLocation } from "react-router-dom";
import api from "../../services/api";

function SingleProduct() {
  const [state, setState] = useState({
    textInput: "",
    quantity: 1,
    currentImage: mainimg,
    fileName: "No file chosen",
    product: null,
    selectedFile: null, // To hold the selected file
  });

  const location = useLocation();

  const handleTextChange = (e) =>
    setState((prevState) => ({ ...prevState, textInput: e.target.value }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setState((prevState) => ({
      ...prevState,
      fileName: file ? file.name : "No file chosen",
      selectedFile: file, // Store the selected file
    }));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");

    const fetchItem = async () => {
      const result = await api.getSingleProduct(id);
      if (!result.error) {
        setState((prevState) => ({ ...prevState, product: result.data }));
      } else {
        console.error("Error fetching product:", result.error);
      }
    };

    fetchItem();
  }, [location.search]);

  const addToCart = async (id) => {
    const parsedData = JSON.parse(localStorage.getItem("user")); // Change to your actual local storage key
    const userId = parsedData.user._id; // Extract user ID
    const productId = id;

    const { textInput, selectedFile } = state;

    // Create a form data object to send file and other information
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("productId", productId);
    formData.append("textInput", textInput);
    if (selectedFile) {
      formData.append("file", selectedFile); // Append the selected file
    }

    // Send the request to add the item to the cart
    try {
      const response = await api.addToCart(formData);
      if (response.success) {
        console.log("Item added to cart successfully!");
      } else {
        console.error("Failed to add item to cart:", response.message);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <main className="w-full justify-center p-4">
          <div className="flex justify-evenly relative w-full p-4">
            <div>
              {/* Product and Thumbnail Images */}
              <img
                className="mx-auto w-3/4 sm:w-96 sm:h-96 rounded-lg"
                src={
                  state.product ? state.product.images[0] : state.currentImage
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

              <div className="w-full flex gap-10 justify-between">
                <button
                  onClick={() => addToCart(state.product._id)} // Reference the function correctly
                  className="mt-4 flex items-center justify-center sm:justify-start space-x-2 w-1/2 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[rgb(211,184,130)] hover:bg-[rgb(188,157,124)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(188,157,124)]"
                >
                  Add to cart
                </button>

                <div className="flex gap-4">
                  {/* Icons Section */}
                  <div className="mt-4 flex justify-center sm:justify-start space-x-3 bg-zinc-300 p-2 rounded-lg">
                    <img className="w-5 h-5" src={share} alt="Share" />
                    <span className="text-zinc-500 text-xl font-['Lato']">|</span>
                    <img className="w-6 h-6" src={favourite} alt="Favourite" />
                  </div>
                </div>
              </div>

              {/* Input Sections */}
              <div className="mt-5 h-auto flex flex-col gap-4 text-xs text-zinc-500 font-['Lato']">
                <div className="w-full sm:w-auto">
                  <input
                    type="text"
                    value={state.textInput}
                    onChange={handleTextChange}
                    placeholder="Enter text"
                    className="text-xs text-zinc-500 font-['Lato'] border border-gray-300 rounded-md p-1 w-full sm:w-auto"
                  />
                </div>

                <div className="w-full sm:w-auto">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="text-xs text-zinc-500 font-['Lato']"
                    aria-label="Choose file"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}

export default SingleProduct;
