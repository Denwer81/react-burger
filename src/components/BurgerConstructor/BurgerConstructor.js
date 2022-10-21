import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../Ui/Wrapper/Wrapper';
import Cart from '../Cart/Cart';
import { deleteIngredient } from '../../services/BurgerConstructor';

import styles from './BurgerConstructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const [isLocked, setIsLocked] = useState(false);
  const bun = useSelector(state => state.cart.cartBun);
  const ingredient = useSelector(state => state.cart.cartIngredients);

  useEffect(() => {
    ingredient.length === 0 ? setIsLocked(false) : setIsLocked(true)
  }, [ingredient]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(card) {


    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  })

  const handleDelete = (id) => {
    dispatch(deleteIngredient(id));
  };

  const bunElem = (direction, text) => {
    const bunElem = bun[0];

    return (
      <div className='mr-7' style={{ minHeight: 80 }}>
        {
          bun.length !== 0 &&
          <ConstructorElement
            handleClose={() => handleDelete(bunElem.consructorId)}
            type={direction}
            isLocked={isLocked}
            text={`'${bunElem.name} (${text})'`}
            price={bunElem.price}
            thumbnail={bunElem.image} />
        }
      </div>
    )
  }

  return (
    <Wrapper>
      <section
        ref={dropTarget}
        className={`${styles.burgerConstractor} ${isHover && styles.hover} mt-25`}>

        {bunElem('top', 'верх')}
        <ul className={`${styles.ingredientsList} mt-4`}>
          {
            ingredient.length === 0 && bun.length === 0
              ? (
                <li style={{ margin: 'auto', alignSelf: 'center' }}>
                  <h2 className='text text_type_main-medium mb-3'>В корзине пусто.</h2>
                  <p className={`text text_type_main-default ${styles.title}`}>Перетащите сюда ингредиенты...</p>
                </li>
              )
              : <></>
          }
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
