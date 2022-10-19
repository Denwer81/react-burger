import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { cardPropTypes } from '../../utils/propsTypes';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../Ui/Modals/Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import useModal from '../../hooks/useModal';
import useCart from '../../hooks/useCart';
import { getOrder } from '../../utils/api';

import styles from './Cart.module.css';

Cart.propTypes = {
  cards: PropTypes.arrayOf(cardPropTypes).isRequired,
};

function Cart({ cards }) {
  const [order, setOrder] = useState(null);
  const { isOpen, handleOpen, handleClose, handleCloseOverlay } = useModal();
  const { cart, price } = useCart(cards);

  const handleGetOrder = () => {
    getOrder({ ingredients: cart })
      .then(res => setOrder(res))
      .catch(err => console.log(err))
      handleOpen()
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
        handleClose={handleClose}
        handleCloseOverlay={handleCloseOverlay}>
        <OrderDetails order={ order } />
      </Modal>
    </>
  )
}

export default Cart;
