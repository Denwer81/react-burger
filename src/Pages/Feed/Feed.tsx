import React, { useEffect } from 'react';
import FeedList from '../../components/FeedList/FeedList';
import FeedSummary from '../../components/FeedSummury/FeedSummury';
import { useAppDispatch } from '../../services/hooks/useRedux';
import { wsConnect, wsConnetionClosed } from '../../services/slices/feed';

import styles from './Feed.module.css';

const Feed = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(wsConnect('/all'));
    return () => {
      dispatch(wsConnetionClosed());
    };
  }, [dispatch]);

  return (
    <main className={styles.main}>
      <FeedList />
      <FeedSummary />
    </main>
  );
}

export default Feed;
