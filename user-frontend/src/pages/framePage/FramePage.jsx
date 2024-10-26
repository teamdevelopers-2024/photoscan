import { useState } from "react";
import mainimg from "../../assets/main img.png";
import pic1 from "../../assets/slider pic 1.png";
import pic2 from "../../assets/slider pic 2.png";
import pic3 from "../../assets/slider pic 3.png";
import cart from "../../assets/cart.png";
import favourite from "../../assets/favourite.png";
import share from "../../assets/share.png";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";

function FramePage() {
  const [textInput, setTextInput] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(mainimg);

  const handleTextChange = (e) => setTextInput(e.target.value);
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <Header />

      <div className=" min-h-screen">
        <main className="w-full justify-center p-4">
          <div className="flex  justify-evenly relative w-full  p-4">
            <div>
              {/* Product and Thumbnail Images */}
              <img
                className="mx-auto w-3/4 sm:w-96 sm:h-96 rounded-lg"
                src={currentImage}
                alt="Product"
              />
              <div className="flex justify-center mt-4 space-x-2 sm:space-x-4">
                {[pic1, pic2, pic3].map((pic, idx) => (
                  <img
                    key={idx}
                    className="w-20 h-16 sm:w-36 sm:h-32 rounded-lg shadow cursor-pointer"
                    src={pic}
                    alt={`Thumbnail ${idx + 1}`}
                    onClick={() => setCurrentImage(pic)}
                  />
                ))}
              </div>
            </div>

            <div>
              {/* Product Details */}
              <div className="mt-8 sm:mt-16 space-y-4 text-center sm:text-left">
                <div className="text-black font-['Sans Serif Collection'] text-base">
                  Product Name
                </div>
                <div className="text-red-400 font-bold font-['Lato'] text-lg">
                  $ 56.20
                </div>
                <div className="text-xs font-['Lato']">
                  <span className="text-stone-500">Availability: </span>
                  <span className="text-lime-600">In Stock</span>
                </div>
                <div className="text-stone-500 text-xs font-['Lato'] leading-5">
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have been altered in some form...
                </div>
                <div className="text-stone-500 text-xs font-['Lato']">
                  27 Rating
                </div>
              </div>

              <div>
                <div className="flex justify-between">
                  {/* Quantity Selector */}
                  <div className="mt-4 flex items-center justify-center sm:justify-start space-x-2 bg-zinc-300 p-1 rounded-lg">
                    <button onClick={decrementQuantity} className="px-2">
                      -
                    </button>
                    <span className="text-zinc-500 text-xl font-['Lato']">
                      |
                    </span>
                    <span className="text-center w-8 text-zinc-500 text-xl font-['Lato']">
                      {quantity}
                    </span>
                    <span className="text-zinc-500 text-xl font-['Lato']">
                      |
                    </span>
                    <button onClick={incrementQuantity} className="px-2">
                      +
                    </button>
                  </div>

                  <div className="flex gap-4">
                    {/* Customize Button */}
                    <div className="mt-4 flex justify-center">
                      <button className="px-6 py-2 bg-zinc-300 text-zinc-500 rounded-md font-['Lato'] focus:outline-none">
                        Customize
                      </button>
                    </div>

                    {/* Icons Section */}
                    <div className="mt-4 flex justify-center sm:justify-start space-x-3 bg-zinc-300 p-2 rounded-lg">
                      <img className="w-5 h-5" src={cart} alt="Cart" />
                      <span className="text-zinc-500 text-xl font-['Lato']">
                        |
                      </span>
                      <img className="w-5 h-5" src={share} alt="Share" />
                      <span className="text-zinc-500 text-xl font-['Lato']">
                        |
                      </span>
                      <img
                        className="w-6 h-6"
                        src={favourite}
                        alt="Favourite"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-4 h-auto flex flex-col text-xs text-zinc-500 font-['Lato'] gap-4 sm:gap-4">
                  {/* Coupon Input */}
                  <div className="flex w-full sm:w-auto space-x-2 items-center">
                    <input
                      type="text"
                      placeholder="Enter coupon code"
                      className="text-xs text-zinc-500 font-['Lato'] border border-gray-300 rounded-md p-1 w-full sm:w-auto"
                    />
                    <button className="text-xs bg-zinc-300 text-zincc-500 px-2 py-1 rounded-md">
                      Check
                    </button>
                  </div>

                  {/* Pincode Input */}
                  <div className="flex w-full h-fit sm:w-auto space-x-2 items-center">
                    <input
                      type="text"
                      placeholder="Enter pincode"
                      className="text-xs text-zinc-500 font-['Lato'] border border-gray-300 rounded-md p-1 w-full sm:w-auto"
                    />
                    <button className="text-xs bg-zinc-300 text-zinc-500 px-2 py-1 rounded-md">
                      Check
                    </button>
                  </div>
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

export default FramePage;
