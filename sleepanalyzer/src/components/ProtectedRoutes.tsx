import React from "react";
import { Navigate, Outlet } from "react-router";
import { getAuth } from "firebase/auth";

const ProtectedRoutes = () => {
  const currentUser = getAuth().currentUser;

  return currentUser ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
