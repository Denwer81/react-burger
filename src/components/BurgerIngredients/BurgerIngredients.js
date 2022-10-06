import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cardPropTypes } from '../../utils/propsTypes';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerIngredientsCategory from '../BurgerIngredientsCategory/BurgerIngredientsCategory';
import Wrapper from '../Ui/Wrapper/Wrapper';
import ingrediensFilter from '../../utils/ingrediensFilter';

import styles from './BurgerIngredients.module.css';

BurgerIngredients.propTypes = {
  cards: PropTypes.arrayOf(cardPropTypes).isRequired,
};

function BurgerIngredients({ cards }) {
  const [current, setCurrent] = useState('one')
  const { bun, main, sauce } = ingrediensFilter(cards)

  return (
    <Wrapper>
      <section className={styles.BurgerIngredients}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5`}>Собери бургер</h1>
        <div className={styles.tabContainer}>
          <Tab value="one" active={current === 'one'} onClick={setCurrent}>
            Булки
          </Tab>
          <Tab value="two" active={current === 'two'} onClick={setCurrent}>
            Cоусы
          </Tab>
          <Tab value="three" active={current === 'three'} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
        <div className={styles.BurgerContainer}>
          <BurgerIngredientsCategory title={'Булки'} cards={bun} />
          <BurgerIngredientsCategory title={'Соусы'} cards={sauce} />
          <BurgerIngredientsCategory title={'Начинки'} cards={main} />
        </div>
      </section>
    </Wrapper>
  )
}

export default BurgerIngredients;