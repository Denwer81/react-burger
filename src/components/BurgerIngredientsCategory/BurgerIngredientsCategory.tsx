import React, { forwardRef } from 'react';
import IngredientsCard from '../IngredientsCard/IngredientsCard';
import SomethingWrong from '../Ui/SomethingWrong/SomethingWrong';
import Spinner from '../Ui/Spinner/Spinner';
import { getIngredientsLoadingStatus } from '../../services/selectors/selectors';
import { IIngredient } from '../../services/types/burgerIngredients';
import { useAppSelector } from '../../services/hooks/useRedux';

import styles from './BurgerIngredientsCategory.module.css';

interface IBurgerIngredientsCategory {
  title: string;
  cards: IIngredient[];
}

const BurgerIngredientsCategory =
  forwardRef<HTMLDivElement, IBurgerIngredientsCategory>(({ title, cards }, ref) => {
  const ingredientsLoadingStatus = useAppSelector(getIngredientsLoadingStatus)

  return (
    <div ref={ref}>
      <h2 className={`${styles.title} text text_type_main-medium mt-10 mb-6`}>{title}</h2>
      {ingredientsLoadingStatus === 'loading' && <Spinner />}
      {ingredientsLoadingStatus === 'error' && <SomethingWrong />}
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

export default React.memo(BurgerIngredientsCategory);
