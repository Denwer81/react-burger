import React from 'react';
import PropTypes from 'prop-types';
import { ingredientDetailsPropTypes } from '../../utils/propsTypes';
import IngredientsCard from '../IngredientsCard/IngredientsCard';

import styles from './BurgerIngredientsCategory.module.css';

BurgerIngredientsCategory.propTypes = {
  cards: PropTypes.arrayOf(ingredientDetailsPropTypes).isRequired,
  title: PropTypes.string.isRequired
};

function BurgerIngredientsCategory({ title, cards }) {
  const count = 1;

  return (
    <>
      <h2 className={`${styles.title} text text_type_main-medium mt-10 mb-6`}>{title}</h2>
        <ul className={`${styles.ingredientsList}`}>
          {
            cards.map((card) => {
              return (
                <IngredientsCard key={card._id} card={card} count={count} />
              )
            })
          }
        </ul>
    </>
  )
}

export default React.memo(BurgerIngredientsCategory);