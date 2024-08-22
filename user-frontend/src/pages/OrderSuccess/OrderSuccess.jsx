import React from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

export default function OrderSuccess() {
  return (
    <>
      <Header />

      <div >
        {/* HEADING-BANNER START */}
        {/* <div
          className="relative bg-cover bg-center h-60"
          style={{ backgroundImage: "url(/path/to/your/banner-image.jpg)" }}
        >
          <div className="container mx-auto py-10">
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold">Check Out</h2>
            </div>
          </div>
        </div> */}
        {/* HEADING-BANNER END */}

        {/* CHECKOUT-AREA START */}
        <div className="py-20">
          <div className="container mx-auto">
            <div className="bg-white p-8 shadow-md rounded-lg">
              <form>
                {/* Order Complete Message */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8 text-center">
                  <p className="text-lg font-semibold">
                    Thank you. Your order has been received.
                  </p>
                </div>

                {/* Order Info */}
                <div className="bg-white p-6 rounded-lg shadow-md text-center mb-8">
                  <div className="flex justify-around">
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2">Order No</h4>
                      <p className="text-lg font-medium">
                        <strong>M 2653257</strong>
                      </p>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2">Date</h4>
                      <p className="text-lg font-medium">
                        <strong>June 15, 2021</strong>
                      </p>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2">Total</h4>
                      <p className="text-lg font-medium">
                        <strong>$170.00</strong>
                      </p>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold mb-2">
                        Payment Method
                      </h4>
                      <p className="text-lg font-medium">
                        <a href="#" className="text-blue-500 hover:underline">
                          <strong>Check Payment</strong>
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Details Table */}
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full md:w-1/2 px-4 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                      <h4 className="text-xl font-semibold mb-4">Order Summary</h4>
                      <table className="w-full">
                        <thead className="bg-gray-300">
                          <tr>
                            <th className="text-left font-semibold">Product</th>
                            <th className="text-right font-semibold">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Dummy Product Name x 2</td>
                            <td className="text-right">$86.00</td>
                          </tr>
                          <tr>
                            <td>Dummy Product Name x 1</td>
                            <td className="text-right">$69.00</td>
                          </tr>
                          <tr>
                            <td>Cart Subtotal</td>
                            <td className="text-right">$155.00</td>
                          </tr>
                          <tr>
                            <td>Shipping and Handling</td>
                            <td className="text-right">$15.00</td>
                          </tr>
                          <tr>
                            <td>VAT</td>
                            <td className="text-right">$00.00</td>
                          </tr>
                          <tr>
                            <td >Order Total</td>
                            <td className="text-right font-semibold">
                              $170.00
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* CHECKOUT-AREA END */}
      </div>

      <Footer />
    </>
  );
}
