import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { XMarkIcon } from '@heroicons/react/24/solid';


const OtpModal = ({ isOpen, onClose, onSubmit, onResendOtp }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [timer, setTimer] = useState(60);

  useEffect(() => {
    let interval = null;

    if (isTimerActive && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else if (timer === 0) {
      setIsTimerActive(false);
      setTimer(60); // Reset timer for future resend actions
    }

    return () => clearInterval(interval);
  }, [isTimerActive, timer]);

  const handleOtpChange = (e, index) => {
    const { value } = e.target;
    const newOtp = [...otp];

    if (value.length > 1) {
      newOtp[index] = value.slice(0, 1); // Prevent multiple characters
    } else {
      newOtp[index] = value;
    }

    setOtp(newOtp);

    // Move focus to the next input
    if (index < otp.length - 1 && value) {
      e.target.nextSibling?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      // Move focus to the previous input
      if (otp[index] === '') {
        e.target.previousSibling?.focus();
      }
    }
  };

  const handleResendOtp = () => {
    onResendOtp();
    setTimer(60); // Reset the timer to 60 seconds
    setIsTimerActive(true); // Start the timer
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(otp.join('')); // Pass the OTP as a single string
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative bg-white p-10 rounded-lg shadow-lg max-w-md mx-auto z-10">
        {/* Close Icon */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center">Enter OTP</h2>
        <p className="text-center text-lg mb-6">Please enter the 6-digit OTP sent to your email.</p>
        <form onSubmit={handleSubmit}>
          <div className="flex space-x-4 justify-center mb-9">
            {otp.map((value, index) => (
              <input
                key={index}
                type="text"
                value={value}
                onChange={(e) => handleOtpChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 text-center border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-xl"
                maxLength="1"
              />
            ))}
          </div>
          <div className="flex justify-center mb-6">
            <button
              type="submit"
              className="px-8 py-3 bg-[rgb(211,184,130)] text-white rounded-md hover:bg-blue-600 transition duration-150 ease-in-out"
            >
              Submit
            </button>
          </div>
          <div className="text-center">
            {isTimerActive ? (
              <p className="text-sm text-gray-500">
                Resend OTP in {timer} seconds
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                className="text-blue-500 hover:text-blue-700 transition duration-150 ease-in-out"
              >
                Resend OTP
              </button>
            )}
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default OtpModal;
