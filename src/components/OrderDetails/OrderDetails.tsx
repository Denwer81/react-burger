import React, { useEffect } from 'react';
import Spinner from '../Ui/Spinner/Spinner';
import SomethingWrong from '../Ui/SomethingWrong/SomethingWrong';
import { getOrderNumber, getOrderLoadingStatus, getOrderError } from '../../services/selectors/selectors';
import { useLocation, useParams } from 'react-router-dom';
import { fetchGetOrder } from '../../services/slices/order';
import { useAppDispatch, useAppSelector } from '../../services/hooks/useRedux';

import done from '../../image/done.png';
import styles from './OrderDetails.module.css';

const OrderDetails = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const orderNumber = useAppSelector(getOrderNumber);
  const orderError = useAppSelector(getOrderError);
  const orderLoadingStatus = useAppSelector(getOrderLoadingStatus);
  const { orderNumber: number } = useParams();

  useEffect(() => {
    if (!location.state && number) {
      console.log(number)
      dispatch(fetchGetOrder(Number(number)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      {orderError && <SomethingWrong error={orderError} />}
      <p className={`${styles.id} text text_type_digits-large`}>
        {orderNumber}
      </p>
      {orderLoadingStatus === 'loading' && <Spinner />}
      {!orderError && <h1 className='text text_type_main-medium mb-15'>идентификатор заказа</h1>}
      <img className={styles.image} src={done} alt={'Готово'} />
      <p className='text text_type_main-default mb-2'>Ваш Заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-30'>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export default OrderDetails;
