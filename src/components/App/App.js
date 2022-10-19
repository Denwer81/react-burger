import React from 'react';
import Header from '../AppHeader/AppHeader';
import MainPage from '../Pages/MainPage';
import ingredientsContext from '../../context/IngredientsContext'
import constructorContext from '../../context/ConstructorContext'
import useGetBurgersDB from '../../hooks/useInitial';
import styles from './App.module.css';


function App() {
  const { burgersDB, setDBurgersDB } = useGetBurgersDB();

  return (
    <div className={styles.app}>
      <ingredientsContext.Provider value={{ burgersDB, setDBurgersDB }}>
        <constructorContext.Provider value={{ burgersDB, setDBurgersDB }}>
          <Header />
          <MainPage />
        </constructorContext.Provider>
      </ingredientsContext.Provider>
    </div>
  );
}

export default App;