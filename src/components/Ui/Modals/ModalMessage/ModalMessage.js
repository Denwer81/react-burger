import React, { useRef } from 'react';
import ReactDOM from "react-dom";
import PropTypes from 'prop-types';
import useAnimation from '../../../../services/hooks/useAnimation';

import styles from './ModalMessage.module.css';

ModalMessage.propTypes = {
  children: PropTypes.element,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

function ModalMessage({ children, isOpen, handleClose }) {
  const modalRef = useRef()
  const { mounted } = useAnimation(modalRef, styles.visible, isOpen)

  if (!mounted) return null

  return ReactDOM.createPortal(
      <section className={styles.modal} ref={modalRef}>
        <button
          className={styles.closeButton}
          onClick={handleClose}
          type='button'></button>
        {children}
      </section>, document.getElementById('modal')
  )
}

export default React.memo(ModalMessage);
