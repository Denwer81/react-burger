import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { IIngredient } from '../../services/types/burgerIngredients';

import styles from './OrderItem.module.css';

interface IOrderItem {
  item: IIngredient,
  count: number,
}

const OrderItem: FC<IOrderItem> = React.memo(({ item, count }) => {
  return (
    <div className={`${styles.container} mb-4`}>
      <div className={styles.imageContainer}>
      <img src={item.image_mobile} alt={item.name} className={styles.image} />
      </div>
      <h3 className={`${styles.title} text text_type_main-default ml-4`}>
        {item.name}
      </h3>
      <p className={styles.price}>
        <span className="text text_type_digits-default text_color_primary mr-2">
          {item.price} x {count}
        </span>
        <CurrencyIcon type="primary" />
      </p>
    </div>
  );
});

export default OrderItem;