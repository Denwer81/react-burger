import React, { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCartBun, getCartIngredients } from '../../services/selectors/selectors';
import { deleteIngredient } from '../../services/slices/burgerConstructor';
import useDropBurgerConstructor from '../../services/hooks/useDropBurgerConstructor';
import { getIsLocked } from '../../services/selectors/selectors';

import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList';
import Wrapper from '../Ui/Wrapper/Wrapper';
import Cart from '../Cart/Cart';
import Empty from '../Ui/Empty/Empty';

import styles from './BurgerConstructor.module.css';

const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const isLocked = useSelector(getIsLocked);
  const cartBun = useSelector(getCartBun);
  const cartIngredients = useSelector(getCartIngredients);
  const { isHover, dropTarget, debouncedMoveCard } = useDropBurgerConstructor();

  const handleDelete = (consructorId: string) => {
    dispatch(deleteIngredient(consructorId));
  };

  const bunElem = (direction: 'top' | 'bottom', text: 'верх' | 'низ') => {
    const bunElem = cartBun[0];

    return (
      <div className={styles.container}>
        {
          cartBun.length !== 0 &&
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
            (!cartIngredients.length && !cartBun.length)
              ?
              <li className={`${styles.ingredient}`}>
                <Empty
                  title={'В корзине пусто'}
                  text={'Перетащите сюда ингредиенты...'} />
              </li>
              :
              cartIngredients.map((card, index: number) => {
                return (
                  <BurgerConstructorList
                    key={card.consructorId}
                    moveCard={debouncedMoveCard}
                    item={card}
                    index={index} />
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
