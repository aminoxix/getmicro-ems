import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../Pages/Home/Home";
import Signin from "../Pages/SignIn/signIn";
import PrivateRoutes from "./PrivateRoutes";
export default function PageRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard" element={<Home />} />
      </Route>
      <Route path="/" element={<Signin />} />
    </Routes>
  );
}
