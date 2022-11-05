import React from 'react';
import { useNavigate } from "react-router-dom";

import styles from './NotFound404.module.css';

function NotFound404() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1, { replace: true })
  };

  return (
    <main className={styles.main}>
      <h2 className={`${styles.title} text_type_digits-large`}>
        404
      </h2>
      <p className={`${styles.text} text text_type_main-default`}>
        такой страници нет...
      </p>
      <button
        className={`${styles.link} text_type_main-large`}
        onClick={handleClick}
        type='button'>
        назад
      </button>
    </main>
  );
}

export default NotFound404;