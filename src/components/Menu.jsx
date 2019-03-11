import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle';
import { Link } from 'react-router-dom';
import '../styles/menu.scss';
import Ava from '../assets/default.jpg';

const Menu = (props) => {
  const { info, name, handler } = props;
  return (
    <div className={name}>
      <div
        className="menu-btn"
        onClick={handler}
      >
        <IconButton>
          <MenuIcon />
        </IconButton>
      </div>
      <nav className="menu-list">
        <div className="info-wrap">
          <div className="image">
            <img src={info.menu.photo !== '' ? info.menu.photo : Ava} alt="ava" />
          </div>
          <div className="info">
            <p>{ info.menu.lN }</p>
            <p>{ info.menu.fN }</p>
            <p>{ info.menu.tN }</p>
          </div>
        </div>
        <Link
          to="/main"
          className="links"
        >
          <div className="nav-wrap">
            <AccountCircle />
            &nbsp; Личный кабинет
          </div>
        </Link>
        <Link
          to="/main/patients"
          className="links"
        >
          <div className="nav-wrap">
            <SupervisedUserCircle />
            &nbsp; Мои пациенты
          </div>
        </Link>
        <Link
          to="/main/notifications"
          className="links"
        >
          <div className="nav-wrap">
            <NotificationsIcon />
            &nbsp; Уведомления
          </div>
        </Link>
        <Link
          to="/main/messenges"
          className="links"
        >
          <div className="nav-wrap">
            <MailIcon />
            &nbsp; Сообщения
          </div>
        </Link>
      </nav>
    </div>
  );
};

export default Menu;

Menu.propTypes = {
  info: PropTypes.object,
  name: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
};
