import React from 'react';
import Wrapper from '../Ui/Wrapper/Wrapper';
import BurgerConstractor from '../Ui/BurgerConstractor/BurgerConstractor';
import BurgerIngredients from '../Ui/BurgerIngredients/BurgerIngredients';
import data from '../../utils/data';
import ingredientsData from '../../utils/ingredientsData';

import styles from './MainPage.module.css';

function MainPage() {
  return (
    <Wrapper>
      <main className={styles.main}>
        <BurgerIngredients cards={data} />
        <BurgerConstractor cards={ingredientsData} />
      </main>
    </Wrapper>
  );
}

export default MainPage;


