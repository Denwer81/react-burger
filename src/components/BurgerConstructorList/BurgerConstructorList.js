import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from "react-dnd";
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientDetailsPropTypes } from '../../utils/propsTypes';
import { deleteIngredient } from '../../services/BurgerConstructor';
import styles from './BurgerConstructorList.module.css';

BurgerConstructorList.propTypes = {
  item: ingredientDetailsPropTypes.isRequired,
  index: PropTypes.number,
  moveCard: PropTypes.func,
};

function BurgerConstructorList({ item, index, moveCard }) {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const [{ handlerId }, drop] = useDrop({
    accept: 'component',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId()
      }
    },

    hover(item, monitor) {
      if (!ref.current) {
        return;
      }

      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    }
  })

  const [{ isDragging }, drag] = useDrag({
    type: 'component',
    item: () => ({ id: item.id, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const preventDefault = (e) => e.preventDefault();

  const handleDelete = (id) => {
    dispatch(deleteIngredient(id));
  };

  return (
    <li
      ref={ref}
      data-handler-id={handlerId}
      onDrop={preventDefault}
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
