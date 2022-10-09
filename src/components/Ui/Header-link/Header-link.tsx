import React from 'react';
import PropTypes from 'prop-types';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Header-link.module.css';

HeaderButton.propTypes = {
  text: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
};

function HeaderButton({ text, icon, isActive }: any) {
  const linkStyle = isActive ? 'primary' : 'secondary';
  const textStyle = isActive ? styles.linkActive : styles.linkInactive;

  return (
    <a className={`${textStyle} ${styles.link} p-4 pl-5 pr-5`} href='#'>
      {icon === 'burger' && <BurgerIcon type={linkStyle} /> }
      {icon === 'menu' && <ListIcon type={linkStyle} /> }
      {icon === 'profile' && <ProfileIcon type={linkStyle} /> }
      <p className="text text_type_main-default ml-2">
        {text}
      </p>
    </a>
  )
}

export default HeaderButton;