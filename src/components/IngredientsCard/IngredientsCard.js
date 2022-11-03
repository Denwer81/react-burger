import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { ingredientDetailsPropTypes } from '../../utils/propsTypes';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useDragIngredientsCard from '../../services/hooks/useDragIngredientsCard';
import { getCounters } from '../../services/selectors/selectors';

import styles from './IngredientsCard.module.css';

IngredientsCard.propTypes = {
  card: PropTypes.shape({ ingredientDetailsPropTypes }).isRequired,
};

function IngredientsCard({ card }) {
  const location = useLocation();
  const { name, image, price } = card;
  const { isDrag, dragRef } = useDragIngredientsCard({ card });
  const counter = useSelector(getCounters)
  const ingredientId = card._id;

  return (
      <li ref={dragRef}>
        <Link
          to={`/ingredients/${ingredientId}`}
          state={{ background: location }}
          className={`${styles.card} ${isDrag && styles.drag}`} >
          {counter[card._id] ? <Counter count={counter[card._id]} size="default" /> : ''}
          <img className={styles.image} src={image} alt={name} />
          <div className={styles.priceContainer}>
            <p className='text text_type_main-medium mr-2'>{price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <p className={`text text_type_main-default ${styles.title}`}>{name}</p>
        </Link>
      </li>
  )
}

export default IngredientsCard;
