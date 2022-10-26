import { useCallback } from 'react';
import { useDrop, useDrag } from "react-dnd";
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import useSelectors from '../selectors';
import {
  addCartBun,
  addIngredient,
  updateIngredient
} from '../slices/BurgerConstructor';

const useDropBurgerConstructor = () => {
  const dispatch = useDispatch();
  const { cartIngredients } = useSelectors();

  const [{ isHover }, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(card) {
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
  
  const moveCard = useCallback((dragIndex, hoverIndex) => {
    const dragCard = cartIngredients[dragIndex];
    const newCards = [...cartIngredients]
  
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
  
    dispatch(updateIngredient(newCards));
  }, [cartIngredients, dispatch]);


  return {
    useDrag,
    isHover,
    dropTarget,
    moveCard
  }
}

export default useDropBurgerConstructor;
