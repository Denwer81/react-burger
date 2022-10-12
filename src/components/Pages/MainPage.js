import React from 'react';
import Wrapper from '../Ui/Wrapper/Wrapper';
import BurgerConstractor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

import styles from './MainPage.module.css';

function MainPage() {

  return (
    <Wrapper>
      <main className={styles.main}>
        <BurgerIngredients />
        <BurgerConstractor />
      </main>
    </Wrapper>
  );
}

export default MainPage;
