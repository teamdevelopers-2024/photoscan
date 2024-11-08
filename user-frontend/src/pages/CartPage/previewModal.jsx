import React from "react";

function Modal({ isOpen, onClose, image, text }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <img src={image} alt="Preview" className="modal-image" />
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Modal;
