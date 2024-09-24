import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import Footer from "../components/Footer";
import Registration from "../components/Registration";
import VerifyOTP from "../components/VerifyOTP";
import Dashboard from "../components/Dashboard";

function AllRoutes() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/verifyOTP" element={<VerifyOTP />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default AllRoutes;
