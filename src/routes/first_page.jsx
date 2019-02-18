import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Form from '../containers/Form.jsx';
import Main from '../containers/Main.jsx';
import RegistrationForm from '../containers/RegistrationForm.jsx';

const FirstPageRouter = () => (
  <Switch>
    <Route exact path="/" component={Form} />
    <Route path="/register" component={RegistrationForm} />
    <Route path="/main" component={Main} />
  </Switch>
);

export default FirstPageRouter;
