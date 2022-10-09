import React from 'react';
import PropTypes from 'prop-types';
import Modal from '../Modals/Modal/Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import useModal from '../../hooks/useModal';
import { Counter, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientDetailsPropTypes } from '../../utils/propsTypes'

import styles from './IngredientsCard.module.css';

IngredientsCard.propTypes = {
  card: PropTypes.shape({ ingredientDetailsPropTypes }).isRequired,
  count: PropTypes.number,
};

function IngredientsCard({ count, card }) {
  const { name, image, price } = card
  const { isOpen, handleOpen, handleClose, handleCloseOverlay } = useModal();

  return (
    <>
      <li onClick={handleOpen} className={`${styles.card}`}>
        {
          count ? <Counter count={count} size="default" /> : ''
        }
        <img className={styles.image} src={image} alt={name} />
        <div className={styles.priceContainer}>
          <p className='text text_type_main-medium mr-2'>{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p className={`text text_type_main-default ${styles.title}`}>{name}</p>
      </li>
      <Modal
        isOpen={isOpen}
        handleClose={handleClose}
        handleCloseOverlay={handleCloseOverlay}>
        <IngredientDetails card={card} />
      </Modal>
    </>
  )
}

export default IngredientsCard;