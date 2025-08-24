import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/dashboard/Dashboard";

import Profile from "../pages/dashboard/Profile";
import Orders from "../pages/dashboard/Orders";
import Products from "../pages/dashboard/Products";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";




<Route path="/dashboard" element={<Dashboard />} /> // ✅ Ensure this exists

const AppRoutes = () => {
  return (
    <div className="main-container">
      <Sidebar />
      <div className="content">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products" element={<Products />} />
        </Routes>
      </div>
    </div>
  );
};

export default AppRoutes;
