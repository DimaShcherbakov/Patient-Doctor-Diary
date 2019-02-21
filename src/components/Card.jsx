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
  img: PropTypes.string,
  info: PropTypes.object,
};
