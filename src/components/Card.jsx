import React from 'react';
import PropTypes from 'prop-types';
import '../styles/card.scss';
import Image from '../assets/ava.jpg';

const Card = props => (
  <div className="card">
    <div className="image-wrap">
      <img src={Image} alt="person" />
    </div>
    <p>
      <span>Щербаков</span>
      <span>Дмитрий</span>
      <span>Олегович</span>
    </p>
  </div>
);

export default Card;

Error.propTypes = {
  img: PropTypes.string,
  lastName: PropTypes.string,
  firstName: PropTypes.string,
  thirdName: PropTypes.string,
};
