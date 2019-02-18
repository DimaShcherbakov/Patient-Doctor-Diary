import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducer from './reducers/Reducer';

export default createStore(
  combineReducers({
    enter: Reducer,
  }),
  {},
  applyMiddleware(thunk),
);
