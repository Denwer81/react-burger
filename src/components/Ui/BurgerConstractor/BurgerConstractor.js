import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  ConstructorElement,
  DragIcon,
  CurrencyIcon,
  Button
} from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../Wrapper/Wrapper';

import styles from './BurgerConstractor.module.css';

const cardPropTypes = PropTypes.shape({
  _id: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired,
});

BurgerConstractor.propTypes = {
  cards: PropTypes.arrayOf(cardPropTypes).isRequired,
};

function BurgerConstractor({ cards }) {
  console.log(cards)
  const [isLocked, setIsLoked] = useState(true)


  
  const totalPrice = cards.reduce((sum, item) => {
    return sum + item.price
  }, 0);

  const bun = (direction, text) => {
    return (
      <div className='mr-2'>
        <ConstructorElement
          type={direction}
          isLocked={isLocked}
          text={`'Краторная булка N-200i (${text})'`}
          price={200}
          thumbnail={'https://code.s3.yandex.net/react/code/bun-02.png'}
        />
      </div>
    )
  }

  const checkout = () => console.log('checkout')

  return (
    <Wrapper>
      <section className={`${styles.burgerConstractor} mt-25`}>
      {bun('top', 'верх')}
        <ul className={`${styles.ingredientsList} mt-4`}>
          {
            cards.map((card) => {
              return (
                <li className={styles.ingredient} key={card._id}>
                  {
                    !card.isLocked && <DragIcon />
                  }
                  <div className='ml-4'>
                    <ConstructorElement
                      type={card.type}
                      isLocked={card.isLocked}
                      text={card.text}
                      price={card.price}
                      thumbnail={card.thumbnail}
                    />
                  </div>
                </li>
              )
            })
          }
        </ul>
        {bun('bottom', 'низ')}
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

export default BurgerConstractor;