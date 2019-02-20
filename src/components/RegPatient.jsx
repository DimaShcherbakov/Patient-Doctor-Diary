import React from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import FormRegPatient from '../containers/FormRegPatient.jsx';
import '../styles/refPat.scss';

const RegPatient = props => {
  const { show, hide } = props;
  return (
    <div className={`registr-popup ${show ? '' : 'hide-popup'}`}>
      <FormRegPatient />
      <CloseIcon className="cross" onClick={hide} />
    </div>
  );
};

export default RegPatient;

RegPatient.propTypes = {
  show: PropTypes.boolean,
  hide: PropTypes.func,
};
