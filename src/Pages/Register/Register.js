import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputs } from '../../services/hooks/useInputs';
import { Link, useNavigate } from "react-router-dom";
import ErorrModal from '../../components/App/ErrorModal/ErorrModal';
import useModal from '../../services/hooks/useModal';
import { fetchRegister } from '../../services/slices/auth';
import { setCookie } from '../../utils/handleCookie';

import styles from './Register.module.css';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { values, handleChange } = useInputs();
  const { isOpen, handleClose, handleOpenErrorModal, errorMessage } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (values.name && values.email && values.password.length > 5) {
      dispatch(fetchRegister(values))
        .then(res => {
          if (res.payload.success === true) {
            navigate('/');
            setCookie('accessToken', res.payload.accessToken);
            setCookie('refreshToken', res.payload.refreshToken);
          }
          handleOpenErrorModal(res.payload.message || res.payload);
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
        <Button type="primary" size="medium" htmlType="submit">Зарегестрироваться</Button>
        <p className={`${styles.text} text text_type_main-default mt-20`}>Уже зарегестрированы?
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

export default Register;
