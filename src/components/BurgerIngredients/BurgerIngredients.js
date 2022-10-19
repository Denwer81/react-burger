import React, { useState, useContext, useRef, useCallback } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCategory from '../BurgerIngredientsCategory/BurgerIngredientsCategory';
import Wrapper from '../Ui/Wrapper/Wrapper';
import ingrediensFilter from '../../hooks/useIngrediensFilter';
import ingredientsContext from '../../context/IngredientsContext'
import debounce from '../../utils/debounce';

import styles from './BurgerIngredients.module.css';

function BurgerIngredients() {
  const [current, setCurrent] = useState('bun')
  const { burgersDB } = useContext(ingredientsContext);
  const { bun, main, sauce } = ingrediensFilter(burgersDB)
  const containerRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const scrollToTab = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth"
    })
  };

  const setCurrentTab = useCallback(() => {
    const offset = 240;
    const topOffset = containerRef.current.scrollTop;
    const bunTopOffset = topOffset - bunRef.current.offsetTop + offset;
    const sauceTopOffset = topOffset - sauceRef.current.offsetTop + offset;
    const mainTopOffset = topOffset - mainRef.current.offsetTop + offset;

    if (bunTopOffset >= 0) setCurrent('bun');
    if (sauceTopOffset >= 0) setCurrent('sauce');
    if (mainTopOffset >= 0) setCurrent('main');
  }, [bunRef, sauceRef, mainRef])

  return (
    <Wrapper>
      <section className={styles.BurgerIngredients}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Собери бургер</h1>
        <div className={styles.tabContainer}>
          <Tab value="one" active={current === 'bun'} onClick={() => scrollToTab(bunRef)}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'sauce'} onClick={() => scrollToTab(sauceRef)}>
            Cоусы
          </Tab>
          <Tab value="three" active={current === 'main'} onClick={() => scrollToTab(mainRef)}>
            Начинки
          </Tab>
        </div>
        <div className={styles.BurgerContainer} ref={containerRef} onScroll={debounce(setCurrentTab, 150)}>
          <BurgerIngredientsCategory ref={bunRef} title={'Булки'} cards={bun} />
          <BurgerIngredientsCategory ref={sauceRef} title={'Соусы'} cards={sauce} />
          <BurgerIngredientsCategory ref={mainRef} title={'Начинки'} cards={main} />
        </div>
      </section>
    </Wrapper>
  )
}

export default BurgerIngredients;
