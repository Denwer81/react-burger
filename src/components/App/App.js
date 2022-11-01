import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchBurgersDB } from '../../services/slices/BurgerIngredients';
import { useSelector } from 'react-redux';
import { getAuthError } from '../../services/selectors/selectors';
import useAuth from '../../services/hooks/useAuth'
import useModal from '../../services/hooks/useModal';

import AppHeader from '../AppHeader/AppHeader';
import MainPage from '../../Pages/MainPage/MainPage';
import Register from '../../Pages/Register/Register';
import ProtectedFromAuthRoutes from '../../Hoc/ProtectedFromAuthRoutes';
import ProtectedAuthRoutes from '../../Hoc/ProtectedAuthRoutes';
import Login from '../../Pages/Login/Login';
import ForgotPassword from '../../Pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../Pages/ResetPassword/ResetPassword';
import Profile from '../../Pages/Profile/Profile';
import Orders from '../../Pages/Order/Orders';
import Feed from '../../Pages/Feed/Feed';
import NotFound404 from '../../Pages/NotFound404/NotFound404';
import ErorrModal from '../ErrorModal/ErorrModal';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const authError = useSelector(getAuthError);
  const { getUser } = useAuth();
  const { isOpen, handleClose, handleOpenErrorModal } = useModal();

  useEffect(() => {
    dispatch(fetchBurgersDB());
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    handleOpenErrorModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authError]);

  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes>
          <Route path='/' element={<MainPage />} />

          <Route element={<ProtectedFromAuthRoutes />} >
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='forgot-password' element={<ForgotPassword />} />
            <Route path='reset-password' element={<ResetPassword />} />
          </Route>

          <Route element={<ProtectedAuthRoutes />} >
            <Route path='profile' element={<Profile />} />
            <Route path='profile/orders' element={<Orders />} />
            <Route path='feed' element={<Feed />} />
          </Route>

          <Route path='*' element={<NotFound404 />} />
        </Routes>

        {authError &&
          <ErorrModal
            isOpen={isOpen}
            handleClose={handleClose}
            error={authError}>
          </ErorrModal>
        }
      </div>
    </>
  );
}

export default App;