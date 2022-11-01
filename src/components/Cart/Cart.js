import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Ui/Modals/Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { clearCart } from '../../services/slices/BurgerConstructor';
import { fetchCart, clearOrder } from '../../services/slices/order';
import useModal from '../../services/hooks/useModal';
import { getCartIdList, getCartPrice } from '../../services/selectors/selectors';
import useClearData from '../../services/hooks/useClearData';
import { getOrderNumber } from '../../services/selectors/selectors';

import styles from './Cart.module.css';

function Cart() {
  const dispatch = useDispatch();
  const orderNumber = useSelector(getOrderNumber);
  const { isOpen, handleOpen, handleClose } = useModal();
  const cartIdList = useSelector(getCartIdList);
  const cartPrice = useSelector(getCartPrice);
  const { clearData } = useClearData()

  const handleGetOrder = () => {
    if (cartIdList.length !== 0) {
      dispatch(fetchCart({ ingredients: cartIdList }));
      handleOpen();
    }
  };

  const closeModal = () => {
    handleClose();
    if (orderNumber) {
      clearData(clearOrder);
      clearData(clearCart);
    }
  }

  return (
    <>
      <div className={`${styles.container} mt-10`}>
        <p className='text text_type_main-large'>{cartPrice}</p>
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
        handleClose={closeModal}>
        <OrderDetails />
      </Modal>
    </>
  )
}

export default Cart;
