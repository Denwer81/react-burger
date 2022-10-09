import React from 'react';
import Wrapper from '../Ui/Wrapper/Wrapper';
import BurgerConstractor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import useGetBurgersDB from '../../hooks/useInitial';

import styles from './MainPage.module.css';

function MainPage() {
  const burgersDB = useGetBurgersDB();
  const isLocked = true;

  return (
    <Wrapper>
      <main className={styles.main}>
        <BurgerIngredients cards={burgersDB} />
        <BurgerConstractor cards={burgersDB} isLocked={isLocked} />
      </main>
    </Wrapper>
  );
}

export default MainPage;
