import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function ContactUs(){
    return (
        <>
        <Header />
        <div className="bg-gray-50">
          {/* HEADING-BANNER START */}
          <div className="bg-cover bg-center py-16 bg-opacity-50 bg-gray-900">
            <div className="container mx-auto">
              <div className="text-center">
                <h2 className="text-3xl font-bold text-white ">Contact Us</h2>
                {/* <div className="text-gray-400 pt-4">
                  <a href="#" className="text-white hover:underline">Home</a> / Contact Us
                </div> */}
              </div>
            </div>
          </div>
          {/* HEADING-BANNER END */}
    
          {/* CONTACT-US AREA START */}
          <div className="py-20">
            <div className="container mx-auto bg-white p-8 shadow-lg">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/3 mb-8 lg:mb-0">
                  <div className="mb-8">
                    <h4 className="text-xl font-semibold uppercase mb-6">Contact Details</h4>
                    <ul className="space-y-4">
                      <li className="flex items-start">
                        <i className="zmdi zmdi-pin text-xl text-gray-700 mr-2"></i>
                        <span>Photo Scan, MVM Haji Complex,<br /> Kuttippuram Road,Edappal, Kerala</span>
                      </li>
                      <li className="flex items-start">
                        <i className="zmdi zmdi-phone text-xl text-gray-700 mr-2"></i>
                        <div>
                          <span>+91 9876 543 210</span><br />
                          <span>+91 9123 456 789</span>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <i className="zmdi zmdi-email text-xl text-gray-700 mr-2"></i>
                        <div>
                          <span>photoscan@gmail.com</span><br />
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold uppercase mb-6">Send Message</h4>
                    <form id="contact-form" action="https://whizthemes.com/mail-php/other/mail.php">
                      <input
                        type="text"
                        name="con_name"
                        placeholder="Your name here..."
                        className="w-full p-2 mb-4 border border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] rounded"
                      />
                      <input
                        type="text"
                        name="con_email"
                        placeholder="Your email here..."
                        className="w-full p-2 mb-4 border border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] rounded"
                      />
                      <textarea
                        className="w-full p-2 mb-4 border border-gray-300 shadow-sm focus:border-[rgb(211,184,130)] focus:ring-[rgb(211,184,130)] rounded"
                        name="con_message"
                        placeholder="Your comment here..."
                      ></textarea>
                      <button
                        className="w-full  text-white p-2 rounded  bg-[rgb(211,184,130)] hover:bg-[rgb(188,157,124)]"
                        type="submit"
                      >
                        Submit Message
                      </button>
                    </form>
                  </div>
                </div>
                <div className="lg:w-2/3 lg:pl-10">
              <div className="map-area">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.3498523698095!2d76.01150607480501!3d10.784494089364783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7b9959ba86f57%3A0x7c6eb4fc221ef4b!2sPhotoscan%20moments!5e0!3m2!1sen!2sin!4v1724325656984!5m2!1sen!2sin"
                  width="600"
                  height="450"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-[550px]"
                ></iframe>
              </div>
            </div>
              </div>
            </div>
          </div>
          {/* CONTACT-US AREA END */}
        </div>
        <Footer />
        </>
      );
}