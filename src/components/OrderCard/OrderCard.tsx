import React, { FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';
import { IWebsocketOrder } from '../../services/types/feed';
import { sortOrder } from '../../utils/sortOrder';
import dateFormated from '../../utils/dateFormated';

import styles from './OrderCard.module.css';
import { useAppSelector } from '../../services/hooks/useRedux';
import { getAllIngredients } from '../../services/selectors/selectors';

interface IOrderCard {
  order: IWebsocketOrder
}

const OrderCard: FC<IOrderCard> = React.memo(({ order }) => {
  const location = useLocation();
  const allIngredients = useAppSelector(getAllIngredients);
  const{price, ingredientMap, sortedIngredients} = sortOrder(order, allIngredients)

  const status = location.pathname.includes('/profile/orders');
  const statusStyle = order.status === 'done' ? styles.statusDone : 'text_color_primary';

  return (
    <div className={`${styles.card} pt-6 pb-6 pl-6 pr-6`}>
      <div className={styles.container}>
        <p className="text text_type_digits-default text_color_primary">
          #{order.number}
        </p>
        <p className="text text_type_main-default text_color_inactive">
          {dateFormated(order.createdAt)}
        </p>
      </div>
      <h2 className={`${styles.name} text text_type_main-medium mt-6 text_color_primary`}>
        {order.name}
      </h2>
      {status && (
        <p className={`text text_type_main-default mt-2 ${statusStyle}`}>
          {order.status === 'done' ? 'Выполнен'
            : order.status === 'pending' ? 'Готовится' : 'Создан'}
        </p>
      )}
      <div className={`${styles.container} mt-6`}>
        <ul className={styles.list}>
          {sortedIngredients.map((item, index) =>
            <li key={index}
              className={styles.itemContainer}
              style={{ right: index * 16, zIndex: 6 - index }}>
              <img src={item?.image_mobile} alt={item?.name} className={styles.image} />
            </li>
          )}
        </ul>
        {ingredientMap.size > 6 && (
          <span
            className={`${styles.count} text text_type_main-default`}>
            +{ingredientMap.size - 6}
          </span>
        )}
        <p className={styles.price}>
          <span className="text text_type_digits-default text_color_primary mr-2">
            {price}
          </span>
          <CurrencyIcon type="primary" />
        </p>
      </div>
    </div>
  );
});

export default OrderCard;
