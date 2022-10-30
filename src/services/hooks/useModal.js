import { useEffect, useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);


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

  const handleOpenErrorModal = (errorMessage) => {
    setErrorMessage(errorMessage)
    handleOpen();
    setTimeout(() => {
      handleClose();
      setErrorMessage(null)
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
