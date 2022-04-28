import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";

// pages
import Signin from "./Pages/SignIn/SignIn";

// Routes
import PrivateRoutes from "./Routes/PrivateRoutes";

// Components
import Copyright from "./Components/Footer/Copyright";
import Dashboard from "./Components/Dashboard/Dashboard";

import AppContextProvider from "./Context/context";
import { app } from "./Config/firebase-config";

import Main from "./Pages/Dashboard/Admin/Main";
import AddUser from "./Pages/Dashboard/Admin/AddUser";

function App() {
  return (
    <div className="App">
      <AppContextProvider>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="dashboard" element={<Dashboard />}>
              <Route path="" element={<Main />} />
              <Route path="adduser" element={<AddUser />} />
            </Route>
          </Route>
          <Route path="/" element={<Signin />} />
        </Routes>
      </AppContextProvider>
      <Copyright />
    </div>
  );
}

export default App;
