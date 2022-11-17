import React from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Outlet } from "react-router-dom";
import Wrapper from '../../components/Ui/Wrapper/Wrapper';
import BurgerConstractor from '../../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../../components/BurgerIngredients/BurgerIngredients';

import styles from './MainPage.module.css';

const MainPage = () => {

  return (
    <>
      <Wrapper>
        <DndProvider backend={HTML5Backend}>
          <main className={styles.main}>
            <BurgerIngredients />
            <BurgerConstractor />
          </main>
        </DndProvider>
      </Wrapper>
      <Outlet />
    </>
  );
}

export default MainPage;
