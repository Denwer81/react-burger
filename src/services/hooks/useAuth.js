import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie, deleteCookie } from '../../utils/handleCookie';
import { handleResetPasswordFirst, handleResetPasswordSecond } from '../../utils/api';
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

const handleSetAccessToken = (res) => {
  setCookie('accessToken', res.payload.accessToken, { expires: 60 * 60 * 24 * 7, path: '/' });
}

const handleSetRefreshToken = (res) => {
  setCookie('refreshToken', res.payload.refreshToken, { expires: 60 * 60 * 24 * 7, path: '/' });
}

const useAuth = (values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = () => {
    if (values.email && values.password) {
      dispatch(fetchLogin(values))
        .then(res => {
          if (res.payload.success === true) {
            handleSetAccessToken(res);
            handleSetRefreshToken(res);
            navigate(-1);
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
            handleSetAccessToken(res);
            handleSetRefreshToken(res);
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
            handleSetAccessToken(res);
            handleSetRefreshToken(res);
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
