import { createBrowserRouter } from "react-router-dom";
import Header from '../../components/AppHeader/AppHeader';
import MainPage from '../../Pages/MainPage/MainPage';
import Register from '../../Pages/Register/Register';
import Login from '../../Pages/Login/Login';
import ForgotPassword from '../../Pages/ForgotPassword/ForgotPassword';
import ResetPassword from '../../Pages/ResetPassword/ResetPassword';
import Profile from '../../Pages/Profile/Profile';
import Orders from '../../Pages/Order/Orders';
import Feed from '../../Pages/Feed/Feed';
import NotFound404 from '../../Pages/NotFound404/NotFound404';
import ProtectedAuthRoutes from '../../Hoc/ProtectedAuthRoutes';
import ProtectedFromAuthRoutes from '../../Hoc/ProtectedFromAuthRoutes';

export const router = createBrowserRouter([
  {
    path: "",
    element: <Header />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        element: <ProtectedFromAuthRoutes />,
        children: [
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
        ],
      },
      {
        element: <ProtectedAuthRoutes />,
        children: [
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
        ],
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