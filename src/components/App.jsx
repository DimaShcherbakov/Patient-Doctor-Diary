import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Form from './Form.jsx';
import Main from './Main.jsx';
import RegistrationForm from './RegistrationForm.jsx';

const App = () => (
  <BrowserRouter>
    <MuiThemeProvider>
      <div>
        <Switch>
          <Route exact path="/" component={Form} />
          <Route path="/register" component={RegistrationForm} />
          <Route path="/main" component={Main} />
        </Switch>
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
);

export default App;
