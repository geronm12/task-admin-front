import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { DataProvider } from "../../context/DataContext";
import { useLocation } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
  const {
    userInfo: { user, isLogged },
  } = useContext(DataProvider);
  const location = useLocation();

  if (user === undefined || user === null || isLogged === false) {
    return <Navigate to="/login" state={location}></Navigate>;
  }

  return children;
};
