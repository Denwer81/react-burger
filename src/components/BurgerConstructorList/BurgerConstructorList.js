import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { ingredientDetailsPropTypes } from '../../utils/propsTypes';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient } from '../../services/slices/BurgerConstructor';
import useDnDBurgerConstructorList from '../../services/hooks/useDnDBurgerConstructorList';

import styles from './BurgerConstructorList.module.css';

BurgerConstructorList.propTypes = {
  item: ingredientDetailsPropTypes.isRequired,
  index: PropTypes.number,
  moveCard: PropTypes.func,
};

function BurgerConstructorList({ item, index, moveCard }) {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const { handlerId, isDragging } = useDnDBurgerConstructorList({
    item,
    index,
    moveCard,
    ref
  });

  const handleDelete = (id) => {
    dispatch(deleteIngredient(id));
  };

  return (
    <li
      ref={ref}
      data-handler-id={handlerId}
      onDrop={(e) => e.preventDefault()}
      style={{
        opacity: isDragging ? .2 : 1
      }}
      className={styles.ingredient}>
      <DragIcon />
      <div className={styles.elem}>
        <ConstructorElement
          handleClose={() => handleDelete(item.consructorId)}
          text={item.name}
          price={item.price}
          thumbnail={item.image} />
      </div>
    </li>
  )
}

export default BurgerConstructorList;
