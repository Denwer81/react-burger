import React, { useRef } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';

import styles from './Modal.module.css';

Modal.propTypes = {
  children: PropTypes.element,
  handleClose: PropTypes.func.isRequired,
};

function Modal({ children, handleClose }) {
  const modalRef = useRef()

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
    </section>, document.getElementById('modal')
  )
}

export default React.memo(Modal);
