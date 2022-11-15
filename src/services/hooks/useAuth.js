import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { handleResetPasswordFirst, handleResetPasswordSecond } from '../../utils/api';
import { getCookie, deleteCookie, setAccessToken, setRefreshToken } from '../../utils/handleCookie';
import { checkResponseReact } from '../../utils/handleFetch';
import { setError } from '../slices/auth';
import {
  fetchLogin,
  fetchRegister,
  fetchLogout,
  fetchGetUser,
  fetchUpdateAccessToken,
  fetchUpdateUser,
} from '../slices/auth';

const useAuth = (values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const login = () => {
    if (values.email && values.password) {
      dispatch(fetchLogin(values))
        .then(res => {
          if (res.payload.success === true) {
            if (location.state) {
              navigate(location.state.pathname);
            }
            setAccessToken(res);
            setRefreshToken(res);
          } else {
            dispatch(setError(res.payload.message || res.payload));
          }
        })
    }
  }

  const register = () => {
    if (values.name && values.email && values.password) {
      dispatch(fetchRegister(values))
        .then(res => {
          if (res.payload.success === true) {
            setAccessToken(res);
            setRefreshToken(res);
          } else {
            dispatch(setError(res.payload.message || res.payload));
          }
        })
    }
  }

  const updateAccessToken = (fn) => {
    const refreshToken = getCookie('refreshToken');

    if (refreshToken) {
      dispatch(fetchUpdateAccessToken({ token: refreshToken }))
        .then(res => {
          if (res.payload.success === true) {
            setAccessToken(res);
            setRefreshToken(res);
            fn();
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
      dispatch(fetchGetUser(accessToken))
        .then(res => {
          if (res.payload.status === false) {
            dispatch(setError(res.payload.message || res.payload));
            if (res.payload.message === 'jwt expired') {
              updateAccessToken(getUser)
            }
          }
        })
    }
  }

  const updateUser = () => {
    const accessToken = getCookie('accessToken');

    if (values.name && values.email) {
      dispatch(fetchUpdateUser({ accessToken, values }))
        .then(res => {
          if (res.payload.status === false) {
            dispatch(setError(res.payload.message || res.payload));
            if (res.payload.message === 'jwt expired') {
              updateAccessToken(updateUser)
            }
          }
        })
    }
  }

  const forgotPassword = () => {
    if (values.email) {
      handleResetPasswordFirst(values)
        .then(res => checkResponseReact(res))
        .then(res => {
          if (res.success === true) {
            navigate('/reset-password', { state: true })
          } else {
            dispatch(setError(res.message))
          }
        })
    }
  }

  const resetPassword = () => {
    if (values.password && values.token) {
      handleResetPasswordSecond(values)
        .then(res => checkResponseReact(res))
        .then(res => {
          if (res.success === true) {
            navigate('/login')
          }
          dispatch(setError(res.message))
        })
    }
  }

  const logout = () => {
    const refreshToken = { token: getCookie('refreshToken') };

    dispatch(fetchLogout(refreshToken))
      .then(res => {
        if (res.payload.success === true) {
          deleteCookie('accessToken');
          deleteCookie('refreshToken');
          navigate('/login')
        } else {
          dispatch(setError(res.payload.message || res.payload));
        }
      })
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
