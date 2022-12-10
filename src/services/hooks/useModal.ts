import { useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => setIsOpen(false);

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
