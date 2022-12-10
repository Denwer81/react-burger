import React, { FC } from 'react';
import { Link, useLocation } from "react-router-dom";
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useDragIngredientsCard from '../../services/hooks/useDragIngredientsCard';
import { getCounters } from '../../services/selectors/selectors';
import { IIngredient } from '../../services/types/burgerIngredients';

import styles from './IngredientsCard.module.css';
import { useAppSelector } from '../../services/hooks/useRedux';

interface IIngredientsCard{
  card: IIngredient
}

const IngredientsCard: FC<IIngredientsCard> = ({ card }) => {
  const location = useLocation();
  const { name, image, price } = card;
  const { isDrag, dragRef } = useDragIngredientsCard({ card });
  const counter = useAppSelector(getCounters)
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
