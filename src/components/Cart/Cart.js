import React from 'react';
import PropTypes from 'prop-types';
import { cardPropTypes } from '../../utils/propsTypes';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Modals/Modal/Modal';
import OrderDetails from '../Modals/OrderDetails/OrderDetails';
import useModal from '../../hooks/useModal';

import styles from './Cart.module.css';

Cart.propTypes = {
  cards: PropTypes.arrayOf(cardPropTypes).isRequired,
};

function Cart({ cards }) {
  const { isOpen, handleOpen, handleClose, handleCloseOverlay } = useModal();
  const totalPrice = cards.reduce((sum, item) => sum + item.price, 0);

  return (
    <>
      <div className={`${styles.container} mt-10`}>
        <p className='text text_type_main-large'>{totalPrice}</p>
        <div className='ml-2 mr-10'>
          <CurrencyIcon type="primary" />
        </div>
        <Button
          onClick={handleOpen}
          type="primary"
          size="large"
          htmlType='button'>
          Оформить заказ
        </Button>
      </div>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        handleCloseOverlay={handleCloseOverlay}>
        <OrderDetails />
      </Modal>
    </>
  )
}

export default Cart;