import React from 'react';
import PropTypes from 'prop-types';

import styles from './ModalOverlay.module.css';

ModalOverlay.propTypes = {
  handleClose: PropTypes.func.isRequired,
};

function ModalOverlay({ handleClose }) {
  return (
      <div className={styles.overlay} onClick={handleClose}></div>
  )
}

export default React.memo(ModalOverlay);
