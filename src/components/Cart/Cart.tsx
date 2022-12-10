import React, { FC } from 'react';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { getCartPrice } from '../../services/selectors/selectors';
import useOrder from '../../services/hooks/useOrder';

import styles from './Cart.module.css';
import { useAppSelector } from '../../services/hooks/useRedux';
import Spinner from '../Ui/Spinner/Spinner';

const Cart: FC = () => {
  const cartPrice = useAppSelector(getCartPrice);
  const { handleGetOrder, isDisableButton } = useOrder();


  return (
    <div className={`${styles.container} mt-10`}>
      {
        isDisableButton &&
        <div className={styles.spiner}>
          <Spinner />
        </div>
      }
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
