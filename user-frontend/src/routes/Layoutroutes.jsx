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
import MomentoListing from "../pages/Momento_Listing/MomentoListing";
import FrameListing from "../pages/Frames_Listing/FrameListing";
import PageNotFound from "../pages/404/PageNotFound";
import SingleProduct from "../pages/Single Product/SingleProduct";

export default function Layoutroutes(){
    return(
        <Router>
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/checkout" element={<CheckoutPage />}/>
                <Route path="/" element={<HomePage />}/>
                <Route path="/contact" element={<ContactUs />}/>
                <Route path="/about" element={<Aboutus />}/>
                <Route path="/ordersuccess" element={<OrderSuccess />}/>
                <Route path="/Myorder" element={<MyOrder />}/>
                <Route path="/cart" element={<Cart />}/>
                <Route path="/profile" element={<Profile />}/>
                <Route path="/momentos" element={<MomentoListing />}/>
                <Route path="/frames" element={<FrameListing />}/>
                <Route path="/404" element={<PageNotFound />}/>
                <Route path="/productpage" element={<SingleProduct />}/>
            </Routes>
        </Router>
    )
}