import React, { FC } from 'react';

import styles from './ModalOverlay.module.css';

interface IModalOverlay {
  handleClose: () => void;
}

const ModalOverlay: FC<IModalOverlay> = ({ handleClose }) => {
  return (
      <div className={styles.overlay} onClick={handleClose}></div>
  )
}

export default React.memo(ModalOverlay);
