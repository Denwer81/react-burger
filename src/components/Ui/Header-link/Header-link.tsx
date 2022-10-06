import React from 'react';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './Header-link.module.css';

function HeaderButton({ text, icon, isActive }: any) {
  const linkStyle = isActive ? 'primary' : 'secondary';
  const textStyle = isActive ? styles.linkActive : styles.linkInactive;

  const iconStyle = () => {
    switch (icon) {
      case 'burger':
        return <BurgerIcon type={linkStyle} />
      case 'menu':
        return <ListIcon type={linkStyle} />
      case 'profile':
        return <ProfileIcon type={linkStyle} />
    }
  }

  return (
    <a className={`${textStyle} ${styles.link} p-4 pl-5 pr-5`} href='#'>
      {iconStyle()}
      <p className="text text_type_main-default ml-2">
        {text}
      </p>
    </a>
  )
}

export default HeaderButton;