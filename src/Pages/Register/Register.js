import React, { useState } from 'react';
import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputs } from '../../services/hooks/useInputs';
import { Link, useNavigate } from "react-router-dom";
import ErorrModal from '../../components/App/ErrorModal/ErorrModal';
import useModal from '../../services/hooks/useModal';
import { handleRegister } from '../../utils/api';

import styles from './Register.module.css';

// {name: 'vvxxddfs', email: 'qqqqqq@qq.ru', password: 'qqqqqq'}

function Register() {
  const navigate = useNavigate();
  const [error, setError] = useState(null)
  const { values, handleChange } = useInputs();
  const { isOpen, handleOpen, handleClose } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (values.name && values.email && values.password.length > 5) {
      handleRegister(values)
      .then(res => {
        if (res.success === true) navigate('/login')
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
        error={error}>
      </ErorrModal>
    </main>
  );
}

export default Register;
