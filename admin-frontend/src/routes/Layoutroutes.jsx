import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Protectedroute from "./Secureroutes";
import './Loading.css'

const Adminlogin = lazy(() => import("../components/Pages/admimLogin/Adminlogin"));
const AdminHome = lazy(() => import("../components/Pages/adminHome/AdminHome"));
const AdminUser = lazy(() => import("../components/Pages/adminUsers/AdminUser"));
const AdminFrame = lazy(() => import("../components/Pages/adminFrame/AdminFrame"));
const AdminMomento = lazy(() => import("../components/Pages/adminMomento/AdminMomento"));
const AdminOrder = lazy(() => import("../components/Pages/adminOrder/AdminOrder"));
const AdminBanner = lazy(() => import("../components/Pages/adminBanner/AdminBanner"));
const AdminExpense = lazy(() => import("../components/Pages/adminExpense/AdminExpense"));

function Layoutroutes() {
  return (
    <Router>
      <Suspense fallback={<div className="loading-screen">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Adminlogin />} />
          <Route element={<Protectedroute />}>
            <Route path="/admin/home" element={<AdminHome />} />
            <Route path="/admin/user" element={<AdminUser />} />
            <Route path="/admin/frame" element={<AdminFrame />} />
            <Route path="/admin/momento" element={<AdminMomento />} />
            <Route path="/admin/order" element={<AdminOrder />} />
            <Route path="/admin/expense" element={<AdminExpense />} />
            <Route path="/admin/banner" element={<AdminBanner />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default Layoutroutes;
    