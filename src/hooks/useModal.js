import { useEffect, useState } from "react";

function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = () => setIsOpen(true)
  const handleClose = () => setIsOpen(false)

  const handleCloseOverlay = (e) => {
    if (e.target === e.currentTarget) {
      handleClose(false)
    }
  }

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

  return { isOpen, handleOpen, handleClose, handleCloseOverlay }
}

export default useModal;
