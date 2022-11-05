import React from 'react';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputs } from '../../services/hooks/useInputs';
import { Link } from "react-router-dom";
import useAuth from '../../services/hooks/useAuth';

import styles from './Register.module.css';

function Register() {
  const { values, handleChange } = useInputs();
  const { register } = useAuth(values);

  const handleSubmit = (e) => {
    e.preventDefault()
    register()
  }

  return (
    <main className={styles.main}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}>
        <h2 className='text text_type_main-large mb-6'>Регистрация</h2>
        <Input
          type={'text'}
          placeholder={'Имя'}
          value={values.name || ''}
          name={'name'}
          error={false}
          onChange={handleChange}
          errorText={'Ошибка'}
          size={'default'} />
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
        <Button type="primary" size="medium" htmlType="submit">Зарегистрироваться</Button>
        <p className={`${styles.text} text text_type_main-default mt-20`}>Уже зарегестрированы?
          <Link className={styles.link} to='/login'>Войти</Link>
        </p>
      </form>
    </main>
  );
}

export default Register;
