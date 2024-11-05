import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Protectedroute from "./Secureroutes";
import './Loading.css';

import Adminlogin from "../components/Pages/admimLogin/Adminlogin";
import AdminHome from "../components/Pages/adminHome/AdminHome";
import AdminUser from "../components/mainComponents/mainUser/MainUser";
import AdminDashbord from "../components/mainComponents/mainDashbord/MainDashbord";
import AdminProduct from "../components/mainComponents/mainProduct/MainProduct";
import AdminCategory from "../components/mainComponents/mainCategory/Category";
import AdminOrder from "../components/mainComponents/mainOrder/MainOrder";
import AdminBanner from "../components/mainComponents/mainBanner/MainBanner";
import Offer from "../components/mainComponents/mainOffer/Offer";

function Layoutroutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Adminlogin />} />
        <Route element={<Protectedroute />}>
          <Route path="/admin/home" element={<AdminHome />} >
            <Route index element={<AdminDashbord />} />
            <Route path="user" element={<AdminUser />} />
            <Route path="product" element={<AdminProduct />} />
            <Route path="category" element={<AdminCategory />} />
            <Route path="order" element={<AdminOrder />} />
            <Route path="banner" element={<AdminBanner />} />
            <Route path="offer" element={<Offer />} /> 
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default Layoutroutes;
