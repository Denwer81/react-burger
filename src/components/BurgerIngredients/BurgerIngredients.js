import React, {  useRef } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCategory from '../BurgerIngredientsCategory/BurgerIngredientsCategory';
import Wrapper from '../Ui/Wrapper/Wrapper';
import debounce from '../../utils/debounce';
import useScrollTab from '../../hooks/useScrollTab';

import styles from './BurgerIngredients.module.css';

function BurgerIngredients() {
  const bun = useSelector(state => state.ingredients.bun);
  const main = useSelector(state => state.ingredients.main);
  const sauce = useSelector(state => state.ingredients.sauce);
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const { scrollToTab, currentTab, handleSetCurrentTab } = useScrollTab({
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
          onScroll={debounce(handleSetCurrentTab, 150)}>
          <BurgerIngredientsCategory ref={bunRef} title={'Булки'} cards={bun} />
          <BurgerIngredientsCategory ref={sauceRef} title={'Соусы'} cards={sauce} />
          <BurgerIngredientsCategory ref={mainRef} title={'Начинки'} cards={main} />
        </div>
      </section>
    </Wrapper>
  )
}

export default BurgerIngredients;
