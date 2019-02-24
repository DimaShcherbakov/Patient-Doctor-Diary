import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import loginReducer from './reducers/loginReducer';
import loginReducer from './ducks/types';
import menuReducer from './reducers/menuReducer';
import patientsReducer from './reducers/patientsReducer';

const middleware = [thunk];

export default createStore(
  combineReducers({
    login: loginReducer,
    menu: menuReducer,
    patients: patientsReducer,
  }),
  {},
  applyMiddleware(...middleware),
);
