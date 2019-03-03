import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import socketIO from 'socket.io-client';
import socketIoMiddleware from 'redux-socket.io-middleware';
import loginReducer from './reducers/loginReducer';
import menuReducer from './reducers/menuReducer';
import patientsReducer from './reducers/patientsReducer';
import formReducer from './reducers/formReducer';
import profileReducer from './reducers/profileReducer';

const io = socketIO.connect('http://localhost:5000');
const middleware = [thunk, socketIoMiddleware(io)];

export default createStore(
  combineReducers({
    login: loginReducer,
    menu: menuReducer,
    patients: patientsReducer,
    form: formReducer,
    profile: profileReducer,
  }),
  {},
  applyMiddleware(...middleware),
);
