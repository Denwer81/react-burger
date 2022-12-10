import React, { FC } from 'react';
import { useAppSelector } from '../../services/hooks/useRedux';
import { getFeedOrders, getFeedTotal, getFeedTotalToday } from '../../services/selectors/selectors';
import { IWebsocketOrder, TOrderStatus } from '../../services/types/feed';

import styles from './FeedSummury.module.css';

const FeedSummary: FC = React.memo(() => {
  const feedOrders = useAppSelector(getFeedOrders);
  const feedTotal = useAppSelector(getFeedTotal);
  const feedTotalToday = useAppSelector(getFeedTotalToday);

  const getOrdersNumbers = (orders: IWebsocketOrder[], orderStatus: TOrderStatus): number[] => {
    const sortedOrders = orders.filter(item => item.status === orderStatus)

    return sortedOrders.map(item => item.number).slice(0, 10)
  };

  const column = (text: string, status: TOrderStatus) => {
    return (
      <div className={styles.column}>
        <h2 className="text text_type_main-medium">{text}</h2>
        <ul className={`${styles.list} mt-6`}>
          {getOrdersNumbers(feedOrders, status).length ? (
            getOrdersNumbers(feedOrders, status).map((item) => (
              <li key={item}
                className={`${styles.orderDone} text text_type_digits-default mb-2`}>
                {item}
              </li>
            ))
          ) : (
            <p className={`${styles.orderDone} text text_type_digits-default mb-2`}>...</p>
          )}
        </ul>
      </div>
    )
  }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {column('Готовы:', 'done')}
        {column('В работе:', 'pending')}
      </div>
      <div className="mt-9">
        <h2 className="text text_type_main-medium">Выполнено за все время:</h2>
        <p className={`${styles.order} text text_type_digits-large`}>{feedTotal}</p>
      </div>
      <div className="mt-15">
        <h2 className="text text_type_main-medium">Выполнено за сегодня:</h2>
        <p className={`${styles.order} text text_type_digits-large`}>
          {feedTotalToday}
        </p>
      </div>
    </section>
  );
});

export default FeedSummary;