import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Ui/Modals/Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import useModal from '../../hooks/useModal';
import { cartIngredientsIdList, totalSumIngredients } from '../../services/BurgerConstructor';
import { fetchCart, clearOrder } from '../../services/order';

import styles from './Cart.module.css';

function Cart() {
  const dispatch = useDispatch();
  const bun = useSelector(state => state.cart.cartBun);
  const ingredients = useSelector(state => state.cart.cartIngredients);
  const cart = useSelector(state => state.cart.cartIngredientsIdList);
  const price = useSelector(state => state.cart.totalSumIngredients);
  const { isOpen, handleOpen, handleClose } = useModal(clearOrder);

  useEffect(() => {
    if (bun.length !== 0 || ingredients.length !== 0) {
      dispatch(cartIngredientsIdList())
      dispatch(totalSumIngredients())
    }
  },[dispatch, bun, ingredients])

  const handleGetOrder = () => {
    console.log(cart)
    if (cart.length !== 0) {
      dispatch(fetchCart({ ingredients: cart }));
      handleOpen();
    }
  };

  return (
    <>
      <div className={`${styles.container} mt-10`}>
        <p className='text text_type_main-large'>{price}</p>
        <div className='ml-2 mr-10'>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleGetOrder}
          type="primary"
          size="large"
          htmlType='button'>
          Оформить заказ
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}>
        <OrderDetails />
      </Modal>
    </>
  )
}

export default Cart;
