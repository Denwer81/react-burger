import React, { useRef, FC, ReactNode } from 'react';
import ReactDOM from "react-dom";
import ModalOverlay from '../ModalOverlay/ModalOverlay';

import styles from './Modal.module.css';

interface IModal {
  children: ReactNode;
  handleClose: () => void;
}

const Modal: FC<IModal> = ({ children, handleClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)

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
