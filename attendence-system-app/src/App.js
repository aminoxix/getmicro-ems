import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

// pages
import Home from "./Pages/Home/Home";
import Signin from "./Pages/SignIn/SignIn";
import PrivateRoutes from "./Routes/PrivateRoutes";

import { db } from "./Config/firebase-config";
import Copyright from "./Components/Footer/Copyright";

import AppContextProvider from "./Context/context";

function App() {
  // setting db settings
  db.settings({ timestampsInSnapshots: true });
  return (
    <div className="App">
      <AppContextProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/dashboard" element={<Home />} />
          </Route>
          <Route path="/" element={<Signin />} />
        </Routes>
      </AppContextProvider>
      <Copyright />
    </div>
  );
}

export default App;
