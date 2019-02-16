import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import PropTypes from 'prop-types';
import { indigo700 } from 'material-ui/styles/colors';


const AppHeader = props => (
  <AppBar
    position="static"
    title="Material UI Приложение"
    style={{ background: indigo700 }}
    iconElementRight={<InputBase placeholder="Search" />}
    onLeftIconButtonClick={() => props.menuClick()}
  />
);

AppHeader.propTypes = {
  menuClick: PropTypes.func
};

export default AppHeader;
