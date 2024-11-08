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
  });

  const location = useLocation();

  const handleTextChange = (e) =>
    setState((prevState) => ({ ...prevState, textInput: e.target.value }));

  const incrementQuantity = () =>
    setState((prevState) => ({ ...prevState, quantity: prevState.quantity + 1 }));

  const decrementQuantity = () =>
    setState((prevState) => ({
      ...prevState,
      quantity: Math.max(prevState.quantity - 1, 1),
    }));

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setState((prevState) => ({
      ...prevState,
      fileName: file ? file.name : "No file chosen",
    }));
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get("id");
    console.log(id);

    const fetchItem = async () => {
      const result = await api.getSingleProduct(id);
      if (!result.error) {
        setState((prevState) => ({ ...prevState, product: result.data }));
      }
    };

    fetchItem();
  }, [location.search]);

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
                src={state.product ? state.product.images[0] : state.currentImage}
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
                      onClick={() => setState((prevState) => ({ ...prevState, currentImage: pic }))}
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
                  {state.product ? `₹ ${state.product.offerPrice.toFixed(2)}` : "$56.20"}
                </div>
                <div className="text-stone-500 text-xs font-['Lato']">
                  Actual Price: {state.product ? `₹ ${state.product.actualPrice.toFixed(2)}` : "$60.00"}
                </div>
                <div className="text-xs font-['Lato']">
                  <span className="text-stone-500">Availability: </span>
                  <span className="text-lime-600">
                    {state.product && state.product.status ? "In Stock" : "Out of Stock"}
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

              <div className="flex gap-10 justify-between">
                {/* Quantity Selector */}
                <div className="mt-4 flex items-center justify-center sm:justify-start space-x-2 bg-zinc-300 p-1 rounded-lg">
                  <button onClick={decrementQuantity} className="px-2">
                    -
                  </button>
                  <span className="text-zinc-500 text-xl font-['Lato']">|</span>
                  <span className="text-center w-8 text-zinc-500 text-xl font-['Lato']">
                    {state.quantity}
                  </span>
                  <span className="text-zinc-500 text-xl font-['Lato']">|</span>
                  <button onClick={incrementQuantity} className="px-2">
                    +
                  </button>
                </div>

                <div className="flex gap-4">
                  {/* Icons Section */}
                  <div className="mt-4 flex justify-center sm:justify-start space-x-3 bg-zinc-300 p-2 rounded-lg">
                    <img className="w-5 h-5" src={cart} alt="Cart" />
                    <span className="text-zinc-500 text-xl font-['Lato']">|</span>
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
