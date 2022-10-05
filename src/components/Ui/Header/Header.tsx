import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../Wrapper/Wrapper';
import HeaderLink from '../Header-link/Header-link';
import styles from './Header.module.css';

function Header(props: any) {
  return (
    <header className={styles.header}>
      <Wrapper>
        <nav className={styles.nav}>
          <HeaderLink text='Конструктор' icon={'burger'} isActive={true} />
          <HeaderLink text='Лента заказов' icon={'menu'} isActive={false} />
          <HeaderLink text='Личный кабинет' icon={'profile'} isActive={false} />
        </nav>
        <div className={styles.logo}>
          <Logo />
        </div>
      </Wrapper>
    </header>
  )
}

export default Header;