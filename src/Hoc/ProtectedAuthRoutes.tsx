import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../services/hooks/useRedux";
import { getIsAuth } from '../services/selectors/selectors'

const ProtectedAuthRoutes = () => {
  const location = useLocation();
  const isAuth = useAppSelector(getIsAuth);

  return (
    isAuth ? <Outlet /> : <Navigate to='/login' state={location} />
  )
}

export default ProtectedAuthRoutes;
