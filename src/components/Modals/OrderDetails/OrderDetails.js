import React from 'react';
import done from '../../../image/done.jpg';

import styles from './OrderDetails.module.css';

function OrderDetails() {
  return (
    <>
      <p className={`${styles.id} text text_type_digits-large`}>034536</p>
      <h1 className='text text_type_main-medium mb-15'>идентификатор заказа</h1>
      <img className={styles.image} src={done} alt={'Готово'} />
      <p className='text text_type_main-default mb-2'>Ваш Заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mb-30'>Дождитесь готовности на орбитальной станции</p>
    </>
  )
}

export default OrderDetails;