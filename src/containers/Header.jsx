import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/loginReducer';
import '../styles/header.scss';

const Header = (props) => {

  const { data } = props;
  const exit = 'Выйти';
  if (data.isAuthorised === false) {
    return <Redirect to="/" />;
  }
  return (
    <header className="header">
      <div className="exit">
        <button
          type="submit"
          className="user-exit"
          onClick={() => (props.logout())}
        >
          {exit}
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  data: PropTypes.object,
  logout: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    data: state.login,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
