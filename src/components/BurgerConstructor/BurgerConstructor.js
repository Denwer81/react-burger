import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../Ui/Wrapper/Wrapper';
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList';
import Empty from '../Ui/Empty/Empty';
import Cart from '../Cart/Cart';
import { deleteIngredient } from '../../services/BurgerConstructor';
import useDropBurgerConstructor from './hooks/useDropBurgerConstructor';

import styles from './BurgerConstructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const [isLocked, setIsLocked] = useState(false);
  const bun = useSelector(state => state.cart.cartBun);
  const ingredients = useSelector(state => state.cart.cartIngredients);
  const { isHover, dropTarget, moveCard } = useDropBurgerConstructor();

  useEffect(() => {
    ingredients.length === 0 ? setIsLocked(false) : setIsLocked(true)
  }, [ingredients]);

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
            (!ingredients.length && !bun.length)
              ?
              <li style={{ margin: 'auto', alignSelf: 'center' }}>
                <Empty
                  title={'В корзине пусто'}
                  text={'Перетащите сюда ингредиенты...'}>
                </Empty>
              </li>
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
