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

const useAuth = (values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = () => {
    if (values.email && values.password) {
      dispatch(fetchLogin(values))
        .then(res => {
          if (res.payload.success === true) {
            navigate('/');
            setCookie('accessToken', res.payload.accessToken);
            setCookie('refreshToken', res.payload.refreshToken);
          } else {
            dispatch(setError(res.payload.message || res.payload));
          }
        })
        .catch(res => {
          dispatch(setError('Server Error!!!'));
          console.log('Server Error!!!', res.message);
        })
    }
  }

  const register = () => {
    if (values.name && values.email && values.password) {
      dispatch(fetchRegister(values))
        .then(res => {
          if (res.payload.success === true) {
            navigate('/');
            setCookie('accessToken', res.payload.accessToken);
            setCookie('refreshToken', res.payload.refreshToken);
          } else {
            dispatch(setError(res.payload.message || res.payload));
          }
        })
        .catch(res => {
          dispatch(setError('Server Error!!!'));
          console.log('Server Error!!!', res.message);
        })
    }
  }

  const updateAccessToken = (fn) => {
    const refreshToken = getCookie('refreshToken')

    if (refreshToken) {
      dispatch(fetchUpdateAccessToken({ token: refreshToken }))
        .then(res => {
          if (res.payload.success === true) {
            setCookie('accessToken', res.payload.accessToken);
            setCookie('refreshToken', res.payload.refreshToken);
            fn();
          } else {
            deleteCookie('accessToken');
            deleteCookie('refreshToken');
          }
        })
        .catch(res => console.log(res))
    }
  }

  const getUser = () => {
    const accessToken = getCookie('accessToken');

    if (accessToken) {
      dispatch(fetchGetUser(accessToken))
        .then(res => {
          if (res.payload.message === 'jwt expired')
            updateAccessToken(getUser)
        })
        .catch(res => console.log(res))
    }
  }

  const updateUser = () => {
    const accessToken = getCookie('accessToken');

    if (values.name && values.email && values.password) {
      dispatch(fetchUpdateUser({ accessToken, values }))
        .then(res => {
          if (res.payload.message === 'jwt expired')
            updateAccessToken(updateUser)
        })
        .catch(res => {
          dispatch(setError('Server Error!!!'));
          console.log('Server Error!!!');
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
        .catch(res => {
          dispatch(setError('Server Error!!!'))
          console.log('Server Error!!!', res.message)
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
          } else {
            dispatch(setError(res.message))
          }
        })
        .catch(res => {
          dispatch(setError('Server Error!!!'))
          console.log('Server Error!!!', res.message)
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
          navigate('/');
        } else {
          dispatch(setError(res.payload.message || res.payload));
        }
      })
      .catch(res => {
        dispatch(setError('Server Error!!!'))
        console.log('Server Error!!!', res.message)
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
