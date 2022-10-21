import React, { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCategory from '../BurgerIngredientsCategory/BurgerIngredientsCategory';
import Wrapper from '../Ui/Wrapper/Wrapper';
import debounce from '../../utils/debounce';

import styles from './BurgerIngredients.module.css';

function BurgerIngredients() {
  const bun = useSelector(state => state.ingredients.bun);
  const main = useSelector(state => state.ingredients.main);
  const sauce = useSelector(state => state.ingredients.sauce);
  const [currentTab, setCurrentTab] = useState('bun')
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const scrollToTab = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth"
    })
  };

  const handleSetCurrentTab = useCallback(() => {
    const offset = 240;
    const topOffset = containerRef.current.scrollTop;
    const bunTopOffset = topOffset - bunRef.current.offsetTop + offset;
    const sauceTopOffset = topOffset - sauceRef.current.offsetTop + offset;
    const mainTopOffset = topOffset - mainRef.current.offsetTop + offset;

    if (bunTopOffset >= 0) setCurrentTab('bun');
    if (sauceTopOffset >= 0) setCurrentTab('sauce');
    if (mainTopOffset >= 0) setCurrentTab('main');
  }, [bunRef, sauceRef, mainRef])

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
