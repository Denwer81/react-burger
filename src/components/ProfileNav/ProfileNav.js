import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { fetchLogout } from '../../services/slices/auth';
import { getCookie } from '../../utils/handleCookie';


import styles from './ProfileNav.module.css';

function ProfileNav() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const activeStyle = `${styles.link} ${styles.active} text text_type_main-medium`
  const inActiveStyle = `${styles.link} text text_type_main-medium`

  const profileStyles = location.pathname === '/profile'
    ? activeStyle : inActiveStyle
  const orderStyles = location.pathname === '/profile/orders'
    ? activeStyle : inActiveStyle

  const handleLogout = () => {
    const refreshToken = { token: getCookie('refreshToken') };
    dispatch(fetchLogout(refreshToken))
      .then(res => {
        if (res.payload.success === true) {
          navigate('/');
        }
        console.log(res)
      })
      .catch(res => console.log(res))
  }




  return (
    <nav className={styles.container}>
      <NavLink className={profileStyles} to='/profile'>
        Профиль
      </NavLink>
      <NavLink className={orderStyles} to='/profile/orders'>
        История заказов
      </NavLink>
      <button
        className={`${styles.button} text text_type_main-medium`}
        onClick={handleLogout}
        type='button'>
        Выход
      </button>
      <p className={`${styles.text} text text_type_main-default`}>
        В этом разделе вы можете изменить<br />свои персональные данные
      </p>
    </nav>
  );
}

export default React.memo(ProfileNav);