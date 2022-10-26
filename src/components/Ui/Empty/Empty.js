import React from 'react';
import PropTypes from 'prop-types';

Empty.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string
};

function Empty({ title, text }) {

  return (
    <div style={{ margin: 'auto', alignSelf: 'center' }}>
      <h2 className='text text_type_main-medium mb-3'>{title}</h2>
      <p
        className={'text text_type_main-default'}>{text}</p>
    </div>
  )
}

export default React.memo(Empty);