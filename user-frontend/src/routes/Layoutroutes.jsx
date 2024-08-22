import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import HomePage from "../pages/HomePage/HomePage";
import CheckoutPage from "../pages/CheckoutPage/Checkout";
import ContactUs from "../pages/ContactUs/ContactUs";
import Aboutus from "../pages/AboutUsPage/Aboutus";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";

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
            </Routes>
        </Router>
    )
}