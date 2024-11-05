import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import OtpModal from "../../components/otpModal/OtpModal";
import Loader from "../../components/loader/Loader";
import Swal from "sweetalert2";

function ForgotPass() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [otpModal, setOtpModal] = useState(false);
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState("");
  const [isVerify, setIsVerify] = useState(false);
  const [otpErrorMessage, setOtpErrorMessage] = useState("");

  const isOpen = () => setOtpModal(true);
  const onClose = () => setOtpModal(false);

  const handleEmailChange = (e) => setEmail(e.target.value);

  const handleVerifySubmit = async () => {
    setLoader(true);
    try {
      const result = await api.resetOtp(email);
      if (!result.error) {
        setErrors({});
        setOtpModal(true);
      } else {
        const formError = {
          email: `*${result.message}`,
        };
        setErrors(formError);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  const onSumbitSuccess = async (otp) => {
    try {
      setLoader(true);
      const result = await api.verifyOtp(email, otp);

      if (!result.error) {
        setIsVerify(true);
        setOtpModal(false);

        await Swal.fire({
          title: "Success!",
          text: "OTP verified successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });

        // Store the email in local storage
        localStorage.setItem("resetEmail", email);

        // Navigate to the New Password page
        navigate("/resetpassword"); // Adjust this to your routing setup
      } else {
        setOtpErrorMessage(result.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <>
      {loader && <Loader />}
      <div className="flex flex-col min-h-screen justify-center p-4 sm:p-6 lg:p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6 lg:mb-8">
          <img
            onClick={() => navigate("/")}
            alt="photoscan"
            src={logo}
            className="h-10 w-auto cursor-pointer sm:h-12"
          />
        </div>

        {/* Heading */}
        <h2 className="text-center text-xl sm:text-2xl font-semibold text-gray-900 mb-4 sm:mb-6">
          Forgot Your Password
        </h2>

        {/* Form Container */}
        <div className="w-full max-w-md mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                autoComplete="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] sm:text-sm"
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Get OTP Button */}
            <div>
              <button
                onClick={handleVerifySubmit}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[rgb(211,184,130)] hover:bg-[rgb(188,157,124)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[rgb(211,184,130)]"
              >
                Get OTP
              </button>
            </div>
          </div>
        </div>
        {otpModal && (
          <OtpModal
            isOpen={isOpen}
            onSubmit={onSumbitSuccess}
            onClose={onClose}
            errorMessage={otpErrorMessage}
          />
        )}
      </div>
    </>
  );
}

export default ForgotPass;
