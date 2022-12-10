import React, { useRef, FC } from 'react';
import { ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient } from '../../services/slices/burgerConstructor';
import useDnDBurgerConstructorList from '../../services/hooks/useDnDBurgerConstructorList';
import { IConstuctor } from '../../services/types/burgerConstructor';
import { useAppDispatch } from '../../services/hooks/useRedux';

import styles from './BurgerConstructorList.module.css';

interface IBurgerConstructorList {
  item: IConstuctor;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const BurgerConstructorList: FC<IBurgerConstructorList> = ({ item, index, moveCard }) => {
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLLIElement>(null);
  const { handlerId, isDragging } = useDnDBurgerConstructorList({
    item,
    index,
    moveCard,
    ref
  });

  const handleDelete = (id: string) => {
    dispatch(deleteIngredient(id));
  };

  return (
    <li
      ref={ref}
      className={styles.ingredient}
      onDrop={(e) => e.preventDefault()}
      data-handler-id={handlerId}
      style={{
        opacity: isDragging ? .2 : 1
      }}>
      <DragIcon type={'primary'} />
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

export default React.memo(BurgerConstructorList);
