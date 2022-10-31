import { useEffect, useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      return () => {
        document.removeEventListener('keydown', handleEscapeKey);
      }
    }
  }, [isOpen, setIsOpen]);

  const handleOpenErrorModal = () => {
    handleOpen();
    setTimeout(() => {
      handleClose();
    }, 2500)
  }

  return {
    isOpen,
    handleOpen,
    handleClose,
    handleOpenErrorModal,
  }
}

export default useModal;
