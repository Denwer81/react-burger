import React, { useRef } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import useAnimation from '../../../../hooks/useAnimation';

import styles from './Modal.module.css';

Modal.propTypes = {
  children: PropTypes.element,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

function Modal({ children, isOpen, handleClose, handleCloseOverlay }) {
  const modalRef = useRef()

  useAnimation(modalRef, styles.visible, isOpen)

  if (!isOpen) return null

  return ReactDOM.createPortal(
    <ModalOverlay handleClose={handleCloseOverlay}>
      <section className={styles.modal} ref={modalRef}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          type='button'></button>
        {children}
      </section>
    </ModalOverlay>, document.getElementById('modal')
  )
}

export default Modal;
