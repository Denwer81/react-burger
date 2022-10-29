import React from 'react';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputs } from '../../services/hooks/useInputs';
import ProfileNav from '../../components/ProfileNav/ProfileNav';

import styles from './Profile.module.css';

function Profile() {
  const { values, handleChange, resetForm } = useInputs();

  const handleSubmit = (e) => {
    e.preventDefault()
    if (values.name && values.email && values.password.length > 5) {
      resetForm()
      console.log(values)
    }
  }

  const handleClick = () => {
    console.log(values)
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ProfileNav />
        <form
          onSubmit={handleSubmit}
          className={styles.form}>
          <Input
            onChange={handleChange}
            type={'text'}
            placeholder={'Имя'}
            value={values.name || ''}
            name={'name'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={"EditIcon"} 
            />
          <Input
            onChange={handleChange}
            type={'email'}
            placeholder={'Логин'}
            value={values.login || ''}
            name={'login'}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={"EditIcon"} />
          <Input
            onChange={handleChange}
            onIconClick={handleClick}
            type={'password'}
            placeholder={'Пароль'}
            value={values.password || ''}
            name={'password'}
            disabled={false}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={"EditIcon"} />
          <div className={styles.buttonsContainer}>
            <Button type="secondary" htmlType="reset" onClick={handleClick}>
              Отменить
            </Button>
            <Button type="primary" htmlType="submit">Сохранить</Button>
          </div>
        </form>
      </div> 
    </main>
  );
}

export default Profile;
