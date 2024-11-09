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
import PageNotFound from "../pages/404/PageNotFound";
import PrivateRoute from "./PrivateRoute";
import RedirectIfAuthenticated from "./RedirectIfAuthenticated";
import ForgotPass from "../pages/forgtoPass/ForgotPass";
import Customize from "../components/customize/Customize";
import Proudcts from "../components/Products/Products";
import Wishlist from "../pages/Wishlist/Wishlist";
import NewPassword from "../pages/New Password/NewPassword";
import ScrollToTop from "./ScrollTopap";
import SingleProduct from "../pages/SingleProduct/SingleProduct";


export default function Layoutroutes() {
    return (
        <Router>
            <ScrollToTop/>
            <Routes>
                {/* Private Routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/ordersuccess" element={<OrderSuccess />} />
                    <Route path="/myorder" element={<MyOrder />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/resetpassword" element={<NewPassword />} />
                    
                </Route>

                {/* Public Routes */}
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
                <Route path="/products" element={<Proudcts />} />
                <Route path="*" element={<PageNotFound />} />
                <Route path="/singleProduct" element={<SingleProduct />} />
                <Route path="/customise" element={<Customize/>} />
            </Routes>
        </Router>
    );
}
