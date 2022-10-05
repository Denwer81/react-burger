import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../Ui/Wrapper/Wrapper';

import styles from './BurgerConstructor.module.css';

const cardPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
});

BurgerConstructor.propTypes = {
  cards: PropTypes.arrayOf(cardPropTypes).isRequired,
};

function BurgerConstructor({ cards }) {
  const bun = cards.filter((item) => item.type === 'bun')[0]
  const main = cards.filter((item) => item.type === 'main')
  const sauce = cards.filter((item) => item.type === 'sauce')

  const totalPrice = cards.reduce((sum, item) => {
    return sum + item.price
  }, 0);

  const bunElem = (direction, text) => {
    return (
      <div className='mr-2'>
        <ConstructorElement
          type={direction}
          // isLocked={bunCard.isLocked}
          text={`'${bun.name} (${text})'`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    )
  }

  const checkout = () => console.log('checkout')
  return (
    <Wrapper>
      <section className={`${styles.burgerConstractor} mt-25`}>
      {bun && bunElem('top', 'верх')}
        <ul className={`${styles.ingredientsList} mt-4`}>
          {
            [...main, ...sauce].map((card) => {
              return (
                <li className={styles.ingredient} key={card._id}>
                  {
                    !card.isLocked && <DragIcon />
                  }
                  <div className={styles.elem}>
                    <ConstructorElement
                      type={card.type}
                      isLocked={card.isLocked}
                      text={card.name}
                      price={card.price}
                      thumbnail={card.image}
                    />
                  </div>
                </li>
              )
            })
          }
        </ul>
        {bun && bunElem('bottom', 'низ')}
        <div className={`${styles.container} mt-10`}>
          <p className='text text_type_main-large'>{totalPrice}</p>
          <div className='ml-2 mr-10'>
            <CurrencyIcon type="primary" />
          </div>
          <Button onClick={checkout} type="primary" size="large" htmlType='button' >Оформить заказ</Button>
        </div>
      </section>
    </Wrapper>
  )
}

export default BurgerConstructor;