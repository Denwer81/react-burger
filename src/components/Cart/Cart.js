import React from 'react';
import { useDispatch } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Ui/Modals/Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { clearCart } from '../../services/slices/BurgerConstructor';
import { fetchCart, clearOrder } from '../../services/slices/order';
import useModal from '../../services/hooks/useModal';
import useGetCartIdList from '../../services/hooks/useGetCartdList';
import useGetCartPrice from '../../services/hooks/useGetCartPrice';
import useClearData from '../../services/hooks/useClearData';
import useSelectors from '../../services/selectors';

import styles from './Cart.module.css';

function Cart() {
  const dispatch = useDispatch();
  const { isOpen, handleOpen, handleClose } = useModal();
  const { cartIdList } = useGetCartIdList();
  const { cartPrice } = useGetCartPrice();
  const { orderNumber } = useSelectors();
  const { clearData } = useClearData()

  const handleGetOrder = () => {
    if (cartIdList.length !== 0) {
      dispatch(fetchCart({ ingredients: cartIdList }));
      handleOpen();
    }
  };

  const closeModal = (e) => {
    handleClose(e);
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
