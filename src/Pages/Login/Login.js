import React from 'react';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputs } from '../../services/hooks/useInputs';
import { Link } from "react-router-dom";
import useAuth from '../../services/hooks/useAuth';

import styles from './Login.module.css';

// {name: 'vvxxddfs', email: 'qqqqqq@qq.ru', password: 'qqqqqq'}

function Login() {
  const { values, handleChange } = useInputs();
  const { login } = useAuth(values);

  const handleSubmit = (e) => {
    e.preventDefault()
    login()
  }

  return (
    <main className={styles.main}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}>
        <h2 className='text text_type_main-large mb-6'>Вход</h2>
        <Input
          type={'email'}
          placeholder={'E-mail'}
          value={values.email || ''}
          name={'email'}
          error={false}
          onChange={handleChange}
          errorText={'Ошибка'}
          size={'default'} />
        <PasswordInput
          onChange={handleChange}
          value={values.password || ''}
          name={'password'} />
        <Button type="primary" size="medium" htmlType="submit">Войти</Button>
        <p className={`${styles.text} text text_type_main-default mt-20`}>Вы - новый пользователь
          <Link className={styles.link} to='/register'>Зарегистрироваться</Link>
        </p>
        <p className={`${styles.text} text text_type_main-default mt-4`}>Забыли пароль
          <Link className={styles.link} to='/forgot-password'>Восстановить пароль</Link>
        </p>
      </form>
    </main>
  );
}

export default Login;
