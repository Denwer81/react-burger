import { useState } from 'react';
import { setError } from '../slices/auth';
import { useAppDispatch } from './useRedux';
import { useNavigate, useLocation } from "react-router-dom";
import { ILoginData, IRegisterData, IForgotPassword, IResetPassword } from './../types/auth';
import { getCookie, deleteCookie, setAccessToken, setRefreshToken } from '../../utils/handleCookie';
import { handleFetchForgotPassword, handleFetchResetPassword } from '../api/auth';
import {
  fetchLogin,
  fetchRegister,
  fetchLogout,
  fetchGetUser,
  fetchUpdateAccessToken,
  fetchUpdateUser,
} from '../slices/auth';

function useAuth() {
  const [sendData, setSendData] = useState<object | null>(null)
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const login = (data: ILoginData) => {
    dispatch(fetchLogin(data))
      .then(res => {
        if (res.payload!.success === true) {
          if (location.state) {
            navigate(location.state.pathname);
          }
          setAccessToken(res.payload!.accessToken!);
          setRefreshToken(res.payload!.refreshToken!);
        }
      })
  }

  const register = (data: IRegisterData) => {
    dispatch(fetchRegister(data))
      .then(res => {
        if (res.payload!.success === true) {
          setAccessToken(res.payload!.accessToken!);
          setRefreshToken(res.payload!.refreshToken!);
        }
      })
  }

  const updateAccessToken = (fn: any) => {
    const refreshToken = getCookie('refreshToken');

    if (refreshToken) {
      dispatch(fetchUpdateAccessToken({ token: refreshToken }))
        .then(res => {
          if (res.payload!.success === true) {
            setAccessToken(res.payload!.accessToken!);
            setRefreshToken(res.payload!.refreshToken!);
            fn(sendData);
          } else {
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
          }
        })
    }
  }

  const getUser = () => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      dispatch(fetchGetUser({ token: accessToken }))
        .then(res => {
          if (res.payload!.message === 'jwt expired') {
            updateAccessToken(getUser)
          }
        })
    }
  }

  const updateUser = (data: IRegisterData) => {
    const accessToken = getCookie('accessToken');
    setSendData(data)

    if (data.name && data.email && accessToken) {
      dispatch(fetchUpdateUser({ accessToken, data }))
        .then(res => {
          if (res.payload!.message === 'jwt expired') {
            updateAccessToken(updateUser)
          }
        })
    }
  }

  const logout = () => {
    const refreshToken = getCookie('refreshToken');

    if (refreshToken) {
      dispatch(fetchLogout({ token: refreshToken }))
        .then(res => {
          if (res.payload!.success === true) {
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
            navigate('/login')
          }
        })
    }
  }

  const forgotPassword = (data: IForgotPassword) => {
    handleFetchForgotPassword(data)
      .then(() => navigate('/reset-password', { state: true }))
      .catch(error => dispatch(setError(error.message)))
  }

  const resetPassword = (data: IResetPassword) => {
    handleFetchResetPassword(data)
      .then(() => navigate('/login'))
      .catch(error => dispatch(setError(error.message)))
  }

  return {
    login,
    register,
    getUser,
    updateUser,
    forgotPassword,
    resetPassword,
    updateAccessToken,
    logout,
  }
}

export default useAuth;
