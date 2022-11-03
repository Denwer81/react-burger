import React, { useEffect } from 'react';
import { Route, Routes } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { fetchBurgersDB } from '../../services/slices/BurgerIngredients';
import { useSelector } from 'react-redux';
import { getAuthError } from '../../services/selectors/selectors';
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from '../../services/hooks/useAuth'
import useModal from '../../services/hooks/useModal';
import useClearData from '../../services/hooks/useClearData';
import { clearIngredient } from '../../services/slices/viewedIngredient';
import { clearOrder } from '../../services/slices/order';
import { clearCart } from '../../services/slices/BurgerConstructor';

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
import Modal from '../Ui/Modals/Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import OrderDetails from '../OrderDetails/OrderDetails';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { getUser } = useAuth();
  const { clearData } = useClearData();

  const authError = useSelector(getAuthError);
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

  const location = useLocation();
  const background = location.state && location.state.background;

  const closeIngredientsModal = () => {
    clearData(clearIngredient)
    navigate(-1);
  }

  const closeOrderModal = () => {
    clearData(clearOrder)
    clearData(clearCart)
    navigate(-1);
  };


  return (
    <>
      <div className={styles.app}>
        <AppHeader />
        <Routes location={background || location}>
          <Route path='/' element={<MainPage />} />
          <Route path='/ingredients/:ingredientId' element={<IngredientDetails />} />
          {/* <Route path='//profile/orders/:orderNumber' element={<OrderDetails />} /> */}

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

        {background && (
          <Routes>
            <Route path='/ingredients/:ingredientId' element={
              <Modal
                handleClose={closeIngredientsModal}>
                <IngredientDetails />
              </Modal>
            } />
            <Route element={<ProtectedAuthRoutes />} >
              <Route path='/profile/orders/:orderNumber' element={
                <Modal
                  isOpen={isOpen}
                  handleClose={closeOrderModal}>
                  <OrderDetails />
                </Modal>
              } />
            </Route>
          </Routes>
        )}
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
};



export default App;