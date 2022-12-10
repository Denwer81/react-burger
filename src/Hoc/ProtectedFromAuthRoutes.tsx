import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../services/hooks/useRedux";
import { getIsAuth } from '../services/selectors/selectors'

const ProtectedFromAuthRoutes = () => {
  const location = useLocation();
  const isAuth = useAppSelector(getIsAuth);

  const navigateTo = location.state?.pathname ? location.state.pathname : '/'

  return (
    !isAuth ? <Outlet /> : <Navigate to={navigateTo} state={location} />
  )
}

export default ProtectedFromAuthRoutes;
