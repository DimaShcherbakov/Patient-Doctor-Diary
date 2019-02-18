import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import loginReducer from './reducers/loginReducer';

const middleware = [thunk];
export default createStore(
  combineReducers({
    login: loginReducer,
  }),
  {},
  applyMiddleware(...middleware),
);
