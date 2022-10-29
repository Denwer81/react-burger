import React from 'react';
import Spinner from '../Ui/Spinner/Spinner';
import SomethingWrong from '../Ui/SomethingWrong/SomethingWrong';
import { getOrderNumber, getOrderLoadingStatus } from '../../services/selectors/selectors'; 

import done from '../../image/done.jpg';
import styles from './OrderDetails.module.css';
import { useSelector } from 'react-redux';

function OrderDetails() {
  const orderNumber = useSelector(getOrderNumber);
  const orderLoadingStatus = useSelector(getOrderLoadingStatus);

  return (
    <>
      {orderLoadingStatus === 'error' && <SomethingWrong />}
      <p className={`${styles.id} text text_type_digits-large`}>
        {orderNumber && orderNumber.number}</p>
      {orderLoadingStatus === 'loading' && <Spinner />}
      {orderLoadingStatus === 'idle' && <h1 className='text text_type_main-medium mb-15'>идентификатор заказа</h1>}
      <img className={styles.image} src={done} alt={'Готово'} />
      <p className='text text_type_main-default mb-2'>Ваш Заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;