import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  listData: ['dataArr'],
});

const INITIAL_STATE = {
  dataArr: [],
};

const getPatients = (state = INITIAL_STATE, action) => (
  {
    ...state,
    dataArr: action.dataArr,
  }
);

export const HANDLERS = {
  [Types.LIST_DATA]: getPatients,
};

const patientsReducer = createReducer(INITIAL_STATE, HANDLERS);

export default patientsReducer;
