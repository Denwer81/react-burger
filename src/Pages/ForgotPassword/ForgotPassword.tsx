import React, { SyntheticEvent } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputs } from '../../services/hooks/useInputs';
import { Link } from "react-router-dom";
import useAuth from '../../services/hooks/useAuth';

import styles from './ForgotPassword.module.css';

const ForgotPassword = () => {
  const { values, handleChange } = useInputs();
  const { forgotPassword } = useAuth();

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    if (values.email) {
      forgotPassword({ email: values.email })
    }
  }

  return (
    <main className={styles.main}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}>
        <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
        <Input
          type={'email'}
          placeholder={'Укажите e-mail'}
          value={values.email || ''}
          name={'email'}
          error={false}
          onChange={handleChange}
          errorText={'Ошибка'}
          size={'default'} />
        <Button type="primary" size="medium" htmlType="submit">Восстановить</Button>
        <p className={`${styles.text} text text_type_main-default mt-20`}>Вспомнили пароль?
          <Link className={styles.link} to='/login'>Войти</Link>
        </p>
      </form>
    </main>
  );
}

export default ForgotPassword;
