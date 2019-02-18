import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import '../styles/header.scss';

class Header extends React.Component {

  constructor() {
    super();
    this.userExit = this.userExit.bind(this);
    this.state = {
      exit: false,
    };
  }

  userExit() {
    this.setState({
      exit: true,
    });
  }

  render() {
    const { exit } = this.state;
    if (exit) {
      return <Redirect to="/" />;
    }
    return (
      <header className="header">
        <div className="exit">
          <button
            type="submit"
            className="user-exit"
            onClick={this.userExit}
          >
            Выйти
          </button>
        </div>
      </header>
    );
  }
};

export default Header;
