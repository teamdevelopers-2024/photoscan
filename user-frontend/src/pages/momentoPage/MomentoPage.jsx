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

function MomentoPage() {
  const [textInput, setTextInput] = useState("");
  const [fileName, setFileName] = useState("No file chosen");
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(mainimg);

  const handleTextChange = (e) => setTextInput(e.target.value);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFileName(file ? file.name : "No file chosen");
  };
  const incrementQuantity = () => setQuantity((prev) => prev + 1);
  const decrementQuantity = () => setQuantity((prev) => Math.max(prev - 1, 1));

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex justify-center items-center">
        <div className="relative w-96 h-96 p-4">
          {/* Product and Thumbnail Images */}
          <img
            className="absolute left-16 top-16 w-96 h-96 rounded-lg"
            src={currentImage}
            alt="Product"
          />
          <div className="absolute top-[513px] left-[590px] flex space-x-4">
            {[pic1, pic2, pic3].map((pic, idx) => (
              <img
                key={idx}
                className="w-36 h-32 rounded-lg shadow cursor-pointer"
                src={pic}
                alt={`Thumbnail ${idx + 1}`}
                onClick={() => setCurrentImage(pic)}
              />
            ))}
          </div>

          {/* Product Details */}
          <div className="absolute top-16 left-[580px] w-96 h-48 space-y-4">
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
              There are many variations of passages of Lorem Ipsum available,
              but the majority have been altered in some form...
            </div>
            <div className="text-stone-500 text-xs font-['Lato']">
              27 Rating
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="absolute top-[276px] left-[659px] flex items-center w-32 h-7 bg-zinc-300 space-x-2 text-zinc-500 text-xl font-['Lato']">
            <button onClick={decrementQuantity} className="px-1">
              -
            </button>
            <span className="text-center w-8">{quantity}</span>
            <button onClick={incrementQuantity} className="px-1">
              +
            </button>
          </div>

          {/* Icons Section */}
          <div className="absolute top-[276px] left-[1069px] flex items-center space-x-2 w-28 h-7 bg-zinc-300">
            <img className="w-5 h-5" src={cart} alt="Icon" />
            <span className="text-zinc-500 text-xl font-['Lato']">|</span>
            <img className="w-5 h-5" src={share} alt="Icon" />
            <img className="w-6 h-6" src={favourite} alt="Icon" />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MomentoPage;
