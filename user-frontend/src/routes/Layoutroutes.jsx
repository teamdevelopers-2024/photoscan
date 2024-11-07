import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import HomePage from "../pages/HomePage/HomePage";
import CheckoutPage from "../pages/CheckoutPage/Checkout";
import ContactUs from "../pages/ContactUs/ContactUs";
import Aboutus from "../pages/AboutUsPage/Aboutus";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import MyOrder from "../components/MyOrders/MyOrder";
import Cart from "../pages/CartPage/Cart";
import Profile from "../pages/Profile/Profile";
import MomentoListing from "../pages/Products_Listing/ProductsListing";
import FrameListing from "../pages/Frames_Listing/FrameListing";
import PageNotFound from "../pages/404/PageNotFound";
import SingleProduct from "../pages/Single Product/SingleProduct";
import PrivateRoute from "./PrivateRoute";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";
import ForgotPass from "../pages/forgtoPass/ForgotPass";
import MomentoPage from "../pages/momentoPage/MomentoPage";
import FramePage from "../pages/framePage/FramePage";
import Customize from "../components/customize/Customize";
import NewPassword from "../pages/New Password/NewPassword";

export default function Layoutroutes() {
    return (
        <Router>
            <Routes>
                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/ordersuccess" element={<OrderSuccess />} />
                    <Route path="/myorder" element={<MyOrder />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>

                {/* Public Routes */}
                    <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={
                    <RedirectIfAuthenticated>
                        <Login />
                    </RedirectIfAuthenticated>
                } />
                <Route path="/register" element={
                    <RedirectIfAuthenticated>
                        <Register />
                    </RedirectIfAuthenticated>
                } />
                <Route path="/forgotPassword" element={<ForgotPass/>} />
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/about" element={<Aboutus />} />
                <Route path="/products" element={<MomentoListing />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/momentopage" element={<MomentoPage />} />
                <Route path="/framepage" element={<FramePage />} />
                <Route path="/customise" element={<Customize/>} />
                <Route path="/resetpassword" element={<NewPassword />} />
            </Routes>
        </Router>
    );
}
