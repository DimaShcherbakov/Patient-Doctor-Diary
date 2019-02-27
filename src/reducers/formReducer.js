import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  addPatient: [],
  addDoctor: [],
  reset: [],
  wrongEmail: [],
});

const INITIAL_STATE = {
  success: false,
  wrongPassword: false,
  wrongEmail: false,
};

const addPatient = (state = INITIAL_STATE, action) => (
  {
    ...state,
    success: true,
  }
);

const wrongEmail = (state = INITIAL_STATE, action) => (
  {
    ...state,
    wrongEmail: true,
  }
);

const reset = (state = INITIAL_STATE, action) => (
  {
    ...state,
    success: false,
  }
);

const addDoctor = (state = INITIAL_STATE, action) => (
  {
    ...state,
    success: true,
    wrongPassword: false,
    wrongEmail: false,
  }
);

export const HANDLERS = {
  [Types.ADD_DOCTOR]: addDoctor,
  [Types.ADD_PATIENT]: addPatient,
  [Types.RESET]: reset,
  // [Types.WRONG_PASSWORD]: wrongPassword,
  [Types.WRONG_EMAIL]: wrongEmail,
};

const formReducer = createReducer(INITIAL_STATE, HANDLERS);

export default formReducer;
