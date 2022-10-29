import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { fetchBurgersDB } from '../../services/slices/BurgerIngredients';
import Header from '../AppHeader/AppHeader';
import MainPage from '../../Pages/MainPage/MainPage';
import Register from '../../Pages/Register/Register';
import Login from '../../Pages/Login/Login';
import ForgotPassword from '../../Pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../Pages/ResetPassword/ResetPassword';
import Profile from '../../Pages/Profile/Profile';
import Orders from '../../Pages/Order/Orders';
import Feed from '../../Pages/Feed/Feed';
import NotFound404 from '../../Pages/NotFound404/NotFound404';

import styles from './App.module.css';

const router = createBrowserRouter([
  {
    path: "",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "profile/orders",
        element: <Orders />,
      },
      {
        path: "feed",
        element: <Feed />,
      },
      {
        path: "ingredients/:id",
        element: <div>ingredient</div>
      },
      {
        path: "*",
        element: <NotFound404 />,
      },
    ]
  },
]);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBurgersDB());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;