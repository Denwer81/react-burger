import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setCookie } from '../../utils/handleCookie';
import { fetchLogin } from '../slices/auth';
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
          }
          dispatch(setError(res.payload.message || res.payload));
        })
        .catch(res => {
          dispatch(setError('Server Error!!!'))
          console.log('Server Error!!!', res.message)
        })
    }
  }

  return {
    login,
  }
}

export default useAuth;
