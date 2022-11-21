import React, { FC } from 'react';

import styles from './Empty.module.css';

interface IEmpty {
  title: string;
  text: string;
};

const Empty: FC<IEmpty> = ({ title, text }) => {

  return (
    <div className={styles.container}>
      <h2 className='text text_type_main-medium mb-3'>{title}</h2>
      <p
        className={'text text_type_main-default'}>{text}</p>
    </div>
  )
}

export default React.memo(Empty);
