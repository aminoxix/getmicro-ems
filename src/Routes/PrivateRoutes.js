import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { appContext } from "../Context/context";

export default function PrivateRoutes() {
  const { state } = useContext(appContext);

  return state.user ? <Outlet /> : <Navigate to="/" />;
}
