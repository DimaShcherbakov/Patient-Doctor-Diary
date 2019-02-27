import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/loginActions';
import '../styles/header.scss';

const Header = (props) => {
  const { data } = props;
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
          Выйти
        </button>
      </div>
    </header>
  );
};

Header.propTypes = {
  data: PropTypes.object,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({ data: state.login });

const mapDispatchToProps = dispatch => (
  {
    logout: () => {
      dispatch(logout());
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
