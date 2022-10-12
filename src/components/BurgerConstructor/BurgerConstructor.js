import React, { useContext, useEffect, useState } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../Ui/Wrapper/Wrapper';
import constructorContext from '../../context/constructorContext';
import ingrediensFilter from '../../hooks/useFilter';
import Cart from '../Cart/Cart';

import styles from './BurgerConstructor.module.css';

function BurgerConstructor() {
  const [isLocked, setIsLocked] = useState(false);
  const { burgersDB } = useContext(constructorContext)
  const {
    burgerConstractorBun,
    burgerConstractorFilling,
    burgerConstractorIngreduents } = ingrediensFilter(burgersDB);

  useEffect(() => {
    if (burgerConstractorFilling.length > 0) {
      setIsLocked(true);
    }
  }, [burgerConstractorFilling])

  const bunElem = (direction, text) => {
    return (
      <div className='mr-2' style={{ minHeight: 80 }}>
        {
          burgerConstractorBun &&
          <ConstructorElement
            type={direction}
            isLocked={isLocked}
            text={`'${burgerConstractorBun.name} (${text})'`}
            price={burgerConstractorBun.price}
            thumbnail={burgerConstractorBun.image} />
        }
      </div>
    )
  }

  return (
    <Wrapper>
      <section className={`${styles.burgerConstractor} mt-25`}>
        {bunElem('top', 'верх')}
        <ul className={`${styles.ingredientsList} mt-4`}>
          {
            burgerConstractorFilling.map((card) => {
              return (
                <li className={styles.ingredient} key={card._id}>
                  <DragIcon />
                  <div className={styles.elem}>
                    <ConstructorElement
                      text={card.name}
                      price={card.price}
                      thumbnail={card.image} />
                  </div>
                </li>
              )
            })
          }
        </ul>
        {bunElem('bottom', 'низ')}
        <Cart cards={burgerConstractorIngreduents} />
      </section>
    </Wrapper>
  )
}

export default BurgerConstructor;
