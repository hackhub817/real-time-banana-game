import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ requiredRole }) => {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (user) {
    if (requiredRole && user.role !== requiredRole) {
      return (
        <Navigate
          to={user.role === "admin" ? "/adminDashboard" : "/playerDashboard"}
          replace
        />
      );
    }
  }

  return <Outlet />;
};

export default ProtectedRoute;
