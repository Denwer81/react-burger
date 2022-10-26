import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from "react-redux";
import { ingredientDetailsPropTypes } from '../../utils/propsTypes';
import Modal from '../Ui/Modals/Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { setIngredient, clearIngredient } from '../../services/slices/viewedIngredient';
import useModal from '../../services/hooks/useModal';
import useDragIngredientsCard from '../../services/hooks/useDragIngredientsCard';
import useGetCounter from '../../services/hooks/useGetCounter';
import useClearData from '../../services/hooks/useClearData';

import styles from './IngredientsCard.module.css';

IngredientsCard.propTypes = {
  card: PropTypes.shape({ ingredientDetailsPropTypes }).isRequired,
};

function IngredientsCard({ card }) {
  const dispatch = useDispatch();
  const { name, image, price } = card
  const { isOpen, handleOpen, handleClose } = useModal();
  const { isDrag, dragRef } = useDragIngredientsCard({ card });
  const { getCounter } = useGetCounter({ card })
  const { clearData } = useClearData();

  const openModal = () => {
    dispatch(setIngredient(card))
    handleOpen();
  };

  const closeModal = (e) => {
    handleClose(e);
    if (isOpen) {
    }
    clearData(clearIngredient);
  }
  return (
    <>
      <li ref={dragRef} onClick={openModal} className={`${styles.card} ${isDrag && styles.drag}`}>
        {getCounter ? <Counter count={getCounter} size="default" /> : ''}
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
