import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { useParams } from 'react-router-dom';
import { getAllIngredients } from '../../services/selectors/selectors';
import { setIngredient } from '../../services/slices/viewedIngredient';

import styles from './IngredientDetails.module.css';

function IngredientDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const allIngredients = useSelector(getAllIngredients);
  const viewedIngredient = allIngredients
    .find((item) => item._id === params.ingredientId)
  const { name, image_large, calories, proteins, fat, carbohydrates } = viewedIngredient || {};

  useEffect(() => {
    dispatch(setIngredient(viewedIngredient))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      <h1
        className={`${styles.title} ${!location.state && styles.titleOpenInNewPage} text text_type_main-large`}>
        Детали ингредиента
      </h1>
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
