import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openMenu, getPersonalInfo } from '../actions/menuActions';
import Header from './Header.jsx';
import Menu from '../components/Menu.jsx';
import MainPageRouter from '../routes/main_page.jsx';
import '../styles/main.scss';

class Main extends React.Component {

  componentDidMount() {
    const id = parseInt(localStorage.userId, 10);
    const { status } = localStorage;
    const { getData } = this.props;
    getData(id, status);
  }

  render() {
    const { menu, openMenu } = this.props;

    return (
      <div className="wrapper">
        <Menu
          name={`menu${menu.openMenu ? ' menu-active' : ''}`}
          handler={() => openMenu(menu.openMenu)}
          info={this.props}
        />
        <div className={`content ${menu.openMenu ? 'content-active' : ''}`}>
          <Header />
          <MainPageRouter />
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  menu: PropTypes.object,
  openMenu: PropTypes.func,
  getData: PropTypes.func,
};

const mapStateToProps = state => ({ menu: state.menu });

const mapDispatchToProps = dispatch => (
  {
    openMenu: (data) => {
      dispatch(openMenu(data));
    },
    getData: (id, status) => {
      dispatch(getPersonalInfo(id, status));
    },
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(Main);
