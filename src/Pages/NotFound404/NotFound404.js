import React from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";

import styles from './NotFound404.module.css';

function NotFound404() {
  const navigate = useNavigate();
  const location = useLocation();
  console.log(navigate)
  console.log(location)

  return (
    <main className={styles.main}>
      <h2 className={`${styles.title} text_type_digits-large`}>
        404
      </h2>
      <p className={`${styles.text} text text_type_main-default`}>
        такой страници нет...
      </p>
      <Link className={`${styles.link} text_type_main-large`} to={navigate(-1, { replace: true })}>
        назад
      </Link>
    </main>
  );
}

export default NotFound404;