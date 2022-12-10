import React, { FC } from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link, Outlet } from "react-router-dom";
import Wrapper from '../Ui/Wrapper/Wrapper';
import HeaderLink from '../Ui/Header-link/Header-link';

import styles from './AppHeader.module.css';

const AppHeader: FC = () => {
  return (
    <>
      <header className={styles.header}>
        <Wrapper>
          <nav className={styles.nav}>
            <HeaderLink text='Конструктор' icon={'burger'} to={'/'} />
            <HeaderLink text='Лента заказов' icon={'menu'} to={'/feed'} />
            <HeaderLink text='Личный кабинет' icon={'profile'} to={'/profile'} />
          </nav>
          <Link to='/' className={styles.logo}>
            <Logo />
          </Link>
        </Wrapper>
      </header>
      <Outlet />
    </>
  )
}

export default React.memo(AppHeader);