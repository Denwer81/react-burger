import React, { FC } from 'react';

import styles from './SomethingWrong.module.css';

interface ISomethingWrong {
  error?: string;
}

const SomethingWrong: FC<ISomethingWrong> = ({ error }) => {
  return (
    <>
      <h2 className={`${styles.title} text text_type_main-medium mb-6 `}>
        Что-то пошло не так...
      </h2>
      <p className={'text text_type_main-default mb-10'}>
        {error || "Попробуйте перезагрузить страницу"}
      </p>
    </>
  )
}

export default SomethingWrong;
