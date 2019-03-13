import { createActions, createReducer } from 'reduxsauce';
import search from '../utils/findIndex'

export const { Types, Creators } = createActions({
  addMessage: ['newNote'],
  deleteMessage: ['id'],
});

const INITIAL_STATE = [];

const addMessage = (state = INITIAL_STATE, action) => {
  console.log(action)
  return [...state, action]
};

const deleteMessage = (state = INITIAL_STATE, action) => {
  state.splice(search(state, action.id), 1);
  return state;
};

export const HANDLERS = {
  [Types.ADD_MESSAGE]: addMessage,
  [Types.DELETE_MESSAGE]: deleteMessage
};

const profileReducer = createReducer(INITIAL_STATE, HANDLERS);

export default profileReducer;
