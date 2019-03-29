import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  addDiagnosis: [],
  addPills: [],
});

const INITIAL_STATE = [];

const addDiagnosis = (state = INITIAL_STATE, action) => (
  [...state, action]
);
const addPills = (state = INITIAL_STATE, action) => (
  [...state, action]
);

export const HANDLERS = {
  [Types.ADD_DIAGNOSIS]: addDiagnosis,
  [Types.ADD_PILLS]: addPills,
};

const patientFormReducer = createReducer(INITIAL_STATE, HANDLERS);

export default patientFormReducer;
