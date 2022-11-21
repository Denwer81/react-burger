import React from 'react';
import Spinner from '../Ui/Spinner/Spinner';
import { useSelector } from 'react-redux';
import SomethingWrong from '../Ui/SomethingWrong/SomethingWrong';
import { getOrderNumber, getOrderLoadingStatus, getOrderError } from '../../services/selectors/selectors';

import done from '../../image/done.jpg';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
  const orderNumber = useSelector(getOrderNumber);
  const orderError = useSelector(getOrderError);
  const orderLoadingStatus = useSelector(getOrderLoadingStatus);

  return (
    <>
      {orderError && <SomethingWrong error={orderError} />}
      <p className={`${styles.id} text text_type_digits-large`}>
        {orderNumber}
      </p>
      {orderLoadingStatus === 'loading' && <Spinner />}
      {orderError === 'idle' && <h1 className='text text_type_main-medium mb-15'>идентификатор заказа</h1>}
      <img className={styles.image} src={done} alt={'Готово'} />
      <p className='text text_type_main-default mb-2'>Ваш Заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-30'>
        Дождитесь готовности на орбитальной станции
      </p>
    </>
  )
}

export default OrderDetails;
