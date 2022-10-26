import React from 'react';
import PropTypes from 'prop-types';

import styles from './ModalOverlay.module.css';

ModalOverlay.propTypes = {
  children: PropTypes.element,
  handleClose: PropTypes.func.isRequired,
};

function ModalOverlay({ children, handleClose }) {
  return (
    <div className={styles.overlay} onClick={handleClose}>
      {children}
    </div>
  )
}

export default React.memo(ModalOverlay);
