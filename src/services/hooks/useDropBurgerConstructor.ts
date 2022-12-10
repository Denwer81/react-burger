import { useAppSelector, useAppDispatch } from './useRedux';
import { IIngredient } from './../types/burgerIngredients';
import { useCallback, useMemo } from 'react';
import { useDrop, useDrag } from "react-dnd";
import { nanoid } from '@reduxjs/toolkit';
import { getCartIngredients } from '../selectors/selectors';
import debounce from '../../utils/debounce';
import {
  addCartBun,
  addIngredient,
  updateIngredient
} from '../slices/burgerConstructor';

const useDropBurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const cartIngredients = useAppSelector(getCartIngredients);

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(card: IIngredient) {
      const cardWithId = { ...card, consructorId: nanoid() }
  
      if (card.type === 'bun') {
        dispatch(addCartBun(cardWithId))
      } else {
        dispatch(addIngredient(cardWithId))
      }
    },
    collect: monitor => ({
      isHover: monitor.isOver()
    })
  });
  
  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {
    const dragCard = cartIngredients[dragIndex];
    const newCards = [...cartIngredients]
  
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
  
    dispatch(updateIngredient(newCards));
  }, [cartIngredients, dispatch]);

  const debouncedMoveCard = useMemo(() => debounce(moveCard), [moveCard]);

  return {
    useDrag,
    isHover,
    dropTarget,
    moveCard,
    debouncedMoveCard
  }
}

export default useDropBurgerConstructor;
