import React from "react";
import "./Modal.css";

function Modal({ isOpen, onClose, image, text }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-sm w-full shadow-lg relative">
        <button
          className="absolute top-2 right-2 text-xl text-red-500"
          onClick={onClose}
        >
          &times;
        </button>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Given Text:</h2>
          <p className="text-gray-700">{text}</p>
        </div>
        {image.map((item)=>(
          <div>
          <h2 className="text-lg font-bold">Given Image:</h2>
          <img src={item.secureUrl} alt="Preview" className="w-full h-auto rounded-md" />
        </div>
        ))}
      </div>
    </div>
  );
}

export default Modal;
