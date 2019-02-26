import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WrapperData from '../containers/WrapperData.jsx';
import Profile from '../containers/Profile.jsx';

const MainPageRouter = () => (
  <Switch>
    <Route exact path="/main" component={Profile} />
    <Route path="/main/patients" component={WrapperData} />
    <Route path="/main/notifications" />
    <Route path="/main/messenges" />
  </Switch>
);

export default MainPageRouter;
