import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import FirstPageRouter from '../routes/first_page.jsx';

const App = () => (
  <BrowserRouter>
    <MuiThemeProvider>
      <div>
        <FirstPageRouter />
      </div>
    </MuiThemeProvider>
  </BrowserRouter>
);

export default App;
