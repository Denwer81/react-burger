import React, { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {  useAppSelector } from '../../services/hooks/useRedux';
import { getFeedOrders } from '../../services/selectors/selectors';
import OrderCard from '../OrderCard/OrderCard';

import styles from './FeedList.module.css';

const FeedList: FC = React.memo(() => {
  const location = useLocation();
  const feedOrders = useAppSelector(getFeedOrders);

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Лента заказов</h1>
      <ul className={styles.list}>
        {feedOrders.map((order) => (
          <li key={order._id} className={styles.item}>
            <Link
              to={`/feed/${order._id}`}
              state={{ background: location }}
              className={styles.link}
            >
              <OrderCard order={order} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default FeedList;
