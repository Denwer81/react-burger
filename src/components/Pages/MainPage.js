import React from 'react';
import Wrapper from '../Ui/Wrapper/Wrapper';
import BurgerConstractor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';
import data from '../../utils/data';
import ingredientsData from '../../utils/ingredientsData';

import styles from './MainPage.module.css';

function MainPage() {
  const isLocked = true;

  return (
    <Wrapper>
      <main className={styles.main}>
        <BurgerIngredients cards={data} />
        <BurgerConstractor cards={ingredientsData} isLocked={ isLocked }/>
      </main>
    </Wrapper>
  );
}

export default MainPage;


