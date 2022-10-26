import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { ingredientDetailsPropTypes } from '../../utils/propsTypes';
import IngredientsCard from '../IngredientsCard/IngredientsCard';
import Spinner from '../Ui/Spinner/Spinner';
import SomethingWrong from '../Ui/SomethingWrong/SomethingWrong';

import styles from './BurgerIngredientsCategory.module.css';

const BurgerIngredientsCategory = React.forwardRef(({ title, cards }, ref) => {
  const loadingStatus = useSelector(state => state.ingredients.loadingStatus);

  return (
    <div ref={ref}>
      <h2 className={`${styles.title} text text_type_main-medium mt-10 mb-6`}>{title}</h2>
      {loadingStatus === 'loading' && <Spinner />}
      {loadingStatus === 'error' && <SomethingWrong />}
      <ul className={`${styles.ingredientsList}`}>
        {
          cards.map((card) => {
            return (
              <IngredientsCard key={card._id} card={card} />
            )
          })
        }
      </ul>
    </div>
  )
})

BurgerIngredientsCategory.propTypes = {
  cards: PropTypes.arrayOf(ingredientDetailsPropTypes).isRequired,
  title: PropTypes.string.isRequired
};

export default React.memo(BurgerIngredientsCategory);