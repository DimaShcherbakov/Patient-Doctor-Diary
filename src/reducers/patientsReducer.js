import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  listData: ['dataArr'],
  diagnosData: ['data'],
  drugsData: ['data'],
  allData: ['payload'],
  clearData: [],
  patient_data: ['data'],
});

const INITIAL_STATE = {
  dataArr: [],
  diagnosArr: [],
  drugsArr: [],
  patient_data: {
    lastName: '',
    firstName: '',
    thirdName: '',
    regPlace: '',
    workPlace: '',
    tel: '',
    photo: '',
    email: '',
  },
};

const getPatients = (state = INITIAL_STATE, action) => ({
  ...state,
  dataArr: action.dataArr,
});

const getPatientData = (state = INITIAL_STATE, action) => ({
  ...state,
  patient_data: {
    lastName: action.data.last_name,
    firstName: action.data.first_name,
    thirdName: action.data.third_name,
    regPlace: action.data.reg_place,
    workPlace: action.data.work_place,
    tel: action.data.phone,
    photo: action.data.photo,
    email: action.data.email,
  },
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
  };
};

const getDiagnos = (state = INITIAL_STATE, action) => {
  return {
    ...state,
    diagnosArr: [...state.diagnosArr, action.data],
  };
};

const getDrugs = (state = INITIAL_STATE, action) => {
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
  [Types.PATIENT_DATA]: getPatientData,
};

const patientsReducer = createReducer(INITIAL_STATE, HANDLERS);

export default patientsReducer;
