import React, { useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from "react-dnd";
import { nanoid } from '@reduxjs/toolkit';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../Ui/Wrapper/Wrapper';
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList';
import Empty from '../Ui/Empty/Empty';
import Cart from '../Cart/Cart';
import {
  addCartBun,
  addIngredient,
  updateIngredient,
  deleteIngredient
} from '../../services/BurgerConstructor';

import styles from './BurgerConstructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const [isLocked, setIsLocked] = useState(false);
  const bun = useSelector(state => state.cart.cartBun);
  const ingredients = useSelector(state => state.cart.cartIngredients);

  useEffect(() => {
    ingredients.length === 0 ? setIsLocked(false) : setIsLocked(true)
  }, [ingredients]);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(card) {
      const cardWithId = { ...card, consructorId: nanoid() }

      if (card.type === 'bun') {
        dispatch(addCartBun(cardWithId))
      } else {
        dispatch(addIngredient(cardWithId))
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });

  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients]

    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)

    dispatch(updateIngredient(newCards));
  }, [ingredients, dispatch]);

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
            (ingredients.length === 0 && bun.length === 0)
              ?
              <Empty
                title={'В корзине пусто'}
                text={'Перетащите сюда ингредиенты...'}>
              </Empty>
              :
              ingredients.map((card, index) => {
                return (
                  <BurgerConstructorList
                    key={card.consructorId}
                    moveCard={moveCard}
                    item={card}
                    index={index}>
                  </BurgerConstructorList>
                )
              })
          }
        </ul>
        {bunElem('bottom', 'низ')}
        <Cart />
      </section>
    </Wrapper>
  )
}

export default BurgerConstructor;
