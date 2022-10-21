import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import Modal from '../Ui/Modals/Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import useModal from '../../hooks/useModal';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientDetailsPropTypes } from '../../utils/propsTypes';
import { setIngredient, clearIngredient } from '../../services/viewedIngredient';

import styles from './IngredientsCard.module.css';

IngredientsCard.propTypes = {
  card: PropTypes.shape({ ingredientDetailsPropTypes }).isRequired,
};

function IngredientsCard({ card }) {
  const dispatch = useDispatch();
  const cardsIdList = useSelector(state => state.cart.cartIngredientsIdList);

  const { name, image, price } = card
  const { isOpen, handleOpen, handleClose } = useModal({ clearIngredient });

  const counter = () => {
    const counter = cardsIdList.filter((item => item === card._id)).length;

    return card.type === 'bun' ? counter / 2 : counter;
  }

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredient',
    item: card,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });

  const openModal = () => {
    dispatch(setIngredient(card))
    handleOpen();
  };

  return (
    <>
      <li ref={dragRef} onClick={openModal} className={`${styles.card} ${isDrag  && styles.drag}`}>
        {counter() ? <Counter count={counter()} size="default" /> : ''}
        <img className={styles.image} src={image} alt={name} />
        <div className={styles.priceContainer}>
          <p className='text text_type_main-medium mr-2'>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.title}`}>{name}</p>
      </li>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}>
        <IngredientDetails />
      </Modal>
    </>
  )
}

export default IngredientsCard;