import React from 'react';
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputs } from '../../services/hooks/useInputs';
import { Link, useNavigate } from "react-router-dom";
import { handleResetPasswordFirst } from '../../utils/api';
import { checkResponseReact } from '../../utils/handleFetch';
import ErorrModal from '../../components/App/ErrorModal/ErorrModal';
import useModal from '../../services/hooks/useModal';

import styles from './ForgotPassword.module.css';

function ForgotPassword() {
  const navigate = useNavigate();
  const { values, handleChange } = useInputs();
  const { isOpen, handleClose, handleOpenErrorModal, errorMessage } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (values.email) {
      handleResetPasswordFirst(values)
        .then(res => checkResponseReact(res))
        .then(res => {
          if (res.success === true) {
            navigate('/reset-password', { state: true })
          }
          handleOpenErrorModal(res.message)
        })
        .catch(res => {
          handleOpenErrorModal('Server Error!!!')
          console.log('Server Error!!!', res.message)
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
        error={errorMessage}>
      </ErorrModal>
    </main>
  );
}

export default ForgotPassword;