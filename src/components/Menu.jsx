import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SupervisedUserCircle from '@material-ui/icons/SupervisedUserCircle'
import { Link } from 'react-router-dom';
import '../styles/menu.scss';
import Ava from '../assets/ava.jpg';

const Menu = props => (
  <div className={props.name}>
    <div
      className="menu-btn"
      onClick={ props.handler }
    >
      <IconButton>
        <MenuIcon />
      </IconButton>
    </div>
    <nav className="menu-list">
      <div className="info-wrap">
        <div className="image">
          <img src={Ava} alt="ava" />
        </div>
        <div className="info">
          <p>Щербаков</p>
          <p>Дмитрий</p>
          <p>Олегович</p>
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
          &nbsp;Мои пациенты
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
          &nbsp;Сообщения
        </div>
      </Link>
    </nav>
  </div>
);

export default Menu;
