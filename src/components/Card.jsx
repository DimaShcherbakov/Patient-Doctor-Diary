import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.scss';
import Image from '../assets/ava.jpg';

const Card = (props) => {
  const { info } = props;
  return (
    <div className="card">
      <div className="image-wrap">
        <img src={Image} alt="person" />
      </div>
      <p>
        {/* use readable names please */}
        {/* you are using fields of info which are missing in propTypes */}
        <span>{info.lN}</span>
        <span>{info.fN}</span>
        <span>{info.tN}</span>
        <span>{info.bD}</span>
      </p>
    </div>
  );
};

export default Card;

Card.propTypes = {
  info: PropTypes.object.isRequired,
};
