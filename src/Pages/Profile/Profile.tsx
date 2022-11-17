import React, { SyntheticEvent, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { useInputs } from '../../services/hooks/useInputs';
import { getUser } from '../../services/selectors/selectors';
import ProfileNav from '../../components/ProfileNav/ProfileNav';
import useAuth from '../../services/hooks/useAuth';

import styles from './Profile.module.css';

const Profile = () => {
  const user = useSelector(getUser);
  const [disabled, setDisabled] = useState(true);
  const { values, handleChange, resetForm } = useInputs(user);
  const { updateUser } = useAuth(values)

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
    e.preventDefault()
    updateUser();
  }

  const handleClickIcon = () => {
    setDisabled(false)
  }

  const handleClickCancel = () => {
    setDisabled(true)
    resetForm();
  }

  useEffect(() => {
    setDisabled(true)
  }, [user])

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ProfileNav />
        <form
          onSubmit={handleSubmit}
          className={styles.form}>
          <Input
            onChange={handleChange}
            onIconClick={handleClickIcon}
            type={'text'}
            placeholder={'Имя'}
            value={values.name || ''}
            name={'name'}
            disabled={disabled}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={"EditIcon"}
          />
          <Input
            onChange={handleChange}
            onIconClick={handleClickIcon}
            type={'email'}
            placeholder={'Логин'}
            value={values.email || ''}
            name={'email'}
            disabled={disabled}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={"EditIcon"} />
          <Input
            onChange={handleChange}
            onIconClick={handleClickIcon}
            type={'password'}
            placeholder={'Пароль'}
            value={values.password || ''}
            name={'password'}
            disabled={disabled}
            error={false}
            errorText={'Ошибка'}
            size={'default'}
            icon={"EditIcon"} />
          {
            !disabled &&
            <div className={styles.buttonsContainer}>
              <Button type="secondary" htmlType="reset" onClick={handleClickCancel}>
                Отменить
              </Button>
              <Button type="primary" htmlType="submit">Сохранить</Button>
            </div>
          }

        </form>
      </div>
    </main>
  );
}

export default Profile;
