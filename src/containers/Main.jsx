import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { openMenu, getPersonalInfo } from '../actions/menuReducer';
import Header from './Header.jsx';
import Menu from '../components/Menu.jsx';
import MainPageRouter from '../routes/main_page.jsx';
import '../styles/main.scss';


class Main extends React.Component {

  componentDidMount() {
    this.props.getData(parseInt(localStorage.userId, 10));
  }

  render() {
    const { menu } = this.props;
    return (
      <div className="wrapper">
        <Menu
          name={`menu${menu.openMenu ? ' menu-active' : ''}`}
          handler={() => this.props.openMenu(menu.openMenu)}
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
};

const mapStateToProps = (state) => {
  return {
    menu: state.menu,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    openMenu: (data) => {
      dispatch(openMenu(data));
    },
    getData: (data) => {
      dispatch(getPersonalInfo(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
