import React from 'react';
import ModalMessage from '../../Ui/Modals/ModalMessage/ModalMessage';
import PropTypes from 'prop-types';

ErrorModal.propTypes = {
  error: PropTypes.string,
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
};

function ErrorModal({ isOpen, error, handleClose }) {
  return (
    <ModalMessage
        isOpen={isOpen}
        handleClose={handleClose}>
      <div className='text text_type_main-default mt-4'>
        Что-то пошло не так...
        {error
          ? <p className='text text_type_main-default mt-4 mb-4'>{error}</p>
          : ''
        }
      </div>
    </ModalMessage>
  )
}

export default React.memo(ErrorModal);