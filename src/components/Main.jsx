import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header.jsx';
import Menu from './Menu.jsx';
import WrapperData from './WrapperData.jsx';
import '../styles/main.scss';


class Main extends React.Component {

  constructor() {
    super();
    this.menuAction = this.menuAction.bind(this);
    this.state = {
      openMenu: false,
    };
  }

  menuAction() {
    this.setState((state) => ({
      openMenu : !state.openMenu,
    }));
  }

  render() {
    const { openMenu } = this.state;
    return( 
      <div className = "wrapper">
        <Menu 
          name = {`menu${openMenu ? ' menu-active': ''}`} 
          handler = {this.menuAction}
        />
        <div className = {`content ${openMenu ? 'content-active': ''}`}>
          <Header/>
          <Switch>
            <Route exact path = "/main"/>
            <Route path = "/main/patients" component = {WrapperData}/>
            <Route path = "/main/notifications"/>
            <Route path = "/main/messenges"/>
          </Switch>
        </div>
      </div>
    )
  }
}

export default Main