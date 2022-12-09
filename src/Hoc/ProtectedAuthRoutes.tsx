import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getIsAuth } from '../services/selectors/selectors'

const ProtectedAuthRoutes = () => {
  const location = useLocation();
  const isAuth = useSelector(getIsAuth);

  return (
    isAuth ? <Outlet /> : <Navigate to='/login' state={location} />
  )
}

export default ProtectedAuthRoutes;
