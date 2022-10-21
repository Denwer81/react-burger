import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useModal({ clearOrder, clearCart, clearIngredient }) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const clearData = useCallback(() => {
    clearOrder && dispatch(clearOrder());
    clearCart && dispatch(clearCart());
    clearIngredient && dispatch(clearIngredient());
  }, [clearOrder, clearCart, clearIngredient, dispatch]);

  const handleOpen = () => setIsOpen(true);

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      clearData();
    }
  }

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        clearData();
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      }
    }
  }, [isOpen, setIsOpen, dispatch, clearData]);

  return { isOpen, handleOpen, handleClose }
}

export default useModal;
