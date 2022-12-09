import { useEffect, FC } from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useAppDispatch, useAppSelector } from '../../services/hooks/useRedux';
import { useLocation, useParams } from 'react-router-dom';
import { getAllIngredients, getFeedOrders } from '../../services/selectors/selectors';
import { sortOrder } from '../../utils/sortOrder';
import OrderItem from '../OrderItem/OrderItem';
import dateFormated from '../../utils/dateFormated';
import { wsConnect, wsConnetionClosed } from '../../services/slices/feed';
import useAuth from '../../services/hooks/useAuth';

import styles from './OrderInfo.module.css';

const OrderInfo: FC = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { getUser } = useAuth();
  const feedOrders = useAppSelector(getFeedOrders);
  const allIngredients = useAppSelector(getAllIngredients);

  const order = feedOrders.find(item => item._id === id)

  if (order) {
    var { price, ingredientMap, sortedIngredients } = sortOrder(order, allIngredients)
  }

  useEffect(() => {
    getUser();
    if (!location.state) {
      dispatch(wsConnect('/all'));
      return () => {
        dispatch(wsConnetionClosed());
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <main className={`${styles.main} pl-5 pr-5`}>
      <div className={`${styles.container} ${!location.state && styles.page}`}>
        <p className="text text_type_digits-default">#{order?.number}</p>
        <h2 className={`${styles.name} text text_type_main-medium mt-10 mb-3`}>
          {order?.name}
        </h2>
        <p className={`${styles.status} text text_type_main-default`}>
          {order?.status === 'done' ? 'Выполнен'
            : order?.status === 'pending' ? 'Готовится' : 'Создан'}
        </p>
        <p className={`${styles.name} text text_type_main-medium mt-15 mb-6`}>
          Состав:
        </p>
        <ul className={styles.list}>
          {sortedIngredients?.map((item, index) => (
            <li key={index}>
              {<OrderItem
                item={item}
                count={ingredientMap.get(item._id)} />}</li>
          ))}
        </ul>
        <div className={`${styles.bottom} mt-10`}>
          <p className="text text_type_main-default text_color_inactive">
            {dateFormated(order?.createdAt)}
          </p>
          <p className={styles.price}>
            <span className="text text_type_digits-default text_color_primary mr-2">
              {price}
            </span>
            <CurrencyIcon type="primary" />
          </p>
        </div>
      </div>
    </main>
  );
};

export default OrderInfo;