import React from 'react';
import PropTypes from 'prop-types';
import '../styles/error.scss';

const Error = (props) => {
  const { hide, content } = props;
  return <p className={`error ${hide ? 'hide' : ''}`}>{ content }</p>
};

export default Error;

Error.propTypes = {
  content: PropTypes.string.isRequired,
  hide: PropTypes.bool.isRequired,
};
