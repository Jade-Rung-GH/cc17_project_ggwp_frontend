import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const { authUser, isAuthUserLoading } = useAuth();

  if (isAuthUserLoading) {
    return <div>Loading...</div>;
  }

  return authUser ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
