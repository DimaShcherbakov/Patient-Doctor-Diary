import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WrapperData from '../containers/WrapperData.jsx';
import PersonPage from '../containers/PersonPage.jsx';

const MainPageRouter = () => (
  <Switch>
    <Route exact path="/main" />
    <Route path="/main/patients" component={WrapperData} />
    <Route path="/main/notifications" />
    <Route path="/main/messenges" />
    <Route path="/main/patients/:id" component={PersonPage} />
  </Switch>
);

export default MainPageRouter;
