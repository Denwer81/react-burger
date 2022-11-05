import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getIsAuth } from '../services/selectors/selectors'

function ProtectedFromAuthRoutes() {
  const location = useLocation();
  const isAuth = useSelector(getIsAuth);

  return (
    !isAuth ? <Outlet /> : <Navigate to='/' state={location} />
  )
}

export default ProtectedFromAuthRoutes;
