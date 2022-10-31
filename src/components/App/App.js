import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider } from "react-router-dom";
import { fetchBurgersDB } from '../../services/slices/BurgerIngredients';
import { router } from '../../services/routes/routes';
import ErorrModal from './ErrorModal/ErorrModal';
import useModal from '../../services/hooks/useModal';
import { useSelector } from 'react-redux';
import { getAuthError } from '../../services/selectors/selectors';

import styles from './App.module.css';

function App() {
  const dispatch = useDispatch();
  const authError = useSelector(getAuthError)
  const { isOpen, handleClose, handleOpenErrorModal } = useModal();

  useEffect(() => {
    dispatch(fetchBurgersDB());
  }, [dispatch]);

  useEffect(() => {
    handleOpenErrorModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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