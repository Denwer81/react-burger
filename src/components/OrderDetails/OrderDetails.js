import React from 'react';
import PropTypes from 'prop-types';
import done from '../../image/done.jpg';

import styles from './OrderDetails.module.css';

OrderDetails.propTypes = {
  order: PropTypes.object,
};

function OrderDetails({ order }) {
  return (
    <>
      <p className={`${styles.id} text text_type_digits-large`}>
        {order && order.order.number}</p>
      <h1 className='text text_type_main-medium mb-15'>идентификатор заказа</h1>
      <img className={styles.image} src={done} alt={'Готово'} />
      <p className='text text_type_main-default mb-2'>Ваш Заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;