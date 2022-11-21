import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCartPrice } from '../../services/selectors/selectors';
import useOrder from '../../services/hooks/useOrder';

import styles from './Cart.module.css';

const Cart: FC = () => {
  const cartPrice = useSelector(getCartPrice);
  const {handleGetOrder, isDisableButton } = useOrder();

  return (
    <div className={`${styles.container} mt-10`}>
      <p className='text text_type_main-large'>{cartPrice}</p>
      <div className='ml-2 mr-10'>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        onClick={handleGetOrder}
        type="primary"
        size="large"
        htmlType='button'
        disabled={isDisableButton}>
        Оформить заказ
      </Button>
    </div>
  )
}

export default Cart;
