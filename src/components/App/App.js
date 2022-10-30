import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import { fetchBurgersDB } from '../../services/slices/BurgerIngredients';
import { router } from '../../services/routes/routes';
import ErorrModal from './ErrorModal/ErorrModal';
import useModal from '../../services/hooks/useModal';
import { useSelector } from 'react-redux';
import { getAuthError } from '../../services/selectors/selectors';
import { getCookie } from '../../utils/handleCookie';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const authError = useSelector(getAuthError)
  const { isOpen, handleClose, handleOpenErrorModal, errorMessage } = useModal();

  useEffect(() => {
    dispatch(fetchBurgersDB());
  }, [dispatch]);

  useEffect(() => {
    handleOpenErrorModal();
    console.log(authError)
  }, [authError])

  return (
    <>
      <div className={styles.app}>
        <RouterProvider router={router} />
      </div>
      {authError &&
        <ErorrModal
          isOpen={isOpen}
          handleClose={handleClose}
          error={authError}>
        </ErorrModal>
      }
    </>
  );
}

export default App;