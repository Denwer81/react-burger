import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import OrderCard from '../../components/OrderCard/OrderCard';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import { useAppDispatch, useAppSelector } from '../../services/hooks/useRedux';
import { getFeedOrders } from '../../services/selectors/selectors';
import { wsConnect, wsConnetionClosed } from '../../services/slices/feed';
import { getCookie } from '../../utils/handleCookie';

import styles from './Orders.module.css';

const Orders = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const accessToken = getCookie('accessToken');
  const feedOrders = useAppSelector(getFeedOrders);

  const sortFeddOrders = [...feedOrders].reverse();

  useEffect(() => {
    if (accessToken) {
      dispatch(wsConnect(`?token=${accessToken.split(' ')[1]}`));
    }
    return () => {
      dispatch(wsConnetionClosed());
    };
  }, [dispatch, accessToken]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ProfileNav />
      </div>
      <ul className={styles.list}>
        {sortFeddOrders.map((order) => (
          <li key={order._id} className={styles.item}>
            <Link
              to={`/profile/orders/${order._id}`}
              state={{ background: location }}
              className={styles.link}
            >
              <OrderCard order={order} />
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default Orders;
