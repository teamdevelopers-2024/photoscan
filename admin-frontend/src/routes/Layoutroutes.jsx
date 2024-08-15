import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Adminlogin from "../comonents/Pages/admimLogin/Adminlogin";
import AdminHome from "../comonents/Pages/adminHome/AdminHome";
import AdminUser from "../comonents/Pages/adminUsers/AdminUser";
import AdminAgent from "../comonents/Pages/adminAgent/AdminAgent";
import AdminProperty from "../comonents/Pages/adminProperty/AdminProperty";
import AdminOrder from "../comonents/Pages/adminOrder/AdminOrder";
import Protectedroute from "./Secureroutes";

function Layoutroutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Adminlogin />} />
        <Route element={<Protectedroute />}>
          <Route path="/admin/home" element={<AdminHome />} />
          <Route path="/admin/user" element={<AdminUser />} />
          <Route path="/admin/agent" element={<AdminAgent />} />
          <Route path="/admin/property" element={<AdminProperty />} />
          <Route path="/admin/order" element={<AdminOrder />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default Layoutroutes;
