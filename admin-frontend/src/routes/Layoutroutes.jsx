import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Protectedroute from "./Secureroutes";

const Adminlogin = lazy(() => import("../components/Pages/admimLogin/Adminlogin"));
const AdminHome = lazy(() => import("../components/Pages/adminAgent/AdminAgent"));
const AdminUser = lazy(() => import("../components/Pages/adminUsers/AdminUser"));
const AdminAgent = lazy(() => import("../components/Pages/adminAgent/AdminAgent"));
const AdminProperty = lazy(() => import("../components/Pages/adminProperty/AdminProperty"));
const AdminOrder = lazy(() => import("../components/Pages/adminOrder/AdminOrder"));

function Layoutroutes() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
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
      </Suspense>
    </Router>
  );
}

export default Layoutroutes;
    