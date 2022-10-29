import React, { useState } from 'react';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputs } from '../../services/hooks/useInputs';
import { Link, useNavigate } from "react-router-dom";
import ErorrModal from '../../components/App/ErrorModal/ErorrModal';
import useModal from '../../services/hooks/useModal';
import { handleLogin } from '../../utils/api';

import styles from './Login.module.css';

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  const { values, handleChange } = useInputs();
  const { isOpen, handleOpen, handleClose } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (values.email && values.password.length > 5) {
      handleLogin(values)
      .then(res => {
        if (res.success === true) navigate(-1)
        setError(res.message)
        handleOpen();
        setTimeout(() => {
          handleClose();
          setError(null)
        }, 2500)
      })
    }
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
      <ErorrModal
        isOpen={isOpen}
        handleClose={handleClose}
        error={error}>
      </ErorrModal>
    </main>
  );
}

export default Login;
