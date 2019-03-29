import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  listData: ['dataArr'],
  diagnosData: ['data'],
  drugsData: ['data'],
  allData: ['payload'],
  clearData: [],
});

const INITIAL_STATE = {
  dataArr: [],
  diagnosArr: [],
  drugsArr: [],
};

const getPatients = (state = INITIAL_STATE, action) => ({
  ...state,
  dataArr: action.dataArr,
});

const clearData = (state = INITIAL_STATE, action) => ({
  ...state,
  diagnosArr: [],
  drugsArr: [],
});

const getAllData = (state = INITIAL_STATE, action) => {
  const diagnosArr = action.payload[0].data;
  const drugsArr = action.payload[1].data;
  return {
    ...state,
    diagnosArr,
    drugsArr,
  }
};

const getDiagnos = (state = INITIAL_STATE, action) => {
  console.log(action);
  return {
    ...state,
    diagnosArr: [...state.diagnosArr, action.data],
  };
};

const getDrugs = (state = INITIAL_STATE, action) => {
  console.log(action);
  return {
    ...state,
    drugsArr: [...state.drugsArr, action.data],
  };
};

export const HANDLERS = {
  [Types.LIST_DATA]: getPatients,
  [Types.DIAGNOS_DATA]: getDiagnos,
  [Types.DRUGS_DATA]: getDrugs,
  [Types.ALL_DATA]: getAllData,
  [Types.CLEAR_DATA]: clearData,
};

const patientsReducer = createReducer(INITIAL_STATE, HANDLERS);

export default patientsReducer;
