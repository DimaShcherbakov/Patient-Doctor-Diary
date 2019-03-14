import { createActions, createReducer } from 'reduxsauce';
import search from '../utils/findIndex';

export const { Types, Creators } = createActions({
  addMessage: ['newNote'],
  deleteMessage: ['id'],
});

const INITIAL_STATE = [];

const addMessage = (state = INITIAL_STATE, action) => {
  return [...state, action.newNote];
};

const deleteMessage = (state = INITIAL_STATE, action) => {
  const newState = state.splice(search(state, action.id), 1);
  console.log(newState);
  return newState;
};

export const HANDLERS = {
  [Types.ADD_MESSAGE]: addMessage,
  [Types.DELETE_MESSAGE]: deleteMessage,
};

const profileReducer = createReducer(INITIAL_STATE, HANDLERS);

export default profileReducer;
