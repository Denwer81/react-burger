import React from 'react';

const SomethingWrong = ({ error }) => {
  return (
    <>
      <h2 className={'text text_type_main-medium mb-6'} style={{marginTop: 52}}>
        Что-то пошло не так...
      </h2>
      <p className={'text text_type_main-default mb-10'}>
        {error || "Попробуйте перегазругить страницу"}
      </p>
    </>
  )
}

export default SomethingWrong;