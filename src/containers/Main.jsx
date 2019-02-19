import React from 'react';
import { connect } from 'react-redux';
import { openMenu } from '../actions/menuReducer';
import Header from './Header.jsx';
import Menu from '../components/Menu.jsx';
import MainPageRouter from '../routes/main_page.jsx';
import '../styles/main.scss';


const Main = (props) => {
  const { menu } = props;
  return (
    <div className="wrapper">
      <Menu
        name={`menu${menu.openMenu ? ' menu-active' : ''}`}
        handler={() => props.openMenu(menu.openMenu)}
      />
      <div className={`content ${menu.openMenu ? 'content-active' : ''}`}>
        <Header />
        <MainPageRouter />
      </div>
    </div>
  );
}

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Main);
