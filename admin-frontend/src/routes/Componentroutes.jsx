import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Protectedroute from "./Secureroutes";
import './Loading.css'
const AdminUser = lazy(() => import("../components/mainComponents/mainUser/MainUser"));
const AdminDashbord = lazy(() => import("../components/mainComponents/mainDashbord/MainDashbord"));
const AdminFrame = lazy(() => import("../components/mainComponents/mainFrame/MainFrame"));
const AdminMomento = lazy(() => import("../components/mainComponents/mainMomento/MainMomento"));
const AdminOrder = lazy(() => import("../components/mainComponents/mainOrder/MainOrder"));
const AdminBanner = lazy(() => import("../components/mainComponents/mainBanner/MainBanner"));
const AdminExpense = lazy(() => import("../components/mainComponents/mainExpense/MainExpense"));

function Componentroutes() {
  return (
    <Router>
      <Suspense fallback={<div className="loading-screen">Loading...</div>}>
        <Routes>
          <Route element={<Protectedroute />}>
            <Route path="/admin/home" element={<AdminDashbord />} />
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
  )
}

export default Componentroutes