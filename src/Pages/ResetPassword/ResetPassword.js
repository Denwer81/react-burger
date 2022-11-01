import React, { useEffect } from 'react';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputs } from '../../services/hooks/useInputs';
import { Link, useNavigate, useLocation } from "react-router-dom";
import useAuth from '../../services/hooks/useAuth';

import styles from './ResetPassword.module.css';

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const { values, handleChange } = useInputs();
  const { resetPassword } = useAuth(values);

  useEffect(() => {
    if (!location.state) {
      navigate('/forgot-password', { replace: true })
    }
  }, [location.state, navigate])

  const handleSubmit = (e) => {
    e.preventDefault()
    resetPassword();
  }

  return (
    <main className={styles.main}>
      <form
        onSubmit={handleSubmit}
        className={styles.form}>
        <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
        <PasswordInput
          placeholder={'Введите новый пароль'}
          onChange={handleChange}
          value={values.password || ''}
          name={'password'} />
        <Input
          type={'text'}
          placeholder={'Введите коди из письма'}
          value={values.token || ''}
          name={'token'}
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

export default ResetPassword;
