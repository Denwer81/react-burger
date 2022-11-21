import React, { FC, ReactNode, useRef } from 'react';
import ReactDOM from "react-dom";
import useAnimation from '../../../../services/hooks/useAnimation';

import styles from './ModalMessage.module.css';

interface IModalMessage {
  children: ReactNode,
  isOpen: boolean;
  handleClose: () => void;
}

const ModalMessage: FC<IModalMessage> = ({ children, isOpen, handleClose }) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { mounted } = useAnimation({ modalRef, classList: styles.visible, isOpen })

  if (!mounted) return null

  return ReactDOM.createPortal(
    <div className={styles.modal} ref={modalRef}>
      <button
        className={styles.closeButton}
        onClick={handleClose}
        type='button'></button>
      {children}
    </div>, document.getElementById('modal') as HTMLElement
  )
}

export default React.memo(ModalMessage);
