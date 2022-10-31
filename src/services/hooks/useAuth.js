import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCookie, getCookie } from '../../utils/handleCookie';
import { fetchLogin, fetchRegister, fetchLogout } from '../slices/auth';
import { handleResetPasswordFirst, handleResetPasswordSecond } from '../../utils/api';
import { checkResponseReact } from '../../utils/handleFetch';
import { setError } from '../slices/auth';

const useAuth = (values) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault()
    if (values.email && values.password.length > 5) {
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

  const register = (e) => {
    e.preventDefault()
    if (values.name && values.email && values.password.length > 5) {
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

  const forgotPassword = (e) => {
    e.preventDefault()
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

  const resetPassword = (e) => {
    e.preventDefault()
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
      // .then(res => {
      //   if (res.payload.success === true) {
      //     navigate('/');
      //   }
      // })
      // .catch(res => console.log(res))
  }

  return {
    login,
    register,
    forgotPassword,
    resetPassword,
    logout,
  }
}

export default useAuth;
