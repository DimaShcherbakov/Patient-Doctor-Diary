import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  addPatient: [],
  addDoctor: [],
});

const INITIAL_STATE = {
  success: false,
};

const addPatient = (state = INITIAL_STATE, action) => (
  {
    ...state,
    success: true,
  }
);

const addDoctor = (state = INITIAL_STATE, action) => (
  {
    ...state,
    success: true,
  }
);

export const HANDLERS = {
  [Types.ADD_DOCTOR]: addDoctor,
  [Types.ADD_PATIENT]: addPatient,
};

const formReducer = createReducer(INITIAL_STATE, HANDLERS);

export default formReducer;