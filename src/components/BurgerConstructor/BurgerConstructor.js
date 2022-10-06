import React from 'react';
import PropTypes from 'prop-types';
import { cardPropTypes } from '../../utils/propsTypes';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../Ui/Wrapper/Wrapper';
import ingrediensFilter from '../../utils/ingrediensFilter';

import styles from './BurgerConstructor.module.css';

BurgerConstructor.propTypes = {
  cards: PropTypes.arrayOf(cardPropTypes).isRequired,
  isLocked: PropTypes.bool
};

function BurgerConstructor({ cards, isLocked }) {
  const { bun: [bun], main, sauce } = ingrediensFilter(cards)
  const totalPrice = cards.reduce((sum, item) => sum + item.price, 0);
  const checkout = () => console.log('checkout')
  
  const bunElem = (direction, text) => {
    return (
      <div className='mr-2'>
        <ConstructorElement
          type={direction}
          isLocked={isLocked}
          text={`'${bun.name} (${text})'`}
          price={bun.price}
          thumbnail={bun.image}
        />
      </div>
    )
  }

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