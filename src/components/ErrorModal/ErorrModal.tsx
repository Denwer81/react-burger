import React, { FC, ReactNode } from 'react';
import ModalMessage from '../Ui/Modals/ModalMessage/ModalMessage';

interface IErrorModal {
  children: ReactNode;
  error: string;
  isOpen: boolean;
  handleClose: () => void,
}

const ErrorModal: FC<IErrorModal> = ({ isOpen, error, handleClose }) => {
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
