import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Wrapper from '../Ui/Wrapper/Wrapper';
import BurgerConstractor from '../BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients';

import styles from './MainPage.module.css';

function MainPage() {

  return (
    <Wrapper>
      <DndProvider backend={HTML5Backend}>
        <main className={styles.main}>
          <BurgerIngredients />
          <BurgerConstractor />
        </main>
      </DndProvider>
     </Wrapper>
  );
}

export default MainPage;
