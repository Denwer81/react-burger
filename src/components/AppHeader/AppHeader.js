import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Outlet } from "react-router-dom";
import Wrapper from '../Ui/Wrapper/Wrapper';
import HeaderLink from '../Ui/Header-link/Header-link';

import styles from './AppHeader.module.css';

function AppHeader() {
  return (
    <>
      <header className={styles.header}>
        <Wrapper>
          <nav className={styles.nav}>
            <HeaderLink text='Конструктор' icon={'burger'} to={'/'} />
            <HeaderLink text='Лента заказов' icon={'menu'} to={'/feed'} />
            <HeaderLink text='Личный кабинет' icon={'profile'} to={'/profile'} />
          </nav>
          <div className={styles.logo}>
            <Logo />
          </div>
        </Wrapper>
      </header>
      <Outlet />
    </>

  )
}

export default React.memo(AppHeader);