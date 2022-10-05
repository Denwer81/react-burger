import React from 'react';
import PropTypes from 'prop-types';
import IngredientsCard from '../IngredientsCard/IngredientsCard';
import styles from './BurgerIngredientsCategory.module.css';

const cardPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

BurgerIngredients.propTypes = {
  cards: PropTypes.arrayOf(cardPropTypes).isRequired,
  title: PropTypes.string.isRequired
};

function BurgerIngredients({ title, cards }) {
  const count = 1;
  return (
    <>
      <h2 className={`${styles.title} text text_type_main-medium mt-10 mb-6`}>{title}</h2>
      <ul className={`${styles.ingredientsList}`}>
        {
          cards.map((card) => {
            return (
              <IngredientsCard
                key={card._id}
                _id={card._id}
                name={card.name}
                price={card.price}
                image={card.image}
                count={count}
              />
            )
          })
        }
      </ul>
    </>
  )
}

export default BurgerIngredients;