import React, { useEffect, useRef } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import ModalOverlay from '../ModalOverlay/ModalOverlay';
// import useAnimation from '../../../../services/hooks/useAnimation';

import styles from './Modal.module.css';

Modal.propTypes = {
  children: PropTypes.element,
  handleClose: PropTypes.func.isRequired,
};

function Modal({ children, handleClose }) {
  const modalRef = useRef()
  // const { mounted } = useAnimation(modalRef, styles.visible, isOpen)

  // if (!mounted) return null

  return ReactDOM.createPortal(
    <ModalOverlay handleClose={handleClose}>
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

export default React.memo(Modal);
