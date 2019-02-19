import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';
import menuReducer from './reducers/menuReducer';

const middleware = [thunk];

export default createStore(
  combineReducers({
    login: loginReducer,
    menu: menuReducer,
  }),
  {},
  applyMiddleware(...middleware),
);
