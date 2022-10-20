import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function useModal(clearData) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const handleOpen = () => setIsOpen(true);

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
      dispatch(clearData());
    }
  }

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
        dispatch(clearData());
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
