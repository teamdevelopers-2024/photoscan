import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import HomePage from "../HomePage/HomePage";
import CheckoutPage from "../CheckoutPage/Checkout";

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