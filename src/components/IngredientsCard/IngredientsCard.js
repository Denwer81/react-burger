import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { ingredientDetailsPropTypes } from '../../utils/propsTypes';
import Modal from '../Ui/Modals/Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setIngredient, clearIngredient } from '../../services/slices/viewedIngredient';
import useModal from '../../services/hooks/useModal';
import useDragIngredientsCard from '../../services/hooks/useDragIngredientsCard';
import useClearData from '../../services/hooks/useClearData';
import { getCounters } from '../../services/selectors/selectors';

import styles from './IngredientsCard.module.css';

IngredientsCard.propTypes = {
  card: PropTypes.shape({ ingredientDetailsPropTypes }).isRequired,
};

function IngredientsCard({ card }) {
  const dispatch = useDispatch();
  const { name, image, price } = card
  const { isOpen, handleOpen, handleClose } = useModal();
  const { isDrag, dragRef } = useDragIngredientsCard({ card });
  const { clearData } = useClearData();
  const counter = useSelector(getCounters)

  const openModal = () => {
    dispatch(setIngredient(card))
    handleOpen();
  };

  const closeModal = () => {
    handleClose();
    clearData(clearIngredient);
  }

  useEffect(() => {
    if (!isOpen) {
      clearData(clearIngredient);
    }
  }, [clearData, isOpen])

  return (
    <>
      <li ref={dragRef} onClick={openModal} className={`${styles.card} ${isDrag && styles.drag}`}>
        {counter[card._id] ? <Counter count={counter[card._id]} size="default" /> : ''}
        <img className={styles.image} src={image} alt={name} />
        <div className={styles.priceContainer}>
          <p className='text text_type_main-medium mr-2'>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.title}`}>{name}</p>
      </li>
      <Modal
        isOpen={isOpen}
        handleClose={closeModal}>
        <IngredientDetails />
      </Modal>
    </>
  )
}

export default IngredientsCard;
