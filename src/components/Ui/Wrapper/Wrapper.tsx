import React, { FC, ReactNode } from 'react';

import styles from './Wrapper.module.css';

type TProps = {
  children: ReactNode;
};

const Wrapper: FC<TProps> = (props) => {
  return (
    <div className={styles.wrapper}>{props.children}</div>
  )
}

export default React.memo(Wrapper);
