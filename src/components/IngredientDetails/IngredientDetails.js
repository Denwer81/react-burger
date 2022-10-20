import React from 'react';
import { useSelector } from 'react-redux';

import styles from './IngredientDetails.module.css';


function IngredientDetails() {
  const card = useSelector((state) => state.viewedIngredient.ingredient)
  const { name, image_large, calories, proteins, fat, carbohydrates } = card
  
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} text text_type_main-large`}>Детали ингредиента</h1>
      <img className={styles.image} src={image_large} alt={name} />
      <p className='text text_type_main-medium mt-4 mb-8'>{name}</p>
      <ul className={styles.list}>
        <li className={styles.item}>
          <p className='text text_type_main-default'>Калорий,ккал</p>
          <span className='text text_type_digits-default'>{calories}</span>
        </li>
        <li className={styles.item}>
          <p className='text text_type_main-default'>Белки, г</p>
          <span className='text text_type_digits-default'>{proteins}</span>
        </li>
        <li className={styles.item}>
          <p className='text text_type_main-default'>Жиры, г</p>
          <span className='text text_type_digits-default'>{fat}</span>
        </li>
        <li className={styles.item}>
          <p className='text text_type_main-default'>Углеводы, г</p>
          <span className='text text_type_digits-default'>{carbohydrates}</span>
        </li>
      </ul>
    </div>
  )
}

export default IngredientDetails;
