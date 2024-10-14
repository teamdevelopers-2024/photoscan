import React, { useState } from "react";

import frmor1 from "../../assets/images/Group 43.png";
import frmor2 from "../../assets/images/Group 44.png";
import frmor3 from "../../assets/images/Group 47.png";

const FrameCustomization = () => {
  const [frameStyle, setFrameStyle] = useState("Classic");
  const [material, setMaterial] = useState("Wood");
  const [color, setColor] = useState("#000000");
  const [text, setText] = useState("");
  const [font, setFont] = useState("Arial");
  const [size, setSize] = useState("Small");
  const [hasGlass, setHasGlass] = useState(false);
  const [includeHardware, setIncludeHardware] = useState(true);

  const calculatePrice = () => {
    let basePrice = 50; // Example base price
    if (material === "Metal") basePrice += 10;
    if (size === "Medium") basePrice += 15;
    if (size === "Large") basePrice += 30;
    if (hasGlass) basePrice += 5;
    return basePrice;
  };

  return (
    <div className="flex max-w-5xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Preview Section */}
      <div className="flex-1 border-r pr-6">
        <h2 className="text-xl font-semibold mb-4">Preview</h2>
        <div
          className="border border-gray-300 rounded-lg p-4"
          style={{
            backgroundColor: color,
            height: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontFamily: font,
            position: "relative",
          }}
        >
          <div
            style={{
              color: "#fff",
              textShadow: "1px 1px 2px rgba(0, 0, 0, 0.5)",
              position: "absolute",
              bottom: "10px",
            }}
          >
            {text || "Your Text Here"}
          </div>
          <div
            className={`absolute w-full h-full border-2 ${
              hasGlass ? "border-transparent" : "border-gray-500"
            } rounded-lg`}
            style={{
              pointerEvents: hasGlass ? "none" : "auto",
              backgroundColor: hasGlass
                ? "rgba(255, 255, 255, 0.2)"
                : "transparent",
            }}
          />
        </div>
        <p className="mt-2">Size: {size}</p>
        <p className="mt-1">Material: {material}</p>
        <p className="mt-1">Style: {frameStyle}</p>
      </div>

      {/* Customization Section */}
      <div className="flex-1 pl-6">
        <h1 className="text-2xl font-bold mb-4">Frame Customization</h1>
        <h2 className="text-gray-600 mb-6">
          Personalize your frame to match your style!
        </h2>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Frame Orientation:</label>
          <div className="flex flex-col h-auto w-full items-center m-6">
            <div className="flex justify-around w-full">
              {/* Landscape image with caption */}
              <figure className="flex flex-col items-center">
                <img className="w-[60%] h-auto" src={frmor1} alt="Landscape" />
                <figcaption className="mt-2 text-xs">
                  Landscape
                </figcaption>
              </figure>

              {/* Portrait image with caption */}
              <figure className="flex flex-col items-center">
                <img
                  className="w-[50%] h-auto"
                  src={frmor2}
                  alt="Portrait"
                  style={{ aspectRatio: "3 / 4" }}
                />
                <figcaption className="mt-2 text-xs">Portrait</figcaption>
              </figure>

              {/* Square image with caption */}
              <figure className="flex flex-col items-center">
                <img
                  className="w-[50%] h-auto"
                  src={frmor3}
                  alt="Square"
                  style={{ aspectRatio: "1 / 1" }}
                />
                <figcaption className="mt-2 text-xs">Square</figcaption>
              </figure>
            </div>
          </div>

          <select
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setFrameStyle(e.target.value)}
          >
            <option value="Classic">Classic</option>
            <option value="Modern">Modern</option>
            <option value="Rustic">Rustic</option>
            <option value="Elegant">Elegant</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Frame Material:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setMaterial(e.target.value)}
          >
            <option value="Wood">Wood</option>
            <option value="Metal">Metal</option>
            <option value="Plastic">Plastic</option>
            <option value="Composite">Composite</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Color:</label>
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="w-full border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Add Text/Engraving:</label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text"
            className="w-full p-2 border border-gray-300 rounded mb-2"
          />
          <label className="block mb-2 font-medium">Font:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setFont(e.target.value)}
          >
            <option value="Arial">Arial</option>
            <option value="Courier New">Courier New</option>
            <option value="Georgia">Georgia</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Size:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setSize(e.target.value)}
          >
            <option value="Small">Small (4x6 inches)</option>
            <option value="Medium">Medium (8x10 inches)</option>
            <option value="Large">Large (16x20 inches)</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Add Glass:</label>
          <input
            type="checkbox"
            checked={hasGlass}
            onChange={() => setHasGlass(!hasGlass)}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">Hanging Hardware:</label>
          <select
            className="w-full p-2 border border-gray-300 rounded"
            onChange={(e) => setIncludeHardware(e.target.value === "Included")}
          >
            <option value="Included">Included</option>
            <option value="Not Included">Not Included</option>
          </select>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold">Pricing Summary</h3>
          <p>Base Price: $50</p>
          <p>Total Price: ${calculatePrice()}</p>
        </div>

        <div className="flex space-x-4">
          <button className="flex-1 bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Add to Cart
          </button>
          <button className="flex-1 bg-gray-300 p-2 rounded hover:bg-gray-400">
            Save Customization
          </button>
        </div>
      </div>
    </div>
  );
};

export default FrameCustomization;
