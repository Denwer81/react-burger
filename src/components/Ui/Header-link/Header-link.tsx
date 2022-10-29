import React from 'react';
import PropTypes from 'prop-types';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom'

import styles from './Header-link.module.css';

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

function HeaderButton({ text, icon, to }: any) {
  let location = useLocation();

  const match = () => {
    if (location.pathname === '/' && to === '/') {
      return true;
    }
    if (location.pathname !== '/' && to !== '/') {
      return location.pathname.includes(to)
    }
    return false
  }

  const linkStyle = match() ? 'primary' : 'secondary';
  const textStyle = match() ? styles.linkActive : styles.linkInactive;

  return (
    <NavLink className={`${styles.link} ${textStyle} p-4 pl-5 pr-5`} to={`${to}`}>

      {icon === 'burger' && <BurgerIcon type={linkStyle} />}
      {icon === 'menu' && <ListIcon type={linkStyle} />}
      {icon === 'profile' && <ProfileIcon type={linkStyle} />}
      <p className="text text_type_main-default ml-2">
        {text}
      </p>
    </NavLink>
  )
}

export default React.memo(HeaderButton);
