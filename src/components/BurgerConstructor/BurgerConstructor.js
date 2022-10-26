import React from 'react';
import { useDispatch } from 'react-redux';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Wrapper from '../Ui/Wrapper/Wrapper';
import BurgerConstructorList from '../BurgerConstructorList/BurgerConstructorList';
import Empty from '../Ui/Empty/Empty';
import Cart from '../Cart/Cart';
import useSelectors from '../../services/selectors';
import { deleteIngredient } from '../../services/slices/BurgerConstructor';
import useDropBurgerConstructor from '../../services/hooks/useDropBurgerConstructor';
import useIsLocked from '../../services/hooks/useIsLocked';

import styles from './BurgerConstructor.module.css';

function BurgerConstructor() {
  const dispatch = useDispatch();
  const { isLocked } = useIsLocked();
  const { cartBun, cartIngredients } = useSelectors();
  const { isHover, dropTarget, moveCard } = useDropBurgerConstructor();

  const handleDelete = (id) => {
    dispatch(deleteIngredient(id));
  };

  const bunElem = (direction, text) => {
    const bunElem = cartBun[0];

    return (
      <div className='mr-7' style={{ minHeight: 80 }}>
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
              <li style={{ margin: 'auto', alignSelf: 'center' }}>
                <Empty
                  title={'В корзине пусто'}
                  text={'Перетащите сюда ингредиенты...'}>
                </Empty>
              </li>
              :
              cartIngredients.map((card, index) => {
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
