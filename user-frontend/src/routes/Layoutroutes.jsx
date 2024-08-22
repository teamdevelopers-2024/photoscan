import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CheckoutPage from "../CheckoutPage/Checkout";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import HomePage from "../pages/HomePage/HomePage";

export default function Layoutroutes(){
    return(
        <Router>
            <Routes>
                <Route path="/login" element={<Login />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/checkout" element={<CheckoutPage />}/>
                <Route path="/" element={<HomePage />}/>

            </Routes>
        </Router>
    )
}