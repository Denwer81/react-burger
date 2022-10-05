import React from 'react';
import PropTypes from 'prop-types';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './IngredientsCard.module.css';

IngredientsCard.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  count: PropTypes.number,
};

function IngredientsCard({ name, image, price, count }) {
  return (
    <li className={`${styles.card}`}>
      {
        count ? <Counter count={count} size="default" /> : ''
      }
      <img className={styles.image} src={image} alt={name} />
      <div className={styles.priceContainer}>
        <p className='text text_type_main-medium mr-2'>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`text text_type_main-default ${styles.title}`}>{name}</p>
    </li>
  )
}

export default IngredientsCard;