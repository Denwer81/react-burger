import { useCallback } from 'react';
import { useDrop, useDrag } from "react-dnd";
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import {
  addCartBun,
  addIngredient,
  updateIngredient
} from '../../../services/BurgerConstructor';

const useDropBurgerConstructor = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector(state => state.cart.cartIngredients);

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
    const dragCard = ingredients[dragIndex];
    const newCards = [...ingredients]
  
    newCards.splice(dragIndex, 1)
    newCards.splice(hoverIndex, 0, dragCard)
  
    dispatch(updateIngredient(newCards));
  }, [ingredients, dispatch]);


  return {
    useDrag,
    isHover,
    dropTarget,
    moveCard
  }
}

export default useDropBurgerConstructor;
