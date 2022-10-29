import React from 'react';
import { NavLink, useLocation } from "react-router-dom";

import styles from './ProfileNav.module.css';

function ProfileNav() {
  const location = useLocation();
  const activeStyle = `${styles.link} ${styles.active} text text_type_main-medium`
  const inActiveStyle = `${styles.link} text text_type_main-medium`

  const profileStyles = location.pathname === '/profile'
    ? activeStyle : inActiveStyle

  const orderStyles = location.pathname === '/profile/orders'
    ? activeStyle : inActiveStyle

  return (
    <nav className={styles.container}>
      <NavLink className={profileStyles} to='/profile'>
        Профиль
      </NavLink>
      <NavLink className={orderStyles} to='/profile/orders'>
        История заказов
      </NavLink>
      <button className={`${styles.button} text text_type_main-medium`} type='button'>
        Выход
      </button>
      <p className={`${styles.text} text text_type_main-default`}>
        В этом разделе вы можете изменить<br/>свои персональные данные
      </p>
    </nav>

  );
}

export default React.memo(ProfileNav);