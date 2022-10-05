import React from 'react';
import { BurgerIcon, ProfileIcon, ListIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './Header-link.module.css';

function HeaderButton({ text, icon, isActive }: any) {
  const buttonStyle = isActive ? 'primary' : 'secondary';
  const textStyle = isActive ? styles.buttonActive : styles.buttonInactive;

  const iconStyle = () => {
    switch (icon) {
      case 'burger':
        return <BurgerIcon type={buttonStyle} />
      case 'menu':
        return <ListIcon type={buttonStyle} />
      case 'profile':
        return <ProfileIcon type={buttonStyle} />
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