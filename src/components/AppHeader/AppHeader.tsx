import React from 'react';
import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../Ui/Wrapper/Wrapper';
import HeaderLink from '../Ui/Header-link/Header-link';

import styles from './AppHeader.module.css';

function AppHeader() {
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

export default AppHeader;