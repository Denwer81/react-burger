import React, {  useRef } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCategory from '../BurgerIngredientsCategory/BurgerIngredientsCategory';
import Wrapper from '../Ui/Wrapper/Wrapper';
import useScrollTab from '../../services/hooks/useScrollTab';
import { getIngredientsBun, getIngredientsMain, getIngredientsSauce } from '../../services/selectors/selectors';
import { useAppSelector } from '../../services/hooks/useRedux';

import styles from './BurgerIngredients.module.css';

function BurgerIngredients() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bunRef = useRef<HTMLDivElement>(null);
  const sauceRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const ingredientsBun = useAppSelector(getIngredientsBun);
  const ingredientsmain = useAppSelector(getIngredientsMain);
  const ingredientsSauce = useAppSelector(getIngredientsSauce);
  const { scrollToTab, currentTab, debounceSetCurrentTab } = useScrollTab({
    containerRef,
    bunRef,
    sauceRef,
    mainRef
  });

  return (
    <Wrapper>
      <section className={styles.BurgerIngredients}>
        <h1 className={'text text_type_main-large mt-10 mb-5'}>Собери бургер</h1>
        <div className={styles.tabContainer}>
          <Tab
            value="one"
            active={currentTab === 'bun'}
            onClick={() => scrollToTab(bunRef)}>
            Булки
          </Tab>
          <Tab
            value="two"
            active={currentTab === 'sauce'}
            onClick={() => scrollToTab(sauceRef)}>
            Cоусы
          </Tab>
          <Tab
            value="three"
            active={currentTab === 'main'}
            onClick={() => scrollToTab(mainRef)}>
            Начинки
          </Tab>
        </div>
        <div
          ref={containerRef}
          className={styles.BurgerContainer}
          onScroll={debounceSetCurrentTab}>
          <BurgerIngredientsCategory ref={bunRef} title={'Булки'} cards={ingredientsBun} />
          <BurgerIngredientsCategory ref={sauceRef} title={'Соусы'} cards={ingredientsSauce} />
          <BurgerIngredientsCategory ref={mainRef} title={'Начинки'} cards={ingredientsmain} />
        </div>
      </section>
    </Wrapper>
  )
}

export default BurgerIngredients;
