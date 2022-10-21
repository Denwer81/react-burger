import React from 'react';
import done from '../../image/done.jpg';
import { useSelector } from 'react-redux';
import Spinner from '../Ui/Spinner/Spinner';
import SomethingWrong from '../Ui/SomethingWrong/SomethingWrong';

import styles from './OrderDetails.module.css';

function OrderDetails() {
  const orderNumber = useSelector((state) => state.order.orderNumber)
  const loadingStatus = useSelector((state) => state.order.loadingStatus)

  return (
    <>
      {loadingStatus === 'error' && <SomethingWrong></SomethingWrong>}
      <p className={`${styles.id} text text_type_digits-large`}>
        {orderNumber && orderNumber.number}</p>
      {loadingStatus === 'loading' && <Spinner></Spinner>}
      <h1 className='text text_type_main-medium mb-15'>идентификатор заказа</h1>
      <img className={styles.image} src={done} alt={'Готово'} />
      <p className='text text_type_main-default mb-2'>Ваш Заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;