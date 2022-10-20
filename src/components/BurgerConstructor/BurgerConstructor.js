import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../Ui/Wrapper/Wrapper';
import Cart from '../Cart/Cart';
import { deleteIngredient } from '../../services/BurgerConstructor';

import styles from './BurgerConstructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const bun = useSelector(state => state.cart.cartBun);
  const ingredient = useSelector(state => state.cart.cartIngredients);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
    ingredient.length === 0 ? setIsLocked(false) : setIsLocked(true)
  }, [ingredient])

  const handleDelete = (id) => {
    dispatch(deleteIngredient(id));
  };

  const bunElem = (direction, text) => {
    return (
      <div className='mr-7' style={{ minHeight: 80 }}>
        {
          bun.hasOwnProperty('_id') &&
          <ConstructorElement
            handleClose={() => handleDelete(bun.consructorId)}
            type={direction}
            isLocked={isLocked}
            text={`'${bun.name} (${text})'`}
            price={bun.price}
            thumbnail={bun.image} />
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
            ingredient.map((card) => {
              return (
                <li className={styles.ingredient} key={card.consructorId}>
                  <DragIcon />
                  <div className={styles.elem}>
                    <ConstructorElement
                      handleClose={() => handleDelete(card.consructorId)}
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
        <Cart cards={ingredient} />
      </section>
    </Wrapper>
  )
}

export default BurgerConstructor;
