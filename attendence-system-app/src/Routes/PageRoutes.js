import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/SignIn/Signin";
export default function PageRoutes() {
  return (
    <Router>
      <>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </>
    </Router>
  );
}
