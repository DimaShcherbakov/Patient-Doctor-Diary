import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
  addMessage: ['newNote'],
});

const INITIAL_STATE = {
  notes: [],
};

const addMessage = (state = INITIAL_STATE, action) => (
  {
    ...state,
    notes: [...state.notes, action.newNote],
  }
);

export const HANDLERS = {
  [Types.ADD_MESSAGE]: addMessage,
};

const profileReducer = createReducer(INITIAL_STATE, HANDLERS);

export default profileReducer;
