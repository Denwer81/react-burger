import React from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

import styles from './Modal.module.css';

Modal.propTypes = {
  children: PropTypes.element,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

function Modal({ children, isOpen, handleClose, handleCloseOverlay }) {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <ModalOverlay handleClose={handleCloseOverlay}>
      <section className={styles.modal} >
        <button
          className={styles.closeButton}
          onClick={handleClose}
          type='button'></button>
        {children}
      </section>
    </ModalOverlay>, document.getElementById('root')
  )
}

export default Modal;
