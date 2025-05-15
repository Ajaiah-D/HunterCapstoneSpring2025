import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { AuthContext } from "./AuthProvider";

type Props = {};

const ProtectedRoutes = (props: Props) => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;