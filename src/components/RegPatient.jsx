import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import RegistrationForm from '../containers/RegistrationForm.jsx';
import '../styles/refPat.scss';

const RegPatient = (props) => {
  const { show, hide } = props;
  return (
    <div className={`registr-popup ${show ? '' : 'hide-popup'}`}>
      <RegistrationForm />
      <CloseIcon
        className="cross"
        onClick={hide}
      />
    </div>
  )
};

export default RegPatient;

RegPatient.propTypes = {
  show: PropTypes.func,
  hide: PropTypes.func,
};
