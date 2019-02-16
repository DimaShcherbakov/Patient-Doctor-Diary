import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WrapperData from '../components/WrapperData.jsx';

const MainPageRouter = () => (
  <Switch>
    <Route exact path="/main" />
    <Route path="/main/patients" component={WrapperData} />
    <Route path="/main/notifications" />
    <Route path="/main/messenges" />
  </Switch>
);

export default MainPageRouter;
