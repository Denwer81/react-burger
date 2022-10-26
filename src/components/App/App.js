import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Header from '../AppHeader/AppHeader';
import MainPage from '../Pages/MainPage';
import { fetchBurgersDB } from '../../services/slices/BurgerIngredients';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchBurgersDB());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <Header />
      <MainPage />
    </div>
  );
}

export default App;