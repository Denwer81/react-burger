import React, { useRef, FC, ReactNode, useEffect } from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from '../ModalOverlay/ModalOverlay';

import styles from './Modal.module.css';

interface IModal {
  children: ReactNode;
  handleClose: () => void;
}

const Modal: FC<IModal> = ({ children, handleClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    }
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ReactDOM.createPortal(
    <section className={styles.container}>
      <ModalOverlay handleClose={handleClose} />
      <div className={styles.modal} ref={modalRef}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          type='button'></button>
        {children}
      </div>
    </section>, document.getElementById('modal') as HTMLElement
  )
}

export default React.memo(Modal);
