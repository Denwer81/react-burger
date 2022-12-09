import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { getIsAuth } from '../services/selectors/selectors'

const ProtectedFromAuthRoutes = () => {
  const location = useLocation();
  const isAuth = useSelector(getIsAuth);

  const navigateTo = location.state.pathname ? location.state.pathname : '/'

  return (
    !isAuth ? <Outlet /> : <Navigate to={navigateTo} state={location} />
  )
}

export default ProtectedFromAuthRoutes;
