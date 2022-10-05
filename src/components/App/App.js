import React from 'react';
import styles from'./App.module.css';
import Header from '../Ui/Header/Header';
import MainPage from '../Pages/MainPage';

function App() {

  return (
    <>
      <div className={styles.app}>
        <Header />
        <MainPage />
      </div>

    </>
  );
}

export default App;

