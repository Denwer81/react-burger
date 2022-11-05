import React from 'react';
import styles from './Wrapper.module.css';

function Wrapper(props: any) {
  return (
    <div className={styles.wrapper}>{props.children}</div>
  )
}

export default React.memo(Wrapper);
