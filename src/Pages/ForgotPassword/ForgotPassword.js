import React, { useState } from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputs } from '../../services/hooks/useInputs';
import { Link, useNavigate } from "react-router-dom";
import { handleResetPasswordFirst } from '../../utils/api';
import ErorrModal from '../../components/App/ErrorModal/ErorrModal';
import useModal from '../../services/hooks/useModal';

import styles from './ForgotPassword.module.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const { values, handleChange } = useInputs();
  const { isOpen, handleOpen, handleClose } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (values.email) {
      handleResetPasswordFirst(values)
        .then(res => {
          if (res.success === true) navigate('/reset-password', { state: true })
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
      <ErorrModal
        isOpen={isOpen}
        handleClose={handleClose}
        error={error}>
      </ErorrModal>
    </main>
  );
}

export default ForgotPassword;